<h1 align="center">Amigo Secreto</h1>

<center>

[Read in English](./README.md)

</center>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/rafa-coelho/amigo-secreto?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/rafa-coelho/amigo-secreto?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rafa-coelho/amigo-secreto?color=56BEB8">

</p>

#### :sparkles: Sobre o projeto
É um criador de "Amigo Secreto"s feito para funcionar sem um banco de dados em servidor.

Ele utiliza o **IndexedDB** do navegador para armazenar as informações localmente para o criador do sorteio.

Ao gerar informar os nomes e criar o Amigo Secreeto, a aplicação sorteia o nome e gera um link para cada participante.

O Link contém um HASH baseado no nome do participante o de seu amigo sorteado. 
Assim, sem a necessidade de salvar a informação, os participantes podem ver quem eles tiraram.

#### :rocket: Tecnologias usadas

- [NodeJS](https://nodejs.org/en)
- [NextJS](https://nextjs.org/)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

#### Como executar



Para instalar:

```bash
npm install
# or
yarn
```

Para excutar
```bash
npm run dev
# or
yarn dev
```

#### Cadê o demo? 
Tá aqui: [Amigo Secreto](https://amigo-secreto.racoelho.dev/)

<hr />


#### :tv: Screenshots

##### Home
![Pagina Inicial Vazia](./assets/screenshots/home-vazia.png)
![Pagina Inicial Preenchida](./assets/screenshots/home-preenchida.png)

##### Criando Sorteio: 
![Tela de Criação](./assets/screenshots/tela-criar-vazia.png)
![Tela de Criação Preenchida](./assets/screenshots/tela-criar-preenchida.png)

##### Visualizar:
![Visualizar Amigo Secreto](./assets/screenshots/visualizar-amigo-secreto.png)

##### Link gerado:
Ao enviar o link, a mensagem ficará assim:
![Mensagem Recebida](./assets/screenshots/mensagem-recebida.png)

##### Ver quem tirou
![Ver quem tirou](./assets/screenshots/ver-amigo-secreto.png)
