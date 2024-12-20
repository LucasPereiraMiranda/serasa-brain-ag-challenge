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

A descrição completa do desafio pode ser encontrada no seguinte link: [Descrição do Desafio](https://github.com/brain-ag/trabalhe-conosco/blob/main/README.md)

## Execução do projeto localmente com o docker-compose


1) Inicialmente, podemos conferir se existem processos executando nas portas 3000 e 5432
Caso houver, precisamos desliga-los temporariamente

2) Podemos copiar o .env.example existente na raiz do projeto, e duplicá-lo com o nome .env:

```bash
$ cp .env.example .env # em ambiente linux
```

3) Podemos executar a instrução:
```bash
$ docker-compose up
```

Visando que o docker-compose do projeto levante 2 containers usando as variáveis de ambiente contidas no `.env`:

- 1 associado a aplicação: serasa-brain-ag-challenge-app)
- 1 associado ao database postgres: serasa-brain-ag-challenge-db


<img src="./.github/image/execution-preview.png" style="margin-left: 0px"
     alt="Preview de execução com o docker-compose" width="700">



## License

[MIT](https://choosealicense.com/licenses/mit/)
