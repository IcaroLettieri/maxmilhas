# Projeto Maxmilhas
Projeto de blacklist cpf com docker, nodejs, postgres

## Clone do repositorio
```bash
git clone https://github.com/IcaroLettieri/maxmilhas.git
```

## Baixar as dependencias e node_modules
```bash
yarn install
```

## Criação do docker ambiente nodejs
```bash
docker build -t maxmilhas_dockernode .
```

## Utilizando docker-compose para monitorar as alterações em ambiente de dev
```bash
docker-compose up
```

## Execução das migrations
```bash
yarn typeorm migration:run
```

## Caso o docker não execute o ambiente node
```bash
yarn dev:server
```

Foi utilizado dependecia:
 - "cpf-cnpj-validator" para validação do cpf
 - "express" para monitorar as rotas
 - "express-async-errors" para criar rota de erro
 - "typeorm"|"reflect-metadata"|"pg" para o banco de dados postgres
 - "uuidv4" validação do id gerado no banco de dados

Projeto foi estruturado em arquitetura SOLID
 - database: para estrutuda de banco
 - erros: para tratamentos de retorno de erros
 - models: com as entidades do banco
 - routes: com as rotas da aplicação
 - services: com todos os servicos de execução da aplicação

Rotas da api
```bash
GET     http://localhost:3000/status - Retorno do status
GET     http://localhost:3000/blacklists/:cpf - Consulta cpf na blacklist com retorno FREE | BLOCK
POST    http://localhost:3000/blacklists/{ cpf } - Cadastra cpf na blacklist
DELETE  http://localhost:3000/blacklists/:cpf - Remove cpf da blacklist
```
