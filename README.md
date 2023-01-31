# Conheco-um-cara-API
API do [Eu conheço um cara] (nome temporario)

# Rodando a API
- Abra um terminal e clone o projeto com o commando ```$ git clone```
- Ainda no terminal:
    - ```$ cd Conheco-um-cara-API/```
    - ```$ cd authServer```
    - ```$ touch .env```
    - Não feche o terminal, com seu editor de texto de preferencia, defina as variaveis de ambiente `ISSUER`, `NODE_ENV`, `TOKEN_SECRET`, `PORT` e `DATABASE_URL` para o prisma dentro do arquivo `.env`
    - Voltando ao terminal, rode o comando ```$ npm install``` para instalar as dependencias da API
    - ```$ npm start``` para rodar o server

## Notas
- O servidor de autenticação está na porta 3001 por padrão
- O servidor de produtos e serviços está na porta 3002 por padrão
- O servidor de comunidades está na porta 3003 por padrão
- Para acessar a documentação, rode a API e entre na url: `http://localhost:3001/api-docs/`, mude a porta para a documentação do seu servidor de preferencia