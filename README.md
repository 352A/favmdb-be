# FavMDB Backend

A Node.js + Express backend for **FavMDB**, a web application to manage your favorite movies and TV shows.

## Features

- RESTful API with CRUD operations
- MySQL database with ORM (Sequelize)
- Schema validation using Zod
- Cursor-based pagination for infinite scroll support
- User authentication (login/signup/logout)
- Filtering functionality for entries
- Clean and modular project structure

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Validation**: Zod

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/352A/favmdb-backend.git
cd favmdb-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=favmdb
```

---

## 🧪 Run the Server

```bash
npm run dev
```

Server should now be running at `http://localhost:5000`

---

## 🧩 API Endpoints

### Create Entry

`POST /api/entries`

### Get Entries (with pagination)

`GET /api/entries?cursor=<lastEntryId>&limit=10`

### Update Entry

`PUT /api/entries/:id`

### Delete Entry

`DELETE /api/entries/:id`

All endpoints validate inputs using Zod and respond with appropriate HTTP status codes.

---

## 📁 Folder Structure

```bash
favmdb-backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validators/
├── config/
├── .env
├── app.js
└── server.js
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📬 Contact

For any questions or feedback, feel free to reach out to [ahmed95elhadad@gmail.com](mailto:ahmed95elhadad@gmail.com).
