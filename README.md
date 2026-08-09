# COMENTARIOS PARA SU REVISIÓN

    -Este proyecto es fullstack y esta completo, es decir, fue saltado (por confusión) entregar solo frontend, así que fue realizado completo con backend.
    -El frontend trabaja con Vite ya que desde el inicio del bootcamp se trabaja con ello.
    -La página está hecha en inglés ya que es el mercado demográfico al que se piensa que vaya dirigido.
    -Se muestra un máximo de 9 resultados por búsqueda de trabajo para ser objetivos, pero se piensa que menos de esos resultados supondría un fastidio en el usuario al tener que recurrir al botón de next continuamente, ya que cuando se busca un empleo se suele querer varias opciones para poder comparar.
    -La API third party se había creado en el backend ya que se investigó que es más seguro, pero por solictud en la primera revisión, se transfirió al frontend.

# FINAL-FULLSTACK-PROJECT

    A helpful, modern and responsive website to search jobs. Just an easy filter to find the best vacancies at the best companies, you investigate further for what you want.

## Project Overview

This project is part of a final project for the bootcamp TripleTen. Build to search jobs easily only filters avoiding all the processes that most of the apps ask for when creating an account. The user can create an account with their email (for now, with any kind of email, incluiding not a real one) a name (thinking place the user name on the header soon) and a password. After the user has searched the jobs of interest, the best ones can be saved so the user can see the vacancy and the company name, as well as the location (when provided) so the user can contact the HR team directly on the companies platforms.

This website is using the [The Muse API](https://www.themuse.com/developers/api/v2) for the searching jobs functionality.

### [Try it by yourself](https://project-ef82d4ab-d03e-4bdb-b4a.web.app/login)

## Technologies Used

### FRONTEND

- React — UI library
- Vite — dev server and build tool
- BEM metodology
- React Router DOM — routing (public/protected routes)
- PropTypes — runtime prop type validation
- Plain CSS (no framework like Tailwind/Bootstrap) — BEM-style class naming
- Fonts: "Raleway", Arial, sans-serif;, Arial, sans-serif; and "Federo", Arial, sans-serif; from Google Fonts

### BACKEND

- Node.js — runtime
- Express — server framework
- Mongoose — ODM for MongoDB (schemas, models)
- bcrypt — password hashing
- jsonwebtoken (JWT) — session tokens
- cookie-parser — cookie parsing (for the httpOnly JWT)
- cors — cross-origin access control
- celebrate + Joi — request validation (body/params) before reaching controllers
- dotenv — environment variable loading in local development
- winston + express-winston — request/error logging
- nodemon — auto-reload during development

### DATABASE

- MongoDB — NoSQL database
- MongoDB Atlas — managed database hosting in production

### EXTERNAL API

- [The Muse API](https://www.themuse.com/developers/api/v2) — job listings data source (categories, levels, search, pagination)

## Getting Started (Local Installation)

### Prerequisites

- Node.js (the latest one)
- npm
- A MongoDB instance — either running locally, or a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (I used this option)
- A [The Muse API](https://www.themuse.com/developers/api/v2) key (optional — the app works without one, but with a lower rate limit)

### 1. Clone the repository

git clone https://github.com/maggiegutierrez/FINAL-FULLSTACK-PROJECT.git
cd FINAL-FULLSTACK-PROJECT

### 2. Backend setup

cd backend
npm install

Create a `.env` file in `backend/` (you can copy `.env.example` as a starting point) with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
MUSE_API_KEY=your_muse_api_key
PORT=3000

Start the server:

npm run dev
The API will run at `http://localhost:3000`.

### 3. Frontend setup

In a separate terminal:

cd frontend
npm install

Create a `.env` file in `frontend/` (you can copy `.env.example` as a starting point) with:
VITE_API_URL=http://localhost:3000

Start the dev server:
npm run dev
The app will be available at `http://localhost:5173`

## Development Process

For the authentication and security was use JWT in an httpOnly cookie (instead of localStorage) — so the token isn't accessible from client-side JavaScript.
The infrastructure was build an deployed with:

- Google Cloud Run — backend hosting (containerized, auto-scaling)
- Google Cloud Build — builds the backend's container image from source
- Google Secret Manager — production secrets management (MONGO_URI, JWT_SECRET, MUSE_API_KEY)
- Firebase Hosting — frontend hosting (static site)

With a great version control and workflow combining Git + GitHub with a develop → Pull Request → main flow; and Postman for manual testing of backend endpoints during development.
Claude Code was used as a virtual tutor only for guidance with the flow, recommendations and explanations. No code was created or "touch" by it.

## Author

Maggie Gutiérrez

- GitHub: @maggiegutierrez

## Acknowledgments

TripleTen
