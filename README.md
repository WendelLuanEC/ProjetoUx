
# UX Delivery  - Virtualização do meu restaurante

## Descrição
Essa aplicação web tem como objetivo virtualizar o restaurante do cliente, ele permite que os clientes façam registro 
no sistema, e realizem login com o e-mail e a senha. Após a autenticação, o usuário é redirecionado para a página de
cardápio, no qual eles podem adicionar seus pedidos no carrinho de compras e proceder com a compra.

## Tecnologias usadas
 - Front-end: ReactJS
 - Back-end: NodeJS
 - Banco de dados: MySQL - Banco rodando no db4free

## Pre requisitos

- NodeJS
- NPM
- Vscode

 ### Para rodar o projeto, você precisa ter os softwares mencionados acima instalados, siga os passos:

1. Escreva no terminal em uma pasta de sua escolha:
 ```bash
git clone https://github.com/WendelLuanEC/ProjetoUx.git
```
2. Entre na pasta do projeto:
 ```bash
cd ProjetoUx
```
3. Entre na pasta do backend:
 ```bash
cd .\backend\
```
4. Instale as dependencias do backend:
 ```bash
npm install
```
5. Rode o backend com o seguinte comando:
 ```bash
npm start
```
6. Abra outro terminal e repita os passos acima, com exceção do passo 4, substitua este passo pelo seguinte:
 ```bash
npm run dev
```
7. Abra o seguinte link no navegador: http://localhost:5173/

## Como usar o Ux Delivery: 
1. Esta é a tela de login, para fazer cadastro no sistema, clique em cadastre-se aqui:
![Tela de Login](https://github.com/WendelLuanEC/assets/blob/master/1-%20login.PNG)

2. Esta é a tela de cadastro no sistema, preencha os campos e clique no botão cadastrar:
![Tela de Registro](https://github.com/WendelLuanEC/assets/blob/master/2-%20registro.PNG) 

3. Após isso, você será redirecionado para a tela de login, entre usando o e-mail cadastrado e a senha:
![Tela de login](https://github.com/WendelLuanEC/assets/blob/master/4-%20login%20com%20credenciais.PNG)

4. Esta é a home da aplicação, aqui você tem acesso ao cardápio e ao carrinho com suas compras:
![Home](https://github.com/WendelLuanEC/assets/blob/master/5%20-%20home%20da%20aplica%C3%A7%C3%A3o.PNG)

5. Este é o cardápio, você pode escolher a quantidade e adicionar ao carrinho clicando no botão +Add:
![Cardapio](https://github.com/WendelLuanEC/assets/blob/master/6%20-%20cardapio.PNG)

6. Você pode ver os pedidos que você adicionou ao carrinho clicando no ícone carrinho:
![Carrinho](https://github.com/WendelLuanEC/assets/blob/master/8%20-%20carrinho.png)

7. Este é o seu carrinho, você pode diminuir e aumentar a quantidade de cada pedido, além de visualizar o total da sua compra:
![Carrinho](https://github.com/WendelLuanEC/assets/blob/master/9%20-%20itens%20no%20carrinho.PNG)
