FROM node:10

RUN mkdir /sync
WORKDIR /sync

# Cache node modules
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy only production code
COPY src/ src/
COPY tslint.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm run prestart:prod
COPY docker-start.sh .

CMD  "./docker-start.sh"
