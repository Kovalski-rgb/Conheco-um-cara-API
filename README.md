# Conheco-um-cara-API
API do [Eu conheço um cara] (nome temporario)

# Rodando a API
- Abra um terminal e clone o projeto com o commando ```$ git clone```
- Ainda no terminal:
    - ```$ cd Conheco-um-cara-API/```
    - ```$ cd authServer```
    - ```$ touch .env```
    - Você vai precisar configurar as seguintes variaveis no arquivo .env:
        - `ISSUER`, `TOKEN_SECRET` e `NODE_ENV` para o JWT e o logger;
        - `DEFAULT_ADMIN_EMAIL`, `DEFAULT_ADMIN_PWD` para o bootstrap da base de dados;
        - `DEFAULT_DUMMY_NAME`, `DEFAULT_DUMMY_EMAIL`, `DEFAULT_DUMMY_PWD` para unit testing das rotas, essas variaveis s;
        - `DATABASE_URL` e a base de dados criada no mysql/mariadb para o prisma
    - Rode o comando ```$ npm install``` para instalar as dependencias da API
    - ```$ npm start``` para rodar o server

## Notas
- O servidor de autenticação está na porta 3001 por padrão
- O servidor de produtos e serviços está na porta 3002 por padrão
- O servidor de comunidades está na porta 3003 por padrão
- Para acessar a documentação, rode a API e entre na url: `http://localhost:3001/api-docs/`, mude a porta para a documentação do seu servidor de preferencia
