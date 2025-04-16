# Car Platform

## Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Configuração e Instalação](#configuração-e-instalação)
3. [Principais Funcionalidades](#principais-funcionalidades)
4. [Componentes Principais](#componentes-principais)
5. [Contexto de Autenticação](#contexto-de-autenticação)
6. [Rotas](#rotas)
7. [Dependências](#dependências)
8. [Como Contribuir](#como-contribuir)

---

## Descrição do Projeto

A **Car Platform** é uma aplicação web para gerenciar anúncios de carros novos e usados. Os usuários podem visualizar carros, pesquisar por modelos específicos, e acessar detalhes de cada veículo. A aplicação utiliza Firebase para autenticação e armazenamento de dados. Os usuários logados tem permissão para adicionar, editar e excluir carros anunciados.

---

## Configuração e Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes `npm` ou `yarn`

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/car-platform.git
   cd car-platform

   ```

2. Instale as dependências:

   ```bash
   npm install

   ```

3. Configure o Firebase:

- Crie um projeto no Firebase.
- Adicione as credenciais no arquivo src/services/firebaseConnection.ts.

4. Instale as dependências:

   ```bash
   npm run dev

   ```

5. Acesse a aplicação no navegador

   http://localhost:5173

## Principais Funcionalidades

- Autenticação:
- Login e logout com Firebase Authentication.
- Visualização de Carros: Lista de carros disponíveis com imagens, preços e detalhes.
- Busca:
  Campo de busca para filtrar carros por nome.
- Detalhes do Carro: Modal com informações detalhadas do carro selecionado.
- Gerenciamento de Anúncios: Adicionar, editar e excluir anúncios (disponível no painel do administrador).

## Componentes principais

1. `Container`:
   Componente que encapsula o layout principal da aplicação.
2. `DashboardHeader`:
   Cabeçalho utilizado no painel administrativo.
3. `Inputs`: Componente reutilizável para campos de entrada.
4. `loading`: Componente de carregamento exibido durante operações assíncronas.
5. `ModalDetails`: Exibe informações detalhadas de um carro em um modal.
6. `Private`: Protege rotas que requerem autenticação.

## Contexto de Autenticação

O contexto de autenticação (`authContext`) gerencia o estado do usuário e fornece as seguintes propriedades:

1. `signed`: Indica se o usuário está autenticado.
2. `user`: Dados do usuário autenticado.
3. `loading`: Indica se a autenticação está em andamento.
4. `setLoading`: Função para atualizar o estado de carregamento

## Rotas

As rotas da aplicação são configuradas no arquivo `App.tsx`:

#### Rotas públicas

- `/`: Home.
- `/login`: Página de login.
- `/register`: Página de registro.

#### Rotas Privadas

- `/dashboard`: Painel administrativo (protegido pelo componente `Private`).

## Dependências

#### Principais dependências

- React: Biblioteca para construção da interface.
- React Router DOM: Gerenciamento de rotas.
- Firebase: Backend para autenticação e banco de dados.
- React Hook Form: Gerenciamento de formulários.
- Yup: Validação de formulários.
- Swiper: Biblioteca para carrosséis.

## Como Contribuir

1. Faça um fork do repositório.
2. Instale as dependências:

   ```bash
   git checkout -b minha-feature

   ```

3. Faça as alterações e commit:

   ```bash
   git commit -m "Adicionei uma nova feature"

   ```

4. Envie para o repositório remoto:

   ```bash
   git push origin minha-feature

   ```

5. Abra um Pull Request.

### Contato

Se você tiver dúvidas ou sugestões, entre em contato:

- Email: leandro.asalles182@gmail.com
- GitHub: `leandroasalles`
