##Clone do repositorio
git clone

##Baixar as dependencias e node_modules
yarn install

##Criação do docker ambiente nodejs
docker build -t maxmilhas_dockernode .

##Utilizando docker-compose para monitorar as alterações em ambiente de dev
docker-compose up

##Execução das migrations
yarn typeorm migration:run

##Caso o docker não execute o ambiente node
yarn dev:server

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
