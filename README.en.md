<h1 align="center"> Serasa Brain AG Challenge </h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LucasPereiraMiranda/serasa-brain-ag-challenge">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/LucasPereiraMiranda/serasa-brain-ag-challenge">
  
  <a href="https://github.com/LucasPereiraMiranda/serasa-brain-ag-challenge/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/LucasPereiraMiranda/serasa-brain-ag-challenge">
  </a>

  <a href="https://github.com/LucasPereiraMiranda/serasa-brain-ag-challenge/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/LucasPereiraMiranda/serasa-brain-ag-challenge">
  </a>

  <a href="https://github.com/LucasPereiraMiranda/serasa-brain-ag-challenge/issues">
    <img alt="GitHub license" src="https://img.shields.io/github/license/LucasPereiraMiranda/serasa-brain-ag-challenge">
  </a>
</p>



## Challenge description

The challenge consists of developing a backend application to meet the requirements described in the [official document](https://github.com/brain-ag/trabalhe-conosco/blob/main/README.md).

## Techs

The implementation of the challenge is using the following technologies:

- [Typescript](https://www.typescriptlang.org/)
- [Nest](https://nestjs.com/)
- [Npm](https://www.npmjs.com/)
- [Node](https://nodejs.org/en)
- [Typeorm](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Postgres](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/)


## Entity-Relationship Diagram

The following entity-relationship diagram (ERD) was designed to represent the database structure in the context of the challenge. It illustrates the main entities and their relationships, providing a visual representation of the data flow.

<img src="./.github/image/diagram-entity-relationship.png" style="margin-left: 0px"
     alt="Entity-Relationship Diagram Designed for the Challenge" width="700">


## Project execution

### Docker-compose

To run the project with Docker Compose:

1) First, check if there are any processes running on ports 3000 and 5432.

If there are, you need to temporarily stop them to allow the project to run via Docker Compose.

2) Copy the existing .env.example file in the project root and rename it to .env.

```bash
$ cp .env.example .env # linux enviroment
```

3) Run the following command:
```bash
$ docker-compose up --build
```


This will allow the project's docker-compose setup to spin up two containers using the environment variables from .env:

- 1 container for the NestJS application: serasa-brain-ag-challenge-app
- 1 container for the PostgreSQL database: serasa-brain-ag-challenge-db

This will result in the following execution preview:

<img src="./.github/image/execution-preview.png" style="margin-left: 0px"
     alt="Execution preview with Docker Compose" width="700">

### Local mode (without containers)

To run the project in local mode:

1) Copy the existing .env.example file in the project root and rename it to .env:

```bash
$ cp .env.example .env # linux enviroment
```

2) Install the dependencies:

```bash
$ npm install
```

3) Create the database, considering the values specified in the .env file

4) Run the project in development mode:

```bash
$ npm run start:dev
```

## Running Tests

To execute the unit tests, run the following command:

```bash
$ npm run test
```

This will trigger the test suite, producing the following expected output:

<img src="./.github/image/tests-preview.png" style="margin-left: 0px"
     alt="Test execution preview" width="700">



## Running migrations


To execute the existing migrations, run the following command:

```bash
$ npm run migration:run
```

To generate a new migration from a new entity, use the following command:

```bash
$ npm run migration:generate
```

**Note**: To run these processes, the PostgreSQL container must be active.
When executing migrations via terminal, ensure that the connection is correctly redirected to the container (mapped to localhost).

## Swagger

The application includes Swagger, which provides the contracts and specifications for API communication. When running the application locally, Swagger can be accessed at the following URI:

```bash
$ http://localhost:3000/api#/
```

Swagger execution preview:

<img src="./.github/image/swagger-preview.png" style="margin-left: 0px"
     alt="Swagger execution preview" width="700">


## Considerations Made During Development

### Strategies for Scalability and Reliability Under High Load

To ensure the system can handle a large number of concurrent users, the following solutions were implemented:

- **Indexing Optimization**:  Indexes were added to frequently accessed columns, including primary keys and columns used in filters and searches (e.g., crop.name), to enhance overall query performance.


- **Caching Implementation**: A caching strategy was implemented to store results of frequent queries, reducing the load on tables expected to grow in data density. This ensures a healthy response time for users and decreases database strain. The caching strategy used can be found in this [link](https://orkhan.gitbook.io/typeorm/docs/caching).

- **Pagination Implementation**: Pagination was introduced in endpoints returning large datasets (findAll queries). This prevents queries from retrieving massive amounts of data at once, reducing data traffic and improving performance by providing controlled access to information.


### Strategies for Observability

Observability is crucial to maintaining a well-functioning production system. The following strategies were implemented:

- **CHealth Check Flow**: A health check mechanism was implemented to monitor the status of critical system components, such as the database.

```json
{
  "uptime": 538.826759168,
  "healthMessage": "OK",
  "checks": [
    {
      "name": "Database",
      "status": true,
      "details": "Connected"
    }
  ]
}
```

Proposed Strategies:

- **APM**: APM (Application Performance Monitoring): As a future step, the addition of an APM tool like [Elastic](https://www.elastic.co/pt/observability/application-performance-monitoring) or [Datadog](https://www.datadoghq.com/product/apm/) can be suggested to enhance overall application observability. These tools provide real-time monitoring, trace performance bottlenecks, and offer deeper insights into application behavior, helping to ensure optimal performance and faster issue detection.


## License

[MIT](https://choosealicense.com/licenses/mit/)
