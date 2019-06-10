## Project Structure

Nest as a framework for building APIs is based around modules where the `main` module can import multiple feature modules.

As a result, it is advisable to create a single module per high level feature/epic (e.g user account creation).
All modules are then imported in the `app.module.ts`

### Module guide

1. All the files for a modules are contained within a folder src/app/{module-name}
2. The Module definition is implemented in index.ts
3. Each module has a single controller (multiple endpoints can be provided in the controller)
4. A module can have multiple services.
5. Each DB(TypeORM) entities are contained in {module-name}/entities directory
6. Request(API request body) object definitions (classes) are defined in {module-name}/requests

### Controller guide

1 . The controller root path should be defined in the `@Controller` decorator e.g. :

```javascript
@Controller('to-dos')
export class ToDoController {
```

2 . For each endpoint which returns a non-empty response body, swagger decorator needs to be defined e.g:

> Why ? Defining the type in the `ApiResponse` decorator displays the type fields in the swagger docs

```javascript
@ApiResponse({ status: 200, type: ToDo })
```

3 . For all endpoints receiving request bodies `ApiImplicitBody` swagger decorator needs to be defined:

> Why ? The plugin doesn't extract the fields for the `@Body` decorator, so the additional swagger specific decorator needs to be used.

```javascript
  @Post()
  @ApiImplicitBody({ name: 'ToDoRequest', type: ToDoRequest })
  createToDo(@Body() { name }: ToDoRequest): Promise<ToDo> {
    return this.toDoService.createToDo(name)
  }
```

4 . Controller endpoint bodies should be kept as slim as possible, ideally one-liner delegating to a service class

5 . Each endpoint needs to be protected with a `@Roles` decorator to limit the access control of the endpoint e.g :

```javascript
@Roles('ADMIN')
  getToDos(): Promise<ToDo[]> {
    return this.toDoService.getAll()
  }
```

### Service guide

1 . Service level classes should serve as the main business logic layer. This should be layer using `Repository` instances to retrieve/update entities.

2.  Public service level methods should initiate database transactions when there is more than one db operation involved in their execution

```kotlin
async deleteToDo(id: number): Promise<void> {
  this.entityManager.transaction(async () => {
    ...
}

```

3. Service methods should contains sufficient logging, at different levels (majority at debug level `logger.debug`) with only the key events being logged using `logger.log` (INFO level).

4. A service class should rarely grow bigger than 150lines. If it does it is likely that it has too many responsibilities therefore extracting out behaviour to a different service should be considered.

### Request model guide

1. All request classes should be defined in `{module-name}/requests`

2. It is advisable that all fields in a request class have `class-validator` and `@nestjs/swagger` decorators e.g.:

```javascript
import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ToDoRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string
}
```

### Entity model guide

1. All request classes should be defined in `{module-name}/entities`

2. Every entity should have an auto-generated ID:

```javascript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger'

export const TO_DO_TABLE = 'to_do'

@Entity(TO_DO_TABLE)
export class ToDo {

 @PrimaryGeneratedColumn()
 @ApiModelProperty()
 id: number

 ...
```

3. For each entity update a new migration needs to be implemented in `src/db-migrations`

### Shared components guide

Each module should encapsulate its entities/services. However, there will be a set of components(e.g. models interfaces/service) which need to be shared across the different modules.

1. All shared model classes/interfaces should be defined in `app/shared-components/models`.
2. All shared providers/services should be defined in `app/shared-components/providers`

### App Config

A `Configurator` interface has been defined in `app/config`. Each app configurator need to implement that interface, then it needs to be imported in main.ts:

```javascript
const APP_CONFIGURATORS = [
  new SecurityConfigurator(),
  new SwaggerConfigurator(),
  new GlobalPipeConfigurator()
]

async function bootstrap() {
  ...
  APP_CONFIGURATORS.forEach(configurator => configurator.configure(app))

  ...
}

```

### Testing guide

Considering the criticality of the project we should aim to have test coverage at/or above 70%

1. Each service-level class should be tested extensively with it's dependencies spied on e.g.:

```javascript
it('should delete to-do entity', async () => {
  jest.spyOn(toDoRepository, 'delete').mockImplementation(() => Promise.resolve({ affected: 1 }))

  await toDoService.deleteToDo(1)
  expect(toDoRepository).toHaveBeenCalledWith(1)
})
```

2. Each feature needs to be integration tested. (e.g. `ToDo.integration-spec.ts`). All third pary dependencies should be stubbed in tests i.e. we should not have to run 3rd party services to be able to run integration tests.
