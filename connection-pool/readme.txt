# Node.js + Express + PostgreSQL Project

This project is built with:
- Express.js for server routing
- PostgreSQL as the database
- `pg` for raw SQL queries
- Prisma ORM for type-safe database access
- dotenv for environment config

---

## 📁 Project Structure
project-root/
│
├── server.js # Entry point (starts the server)
├── .env # Environment variables
├── db/
│ ├── db.js # PG Pool + connectToDB()
│ └── prisma.js # Prisma client
├── prisma/
│ ├── schema.prisma # Prisma schema
│ └── migrations/ # Auto-generated migrations

---

## ⚙️ Setup Instructions

1. Install dependencies:
    ```bash
    npm install
    ````
2. Setup environment variables in `.env`:
3. Run Prisma migration & generate client:
npx prisma migrate dev --name init

markdown
Copy
Edit
4. Start the server:
    ```bash
    npm start
    ```
5. Test the API with Postman or similar tool.