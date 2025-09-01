# 🔗 Shortener

A full-stack URL shortener built with:

- **Frontend**: Next.js (App Router)
- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL (via Prisma)
- **Auth**: Minimal username/password + localStorage
- **Deployment**: Docker + Docker Compose

---

## 📂 Project Structure

```
urlShortener/
├── client/               # Next.js frontend
│   └── Dockerfile
│   └── ...
├── server/               # NestJS backend
│   └── Dockerfile
│   └── ...
├── docker-compose.yml    # Orchestrates client + server
└── README.md              # This file
```

---

## 🚀 Getting Started

### 🔧 Local Development

1. **Install dependencies**

```bash
cd client
npm install
cd ../server
npm install
```

2. **Setup PostgreSQL**

Start a local Postgres instance (or use Docker):

```bash
docker run --name shortener-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

3. **Create `.env` files**

> In both `client/` and `server/`, create a `.env` file using the `.env.example` provided.

4. **Run the backend**

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

5. **Run the frontend**

```bash
cd client
npm run dev
```

App will be available at:  
`http://localhost:3000`

---

### 🐳 Docker Setup (Full Stack)

Make sure you're at the project root:

```bash
docker compose up --build
```

Then visit:

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend: [http://localhost:5053](http://localhost:5053)

---

## 🔐 Authentication

Basic username/password authentication using:

- `localStorage` for session management
- Custom `x-user-id` header for protected API calls
- No third-party auth used

---

## 🌐 API Routes (Backend)

| Method | Route              | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/urls`           | Get all URLs for the user      |
| POST   | `/urls`           | Create a shortened URL         |
| PATCH  | `/urls/:id`       | Update a URL's slug            |
| GET    | `/:slug`          | Redirect to original URL       |
| POST   | `/auth/signup`    | Sign up with email/password    |
| POST   | `/auth/login`     | Log in with email/password     |

> All protected routes require the `x-user-id` header.

---

## 🔑 Environment Variables

### 📁 `server/.env`

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shortener"
JWT_SECRET="your_jwt_secret"
```

### 📁 `client/.env`

```
NEXT_PUBLIC_API_URL=http://localhost:5053
```

---

## ✨ Features

- 🔒 User authentication
- 📎 Shorten and edit URLs
- 📊 Track visit counts
- 📋 Copy-to-clipboard button
- 📦 Dockerized setup
- 💻 Local dev and Docker support

---

## 🛠 Future Improvements

- Rate limiting
- Custom analytics dashboard
- Expiration for short links
- Admin panel

---

## 📄 License

MIT – © 2025 Christopher Powell
