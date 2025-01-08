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



## Descrição do desafio

O desafio consiste em desenvolver uma aplicação backend para atender aos requisitos descritos no [documento oficial](https://github.com/brain-ag/trabalhe-conosco/blob/main/README.md).

## Techs

A implementação do desafio está utilizando as seguintes tecnologias:

- [Typescript](https://www.typescriptlang.org/)
- [Nest](https://nestjs.com/)
- [Node](https://nodejs.org/en)
- [Typeorm](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Postgres](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/)


## Execução do projeto localmente com o docker-compose


1) Inicialmente, podemos conferir se existem processos executando nas portas 3000 e 5432. 

Caso houver, precisamos desligá-los temporariamente para a execução do projeto a partir do docker-compose.

2) Podemos copiar o .env.example existente na raiz do projeto, e duplicá-lo com o nome .env:

```bash
$ cp .env.example .env # em ambiente linux
```

3) Podemos executar a instrução:
```bash
$ docker-compose up --build
```


Visando que o docker-compose do projeto levante 2 containers usando as variáveis de ambiente contidas no `.env`:

- 1 associado a aplicação nest: serasa-brain-ag-challenge-app
- 1 associado ao database postgres: serasa-brain-ag-challenge-db

Ocorrendo assim este preview de execução:

<img src="./.github/image/execution-preview.png" style="margin-left: 0px"
     alt="Preview de execução com o docker-compose" width="700">

## Execução dos testes

Para executar os testes automatizados, podemos invocar o comando:

```bash
$ npm run test
```

O qual executará os testes unitários trazendo a seguinte previsão:

<img src="./.github/image/tests-preview.png" style="margin-left: 0px"
     alt="Preview de execução dos testes" width="700">



## Execução das migrations


Para executar as migrations existentes, podemos invocar o comando:

```bash
$ npm run migration:run
```

Para gerar uma nova migration a partir de uma nova entidade, podemos executar:

```bash
$ npm run migration:generate
```

`Observação`: Para executar estes processos, precisamos que o container associado ao postgres esteja ativo. Para executar as migrations via terminal, precisamos apontar para o container (no redirecionamento para o localhost) durante a execução da migration.

## License

[MIT](https://choosealicense.com/licenses/mit/)
