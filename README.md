# Conheco-um-cara-API
API do [Eu conheço um cara] (nome temporario)

# Rodando a API
- Abra um terminal e clone o projeto com o commando ```$ git clone```
- Ainda no terminal:
    - ```$ cd Conheco-um-cara-API/```
    - ```$ cd authServer```
    - ```$ touch .env```
    - Não feche o terminal, com seu editor de texto de preferencia, defina as variaveis de ambiente ISSUER, TOKEN_SECRET e NODE_ENV dentro do arquivo .env
    - Voltando ao terminal, rode o comando ```$ npm install``` para instalar as dependencias da API
    - ```$ npm start``` para rodar o server

## Notas
- A API esta settada como padrão na porta 3001
- Para acessar a documentação, rode a API e entre na url: `http://localhost:3001/api-docs/`
