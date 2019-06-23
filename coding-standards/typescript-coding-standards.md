## Semicolons, Syntax - God no please, no. No semicolons

<a name="rno--semicolon"></a><a name="0.1"></a>

- [0.1](#no--semicolon) No semicolons
  > Semicolons just add noise and since they are optional in javascript/typescript less noise == better

```
// bad
const a = 1;

// Good
const a = 1
```

<a name="camelCase"></a><a name="0.2"></a>

- [0.2](#camelCase) Camel Case

```
// bad
const foo_bar = 1
const foo-bar = 1

// Good
const fooBar = 1
```

## References

<a name="references--const"></a><a name="1.1"></a>

- [1.1](#references--const) Use const for all of your references avoid using var. eslint: prefer-const, no-const-assign
  > Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.

```javascript
// bad
var a = 1
var b = 2

// good
const a = 1
const b = 2
```

<a name="references--let"></a><a name="1.2"></a>

- [1.2](#references--let)If you REALLY MUST reassign references, use let instead of var. eslint: no-var
  > Why? let is block-scoped rather than function-scoped like var.

```javascript
// bad
var count = 1
if (true) {
  count += 1
}

// good, use the let.
let count = 1
if (true) {
  count += 1
}
```

## Object

<a name="object--new"></a><a name="2.1"></a>

- [2.1](#object--new) Use the literal syntax for object creation

```javascript
// bad
const item = new Object()
// good
const item = {}
```

<a name="object--property-value"></a><a name="2.2"></a>

- [2.2](#object--property-value) Use property value shorthand. eslint: object-shorthand
  > Why? It is shorter and descriptive.

```javascript
const lukeSkywalker = 'Luke Skywalker'
// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
}
// good
const obj = {
  lukeSkywalker,
}
```

<a name="object--shorthand"></a><a name="2.3"></a>

- [2.3](#object--shorthand) Group your shorthand properties at the beginning of your object declaration.
  > Why? It’s easier to tell which properties are using the shorthand.

```javascript
const anakinSkywalker = 'Anakin Skywalker'
const lukeSkywalker = 'Luke Skywalker'

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
}

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
}
```

<a name="object--quote"></a><a name="2.4"></a>

- [2.4](#object--quote) Only quote properties that are invalid identifiers. In general this should only be done if we
  are integrating with a tool which follows that standard in all other cases `camelCase` should be used.
  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

```javascript
// bad
const bad = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
}

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
}
```

## Arrays

<a name="arrays--literals"></a><a name="4.1"></a>

- [3.1](#arrays--literals) Use the literal syntax for array creation. eslint: [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor.html)

  ```javascript
  // bad
  const items = new Array()

  // good
  const items = []
  ```

<a name="es6-array-spreads"></a><a name="4.3"></a>

- [3.2](#es6-array-spreads) Use array spreads `...` to copy arrays.

  ```javascript
  // bad
  const len = items.length
  const itemsCopy = []
  let i

  for (i = 0 i < len i += 1) {
    itemsCopy[i] = items[i]
  }

  // good
  const itemsCopy = [...items]
  ```

<a name="arrays--from"></a>
<a name="arrays--from-iterable"></a><a name="3.3"></a>

- [3.3](#arrays--from-iterable) To convert an iterable object to an array, use spreads `...` instead of [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

```javascript
const foo = document.querySelectorAll('.foo')

// good
const nodes = Array.from(foo)

// best
const nodes = [...foo]
```

<a name="arrays--callback-return"></a><a name="4.5"></a>

- [3.4](#arrays--callback-return) Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following [8.2](#arrows--implicit-return). eslint: [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)

  ```javascript
  // good
  ;[1, 2, 3]
    .map(x => {
      const y = x + 1
      return x * y
    })

    [
      // good
      (1, 2, 3)
    ].map(x => x + 1)

    [
      // bad - no returned value means `acc` becomes undefined after the first iteration
      ([0, 1], [2, 3], [4, 5])
    ].reduce((acc, item, index) => {
      const flatten = acc.concat(item)
    })

    [
      // good
      ([0, 1], [2, 3], [4, 5])
    ].reduce((acc, item, index) => {
      const flatten = acc.concat(item)
      return flatten
    })

  // bad
  inbox.filter(msg => {
    const { subject, author } = msg
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee'
    } else {
      return false
    }
  })

  // good
  inbox.filter(msg => {
    const { subject, author } = msg
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee'
    }
    return false
  })
  ```

<a name="arrays--bracket-newline"></a>

- [3.5](#arrays--bracket-newline) Use line breaks after open and before close array brackets if an array has multiple lines

  ```javascript
  // bad
  const arr = [[0, 1], [2, 3], [4, 5]]

  const objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]

  const numberInArray = [1, 2]

  // good
  const arr = [[0, 1], [2, 3], [4, 5]]

  const objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]

  const numberInArray = [1, 2]
  ```

## Destructuring

<a name="destructuring--object"></a><a name="4.1"></a>

- [4.1](#destructuring--object) Use object destructuring when accessing and using multiple properties of an object.

  > Why? Destructuring saves you from creating temporary references for those properties.

  ```javascript
  // bad
  function getFullName(user) {
    const firstName = user.firstName
    const lastName = user.lastName

    return `${firstName} ${lastName}`
  }

  // good
  function getFullName(user) {
    const { firstName, lastName } = user
    return `${firstName} ${lastName}`
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`
  }
  ```

<a name="destructuring--array"></a><a name="4.2"></a>

- [4.2](#destructuring--array) Use array destructuring.

  ```javascript
  const arr = [1, 2, 3, 4]

  // bad
  const first = arr[0]
  const second = arr[1]

  // good
  const [first, second] = arr
  ```

<a name="destructuring--object-over-array"></a><a name="4.3"></a>

- [4.3](#destructuring--object-over-array) Use object destructuring for multiple return values, not array destructuring.

  > Why? You can add new properties over time or change the order of things without breaking call sites.

  ```javascript
  // bad
  function processInput(input) {
    // then a miracle occurs
    return [left, right, top, bottom]
  }

  // the caller needs to think about the order of return data
  const [left, __, top] = processInput(input)

  // good
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom }
  }

  // the caller selects only the data they need
  const { left, top } = processInput(input)
  ```

## Strings

<a name="strings--quotes"></a><a name="5.1"></a>

- [5.1](#strings--quotes) Use single quotes `''` for strings

  ```javascript
  // bad
  const name = 'Capt. Janeway'

  // bad - template literals should contain interpolation or newlines
  const name = `Capt. Janeway`

  // good
  const name = 'Capt. Janeway'
  ```

<a name="strings--line-length"></a><a name="6.2"></a>

- [5.2](#strings--line-length) Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation.

  > Why? Broken strings are painful to work with and make code less searchable.

  ```javascript
  // bad
  const errorMessage =
    'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.'

  // bad
  const errorMessage =
    'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.'

  // good
  const errorMessage =
    'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.'
  ```

<a name="es6-template-literals"></a><a name="6.4"></a>

- [5.3](#es6-template-literals) When programmatically building up strings, use template strings instead of concatenation.

  > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

  ```javascript
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?'
  }

  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join()
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`
  }
  ```

## Arrow Functions

<a name="arrows--use-them"></a><a name="6.1"></a>

- [6.1](#arrows--use-them) When you must use an anonymous function (as when passing an inline callback), use arrow function notation.

  > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

  > Why not? If you have a fairly complicated function, you might move that logic out into its own named function expression.

  ```javascript
  // bad
  [1, 2, 3]
    .map(function(x) {
      const y = x + 1
      return x * y
    })

  // good
  [1, 2, 3)]
    .map(x => {
      const y = x + 1
      return x * y
    })
  ```

<a name="arrows--implicit-return"></a><a name="6.2"></a>

- [6.2](#arrows--implicit-return) If the function body consists of a single statement returning an [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

  > Why? Syntactic sugar. It reads well when multiple functions are chained together.

  ```javascript
  // bad
  ;[1, 2, 3]
    .map(number => {
      const nextNumber = number + 1`A string containing the ${nextNumber}.`
    })

    [
      // good
      (1, 2, 3)
    ].map(number => `A string containing the ${number + 1}.`)

    [
      // good
      (1, 2, 3)
    ].map(number => {
      const nextNumber = number + 1
      return `A string containing the ${nextNumber}.`
    })

    [
      // good
      (1, 2, 3)
    ].map((number, index) => ({
      [index]: number,
    }))

  // No implicit return with side effects
  function foo(callback) {
    const val = callback()
    if (val === true) {
      // Do something if callback returns true
    }
  }

  let bool = false

  // bad
  foo(() => (bool = true))

  // good
  foo(() => {
    bool = true
  })
  ```

<a name="arrows--paren-wrap"></a><a name="6.3"></a>

- [6.3](#arrows--paren-wrap) In case the expression spans over multiple lines, wrap it in parentheses for better readability.

  > Why? It shows clearly where the function starts and ends.

  ```javascript
  // bad
  ;['get', 'post', 'put']
    .map(httpMethod => Object.prototype.hasOwnProperty.call(httpMagicObjectWithAVeryLongName, httpMethod))

    [
      // good
      ('get', 'post', 'put')
    ].map(httpMethod => {
      return Object.prototype.hasOwnProperty.call(httpMagicObjectWithAVeryLongName, httpMethod)
    })
  ```

<a name="arrows--one-arg-parens"></a><a name="6.4"></a>

- [6.4](#arrows--one-arg-parens) If your function takes a single argument and doesn’t use braces, omit the parentheses. Otherwise, always include parentheses around arguments for clarity and consistency.

  > Why? Less visual clutter.

  ```javascript
  // bad
  ;[1, 2, 3]
    .map(x => x * x)

    [
      // good
      (1, 2, 3)
    ].map(x => x * x)

    [
      // good
      (1, 2, 3)
    ].map(number => `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`)

    [
      // bad
      (1, 2, 3)
    ].map(x => {
      const y = x + 1
      return x * y
    })

    [
      // good
      (1, 2, 3)
    ].map(x => {
      const y = x + 1
      return x * y
    })
  ```

## Classes & Constructors

<a name="constructors--use-class"></a><a name="7.1"></a>

- [7.1](#constructors--use-class) Always use `class`. Avoid manipulating `prototype` directly.

  > Why? `class` syntax is more concise and easier to reason about.

  ```javascript
  // bad
  function Queue(contents = []) {
    this.queue = [...contents]
  }
  Queue.prototype.pop = function() {
    const value = this.queue[0]
    this.queue.splice(0, 1)
    return value
  }

  // good
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents]
    }
    pop() {
      const value = this.queue[0]
      this.queue.splice(0, 1)
      return value
    }
  }
  ```

<a name="constructors--extends"></a><a name="7.2"></a>

- [7.2](#constructors--extends) Use `extends` for inheritance.

  > Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

  ```javascript
  // bad
  const inherits = require('inherits')
  function PeekableQueue(contents) {
    Queue.apply(this, contents)
  }
  inherits(PeekableQueue, Queue)
  PeekableQueue.prototype.peek = function() {
    return this.queue[0]
  }

  // good
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0]
    }
  }
  ```

<a name="constructors--chaining"></a><a name="7.3"></a>

- [7.3](#constructors--chaining) Methods can return `this` to help with method chaining.

  ```javascript
  // bad
  Jedi.prototype.jump = function() {
    this.jumping = true
    return true
  }

  Jedi.prototype.setHeight = function(height) {
    this.height = height
  }

  const luke = new Jedi()
  luke.jump() // => true
  luke.setHeight(20) // => undefined

  // good
  class Jedi {
    jump() {
      this.jumping = true
      return this
    }

    setHeight(height) {
      this.height = height
      return this
    }
  }

  const luke = new Jedi()

  luke.jump().setHeight(20)
  ```

<a name="constructors--tostring"></a><a name="7.4"></a>

- [7.4](#constructors--tostring) It’s okay to write a custom `toString()` method, just make sure it works successfully and causes no side effects.

  ```javascript
  class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name'
    }

    getName() {
      return this.name
    }

    toString() {
      return `Jedi - ${this.getName()}`
    }
  }
  ```

  <a name="constructors--no-useless"></a><a name="7.5"></a>

- [7.5](#constructors--no-useless) Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary. eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

  ```javascript
  // bad
  class Jedi {
    constructor() {}

    getName() {
      return this.name
    }
  }

  // bad
  class Rey extends Jedi {
    constructor(...args) {
      super(...args)
    }
  }

  // good
  class Rey extends Jedi {
    constructor(...args) {
      super(...args)
      this.name = 'Rey'
    }
  }
  ```

## Modules

<a name="modules--use-them"></a><a name="8.1"></a>

- [8.1](#modules--use-them) Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.

  > Why? Modules are the future, let’s start using the future now.

  ```javascript
  // bad
  const AirbnbStyleGuide = require('./AirbnbStyleGuide')
  module.exports = AirbnbStyleGuide.es6

  // ok
  import AirbnbStyleGuide from './AirbnbStyleGuide'
  export default AirbnbStyleGuide.es6

  // best
  import { es6 } from './AirbnbStyleGuide'
  export default es6
  ```

<a name="modules--no-wildcard"></a><a name="8.2"></a>

- [8.2](#modules--no-wildcard) Do not use wildcard imports.

  > Why? This makes sure you have a single default export.

  ```javascript
  // bad
  import * as AirbnbStyleGuide from './AirbnbStyleGuide'

  // good
  import AirbnbStyleGuide from './AirbnbStyleGuide'
  ```

<a name="modules--no-export-from-import"></a><a name="8.3"></a>

- [8.3](#modules--no-export-from-import) And do not export directly from an import.

  > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

  ```javascript
  // bad
  // filename es6.js
  export { es6 as default } from './AirbnbStyleGuide'

  // good
  // filename es6.js
  import { es6 } from './AirbnbStyleGuide'
  export default es6
  ```

<a name="modules--no-duplicate-imports"></a>

- [8.4](#modules--no-duplicate-imports) Only import from a path in one place.

  > Why? Having multiple lines that import from the same path can make code harder to maintain.

  ```javascript
  // bad
  import foo from 'foo'
  // … some other imports … //
  import { named1, named2 } from 'foo'

  // good
  import foo, { named1, named2 } from 'foo'
  ```

<a name="modules--prefer-default-export"></a>

- [8.5](#modules--prefer-default-export) In modules with a single export, prefer default export over named export.

  > Why? To encourage more files that only ever export one thing, which is better for readability and maintainability.

  ```javascript
  // bad
  export function foo() {}

  // good
  export default function foo() {}
  ```

<a name="modules--imports-first"></a>

- [8.6](#modules--imports-first) Put all `import`s above non-import statements.

  > Why? Since `import`s are hoisted, keeping them all at the top prevents surprising behavior.

  ```javascript
  // bad
  import foo from 'foo'
  foo.init()

  import bar from 'bar'

  // good
  import foo from 'foo'
  import bar from 'bar'

  foo.init()
  ```

<a name="modules--multiline-imports-over-newlines"></a>

- [8.7](#modules--multiline-imports-over-newlines) Multiline imports should be indented just like multiline array and object literals.

  > Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.

  ```javascript
  // bad
  import { longNameA, longNameB, longNameC, longNameD, longNameE } from 'path'

  // good
  import { longNameA, longNameB, longNameC, longNameD, longNameE } from 'path'
  ```

## Properties

<a name="properties--dot"></a><a name="12.1"></a>

- [9.1](#properties--dot) Use dot notation when accessing properties.

  ```javascript
  const luke = {
    jedi: true,
    age: 28,
  }

  // bad
  const isJedi = luke['jedi']

  // good
  const isJedi = luke.jedi
  ```

<a name="properties--bracket"></a><a name="12.2"></a>

- [9.2](#properties--bracket) Use bracket notation `[]` when accessing properties with a variable.

  ```javascript
  const luke = {
    jedi: true,
    age: 28,
  }

  function getProp(prop) {
    return luke[prop]
  }

  const isJedi = getProp('jedi')
  ```

<a name="variables--const"></a><a name="10.1"></a>

- [10.1](#variables--const) Always use `const` or `let` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.

  ```javascript
  // bad
  superPower = new SuperPower()

  // good
  const superPower = new SuperPower()
  ```

<a name="variables--one-const"></a><a name="10.2"></a>

- [10.2](#variables--one-const) Use one `const` or `let` declaration per variable or assignment.

  > Why? It’s easier to add new variable declarations this way, and you never have to worry about swapping out a `` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

  ```javascript
  // bad
  const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z'

  // bad
  // (compare to above, and try to spot the mistake)
  const items = getItems(),
    goSportsTeam = true
  dragonball = 'z'

  // good
  const items = getItems()
  const goSportsTeam = true
  const dragonball = 'z'
  ```

<a name="variables--const-let-group"></a><a name="10.3"></a>

- [10.3](#variables--const-let-group) Group all your `const`s and then group all your `let`s.

  > Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

  ```javascript
  // bad
  let i,
    len,
    dragonball,
    items = getItems(),
    goSportsTeam = true

  // bad
  let i
  const items = getItems()
  let dragonball
  const goSportsTeam = true
  let len

  // good
  const goSportsTeam = true
  const items = getItems()
  let dragonball
  let i
  let length
  ```

<a name="variables--define-where-used"></a><a name="10.4"></a>

- [10.4](#variables--define-where-used) Assign variables where you need them, but place them in a reasonable place.

  > Why? `let` and `const` are block scoped and not function scoped.

  ```javascript
  // bad - unnecessary function call
  function checkName(hasName) {
    const name = getName()

    if (hasName === 'test') {
      return false
    }

    if (name === 'test') {
      this.setName('')
      return false
    }

    return name
  }

  // good
  function checkName(hasName) {
    if (hasName === 'test') {
      return false
    }

    const name = getName()

    if (name === 'test') {
      this.setName('')
      return false
    }

    return name
  }
  ```

  <a name="variables--no-chain-assignment"></a><a name="10.5"></a>

- [10.5](#variables--no-chain-assignment) Don’t chain variable assignments. eslint

  > Why? Chaining variable assignments creates implicit global variables.

  ```javascript
  // bad
  ;(function example() {
    // JavaScript interprets this as
    // let a = ( b = ( c = 1 ) )
    // The let keyword only applies to variable a variables b and c become
    // global variables.
    let a = (b = c = 1)
  })()

  console.log(a) // throws ReferenceError
  console.log(b) // 1
  console.log(c)(
    // 1

    // good
    (function example() {
      let a = 1
      let b = a
      let c = a
    })(),
  )

  console.log(a) // throws ReferenceError
  console.log(b) // throws ReferenceError
  console.log(c) // throws ReferenceError

  // the same applies for `const`
  ```

<a name="variables--unary-increment-decrement"></a><a name="10.6"></a>

- [10.6](#variables--unary-increment-decrement) Avoid using unary increments and decrements (`++`, `--`).

  > Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

  ```javascript
  // bad

  const array = [1, 2, 3]
  let num = 1
  num++
  --num

  let sum = 0
  let truthyCount = 0
  for (let i = 0 i < array.length i++) {
    let value = array[i]
    sum += value
    if (value) {
      truthyCount++
    }
  }

  // good

  const array = [1, 2, 3]
  let num = 1
  num += 1
  num -= 1

  const sum = array.reduce((a, b) => a + b, 0)
  const truthyCount = array.filter(Boolean).length
  ```

<a name="variables--no-unused-vars"></a>

- [10.7](#variables--no-unused-vars) Disallow unused variables.

  > Why? Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.

  ```javascript
  // bad

  var some_unused_var = 42

  // Write-only variables are not considered as used.
  var y = 10
  y = 5

  // A read for a modification of itself is not considered as used.
  var z = 0
  z = z + 1

  // Unused function arguments.
  function getX(x, y) {
    return x
  }

  // good

  function getXPlusY(x, y) {
    return x + y
  }

  var x = 1
  var y = a + 2

  alert(getXPlusY(x, y))

  // 'type' is ignored even if unused because it has a rest property sibling.
  // This is a form of extracting an object that omits the specified keys.
  var { type, ...coords } = data
  // 'coords' is now the 'data' object without its 'type' property.
  ```

## Blocks

<a name="blocks--braces"></a><a name="11.1"></a>

- [11.1](#blocks--braces) Use braces with all multi-line blocks. eslint:

  ```javascript
  // bad
  if (test) return false

  // good
  if (test) {
    return false
  }

  // bad
  function foo() {
    return false
  }

  // good
  function bar() {
    return false
  }
  ```

<a name="blocks--cuddled-elses"></a><a name="11.2"></a>

- [11.2](#blocks--cuddled-elses) If you’re using multi-line blocks with `if` and `else`, put `else` on the same line as your `if` block’s closing brace.

  ```javascript
  // bad
  if (test) {
    thing1()
    thing2()
  } else {
    thing3()
  }

  // good
  if (test) {
    thing1()
    thing2()
  } else {
    thing3()
  }
  ```

<a name="blocks--no-else-return"></a><a name="11.3"></a>

- [11.3](#blocks--no-else-return) If an `if` block always executes a `return` statement, the subsequent `else` block is unnecessary. A `return` in an `else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks.

  ```javascript
  // bad
  function foo() {
    if (x) {
      return x
    } else {
      return y
    }
  }

  // bad
  function cats() {
    if (x) {
      return x
    } else if (y) {
      return y
    }
  }

  // bad
  function dogs() {
    if (x) {
      return x
    } else {
      if (y) {
        return y
      }
    }
  }

  // good
  function foo() {
    if (x) {
      return x
    }

    return y
  }

  // good
  function cats() {
    if (x) {
      return x
    }

    if (y) {
      return y
    }
  }

  // good
  function dogs(x) {
    if (x) {
      if (z) {
        return y
      }
    } else {
      return z
    }
  }
  ```

## Control Statements

<a name="control-statements"></a>

- [12.1](#control-statements) In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line.

  > Why? Requiring operators at the beginning of the line keeps the operators aligned and follows a pattern similar to method chaining. This also improves readability by making it easier to visually follow complex logic.

  ```javascript
  // bad
  if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    thing1()
  }

  // bad
  if (foo === 123 && bar === 'abc') {
    thing1()
  }

  // good
  if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    thing1()
  }

  // good
  if (foo === 123 && bar === 'abc') {
    thing1()
  }
  ```

<a name="control-statement--value-selection"></a><a name="control-statements--value-selection"></a>

- [12.2](#control-statements--value-selection) Don't use selection operators in place of control statements.

  ```javascript
  // bad
  !isRunning && startRunning()

  // good
  if (!isRunning) {
    startRunning()
  }
  ```

## Comments

<a name="comments--multiline"></a><a name="13.1"></a>

- [13.1](#comments--multiline) Use `/** ... */` for multi-line comments.

  ```javascript
  // bad
  // make() returns a new element
  // based on the passed in tag name
  //
  // @param {String} tag
  // @return {Element} element
  function make(tag) {
    // ...

    return element
  }

  // good
  /**
   * make() returns a new element
   * based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element
  }
  ```

<a name="comments--singleline"></a><a name="13.2"></a>

- [13.2](#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.

  ```javascript
  // bad
  const active = true // is current tab

  // good
  // is current tab
  const active = true

  // bad
  function getType() {
    console.log('fetching type...')
    // set the default type to 'no type'
    const type = this.type || 'no type'

    return type
  }

  // good
  function getType() {
    console.log('fetching type...')

    // set the default type to 'no type'
    const type = this.type || 'no type'

    return type
  }

  // also good
  function getType() {
    // set the default type to 'no type'
    const type = this.type || 'no type'

    return type
  }
  ```

<a name="comments--spaces"></a>

- [13.3](#comments--spaces) Start all comments with a space to make it easier to read. eslint: [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment)

  ```javascript
  // bad
  //is current tab
  const active = true

  // good
  // is current tab
  const active = true

  // bad
  /**
   *make() returns a new element
   *based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element
  }

  // good
  /**
   * make() returns a new element
   * based on the passed-in tag name
   */
  function make(tag) {
    // ...

    return element
  }
  ```

<a name="comments--actionitems"></a><a name="17.3"></a>

- [13.4](#comments--actionitems) Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you’re pointing out a problem that needs to be revisited, or if you’re suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.

<a name="comments--fixme"></a><a name="17.4"></a>

- [13.5](#comments--fixme) Use `// FIXME:` to annotate problems.

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super()

      // FIXME: shouldn’t use a global here
      total = 0
    }
  }
  ```

<a name="comments--todo"></a><a name="17.5"></a>

- [13.6](#comments--todo) Use `// TODO:` to annotate solutions to problems.

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super()

      // TODO: total should be configurable by an options param
      this.total = 0
    }
  }
  ```

## Commas

<a name="commas--leading-trailing"></a><a name="14.1"></a>

- [14.1](#commas--leading-trailing) Leading commas: **Nope.**

  ```javascript
  // bad
  const story = [once, upon, aTime]

  // good
  const story = [once, upon, aTime]

  // bad
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
  }

  // good
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
  }
  ```

<a name="commas--dangling"></a><a name="14.2"></a>

- [14.2](#commas--dangling) Additional trailing comma: **Yup.**

  > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the [trailing comma problem](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) in legacy browsers.

  ```diff
  // bad - git diff without trailing comma
  const hero = {
        firstName: 'Florence',
  -    lastName: 'Nightingale'
  +    lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing']
  }

  // good - git diff with trailing comma
  const hero = {
        firstName: 'Florence',
        lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing'],
  }
  ```

  ```javascript
  // bad
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  }

  const heroes = ['Batman', 'Superman']

  // good
  const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
  }

  const heroes = ['Batman', 'Superman']

  // bad
  function createHero(firstName, lastName, inventorOf) {
    // does nothing
  }

  // good
  function createHero(firstName, lastName, inventorOf) {
    // does nothing
  }

  // good (note that a comma must not appear after a "rest" element)
  function createHero(firstName, lastName, inventorOf, ...heroArgs) {
    // does nothing
  }

  // bad
  createHero(firstName, lastName, inventorOf)

  // good
  createHero(firstName, lastName, inventorOf)

  // good (note that a comma must not appear after a "rest" element)
  createHero(firstName, lastName, inventorOf, ...heroArgs)
  ```

## Naming Conventions

<a name="naming--descriptive"></a><a name="15.1"></a>

- [15.1](#naming--descriptive) Avoid single letter names. Be descriptive with your naming.

  ```javascript
  // bad
  function q() {
    // ...
  }

  // good
  function query() {
    // ...
  }
  ```

<a name="naming--camelCase"></a><a name="15.2"></a>

- [15.2](#naming--camelCase) Use camelCase when naming objects, functions, and instances.

  ```javascript
  // bad
  const OBJEcttsssss = {}
  const this_is_my_object = {}
  function c() {}

  // good
  const thisIsMyObject = {}
  function thisIsMyFunction() {}
  ```

<a name="naming--PascalCase"></a><a name="15.3"></a>

- [15.3](#naming--PascalCase) Use PascalCase only when naming constructors or classes.

  ```javascript
  // bad
  function user(options) {
    this.name = options.name
  }

  const bad = new user({
    name: 'nope',
  })

  // good
  class User {
    constructor(options) {
      this.name = options.name
    }
  }

  const good = new User({
    name: 'yup',
  })
  ```

<a name="naming--leading-underscore"></a><a name="15.4"></a>

- [15.4](#naming--leading-underscore) Do not use trailing or leading underscores.

  > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tldr: if you want something to be “private”, it must not be observably present.

  ```javascript
  // bad
  this.__firstName__ = 'Panda'
  this.firstName_ = 'Panda'
  this._firstName = 'Panda'

  // good
  this.firstName = 'Panda'

  // good, in environments where WeakMaps are available
  // see https://kangax.github.io/compat-table/es6/#test-WeakMap
  const firstNames = new WeakMap()
  firstNames.set(this, 'Panda')
  ```

## Types

<a name="naming--leading-underscore"></a><a name="16.1"></a>

- [16.1](#no-any) Avoid using the generic `any` type at all cost

  > Why? Since any gives the compile no indication of the type being used, compile-time errors cannot be catched during implementation

  ```javascript
  //bad
  function foo(): any {
    return { bar: 'nice' }
  }

  // good
  function foo(): { bar: string } {
    return { bar: 'nice' }
  }
  ```

<a name="naming--leading-underscore"></a><a name="16.2"></a>

- [16.2](#return-all) Define return types for all public/exported functions, unless the type is void

  ```javascript
  //bad
  export function foo() {
      return { bar: 'nice' }
  }

  // good
  export function foo(): { bar: string } {
      return { bar: 'nice' }
  }
  ```

<a name="naming--leading-underscore"></a><a name="16.3"></a>

- [16.3](#class-to-intefrace) Prefer using `class` to `interface` as classes allow you to encapsulate instance related logic.

  ```javascript
  //bad
  interface Nike {
      justDoIt(): string
  }

  // good
  class Nike {
      public justDoIt(): string {
          this.helpMe()
          ...
      }

      private helpMe() {
      ...
      }
  }
  ```

<a name="naming--leading-underscore"></a><a name="16.4"></a>

- [16.4](#class-to-intefrace) Avoid exporting functions, use wrapper `Util` classes

  ```javascript
  //bad
  export function helpMe() {
      ...
  }

  // good
  class HelperUtil {
      public static helpMe() {
          this.helpMe()
      }
  }
  ```
