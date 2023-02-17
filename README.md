# Feedback Widget
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/italocc-git/nlw-return-impulse/blob/main/LICENSE) 

# Sobre o projeto

http://nlw-return-impulse-lake-six.vercel.app/

Feedback Widget é uma aplicação voltada para registros de reclamações ou ideias sugeridas pelo Usuário, ao enviar a reclamação o Responsável recebe via e-mail com o tipo de Feedback e com os comentários e emite uma screenshot da tela do usuário para esclarecer melhor sua mensagem.

## Layout web
![Web](https://github.com/italocc-git/nlw-return-impulse/blob/main/web/src/assets/gif/gif-feedbacks-app-demo.gif)

# Funcionalidades exclusivas :

- Dark Mode ( de acordo com a configuração do sistema)
- Página de Dashboard de feedbacks , de acordo com o usuário autenticado e Página de autenticação do usuário. 
- Header adicionado com informações do usuário logado.
- Criação da navegação das páginas.
- Criação do serviço de autenticação pela Google e Facebook.
- Storage para salvar informações básicas de login pelo Facebook e Google.

# Tecnologias utilizadas
## Back end
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [Jest](https://jestjs.io)

## Front end
- HTML / CSS / Typescript / React
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Zod](https://zod.dev/)
- [Firebase](https://firebase.google.com)
- [TailwindCSS](https://tailwindcss.com/)
- [html2canvas](https://www.npmjs.com/package/html2canvas)
- [phosphor-react](https://phosphoricons.com/)
- [react-toastify](https://www.npmjs.com/package/react-toastify)

## Implantação em produção
- Back end: Railway
- Front end web: Vercel
- Banco de dados: Postgresql

# Como executar o projeto

## Back end
Pré-requisitos: Node 14

```bash
# clonar repositório
git clone https://github.com/italocc-git/nlw-return-impulse.git

# entrar na pasta do projeto chamada server
cd server

# executar o projeto
yarn server / npm run server 
```

## Front end web
Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/italocc-git/nlw-return-impulse.git

# entrar na pasta do projeto chamada web
cd web

# instalar dependências
yarn install / npm install

# executar o projeto
yarn dev / npm run dev
```

# Autor

Italo Costa Cavalcante

https://www.linkedin.com/in/italo-costa-cavalcante/
