# Credit Engine API

A Node.js + Express-based REST API for user registration with referral rewards, post creation, and credit tracking using a MySQL database.

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/SudipDey18/credit_engine.git
   cd credit_engine
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following:

   ```env
   DB_HOST=your-db-host
   DB_PORT=your-db-port
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   CA_CERTIFICATE=path-to-ca-certificate
   ```

4. **Run the server**

   ```bash
   nodemon index.js
   ```

---

## 📁 Project Structure

```
src/
├── Config/
│   └── db.js           # DB connection pool setup
├── Routes/
│   └── api.js          # All main API routes
├── app.js              # Express app setup
├── index.js            # App entry and DB check

tests/
├── userCreation.test.js
├── creditHistory.test.js
├── postCreation.test.js
```

---

## 📄 API Endpoints

### ➕ POST `/api/create`

Create a user and assign credits. Supports referral code logic.

**Request Body:**

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "pass123",
  "refferalCode": "abcd1234"
}
```

**Success Response:**

```json
{
  "message": "User Created Sucessfuly"
}
```

**Error Responses:**

* `{ "message": "username already exist" }`
* `{ "message": "email already exist" }`
* `{ "message": "something went wrong" }`

---

### 📄 GET `/api/user/:username`

Fetch credit history and total credits for a user.

**Success Response:**

```json
{
  "totalCredit": 12,
  "history": [
    {
      "credit_point": 2,
      "credit_action": "signup",
      "transaction_date": "2025-06-14"
    }
  ]
}
```

**Error Response:**

* `{ "message": "user not exist" }`

---

### 📜 POST `/api/post`

Create a new post and reward the user with credits.

**Request Body:**

```json
{
  "username": "john",
  "postTitle": "My Post",
  "postContent": "This is my post content."
}
```

**Success Response:**

```json
{
  "message": "post created sucessfully"
}
```

**Error Responses:**

* `{ "message": "Missing required fields" }`
* `{ "message": "something went Wrong" }`

---

## 🔮 Running Tests

Run tests using Jest and Supertest:

```bash
npm test
```

Test coverage includes:

* `/api/create`: `userCreation.test.js`
* `/api/user/:username`: `creditHistory.test.js`
* `/api/post`: `postCreation.test.js`

---

## 📅 Tech Stack

* Node.js
* Express.js
* MySQL (mysql2)
* Jest + Supertest

---

## 👥 Author

Sudip Dey
