# 🚀 Credit Engine API

This is a simple Express.js backend API that allows users to enroll and track credits based on actions they perform. It includes in-memory storage for users, dynamic credit endpoints, and a list of supported action types.

> ✅ Deployed on Render: [Live API](https://credit-engine-demo.onrender.com)

---

## 📁 Features

- 📌 **User Enrollment** (`/api/enroll`)
- 💰 **Credit Lookup** (`/api/credits/:userId`)
- 🛠️ **List of Action Types** (`/api/action-types`)
- 🧠 In-memory data storage
- 🌐 Deployed via Render
- 🔐 Ready for database/auth integration

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **Morgan** (for logging)
- **CORS** (for API access)
- **Render** (for deployment)

---

## 📚 API Endpoints

### 🔸 Root Route (Test if API is Live)
- `GET /`
- **Response:** `🚀 Credit Engine API is Live`

---

### 🔹 Enroll a User
- `POST /api/enroll`
- **Creates a new user with 0 credits.**

**Response:**
```json
{
  "userId": "user_1718269300380_256",
  "credits": 0
}



🔹 Get User Credit Info
GET /api/credits/:userId

Example:
GET /api/credits/user_1718269300380_256

Response:

json
Copy
Edit
{
  "userId": "user_1718269300380_256",
  "credits": 0
}
🔹 List All Action Types
GET /api/action-types

Response Example:

json
Copy
Edit
{
  "techModule": { ... },
  "socialPost": { ... },
  ...
}
🛠️ Local Setup Instructions
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/tousif7632/credit-engine-demo

# 2. Navigate to the folder
cd credit-engine-demo

# 3. Install dependencies
npm install

# 4. Run the server
node src/index.js
The app will run on http://localhost:3000 (or whatever port you set in .env).

🌍 Live Deployment
Render URL:
https://credit-engine-demo.onrender.com

📂 Folder Structure
pgsql
Copy
Edit
src/
├── index.js            # Main server file
└── models/
    └── actionTypes.js  # Action types data
📌 Future Scope
✅ MongoDB database integration

🔐 JWT-based user authentication

🌟 Credit history & analytics

📊 Frontend dashboard in React

🧑 Author
Made with ❤️ by Tousif
🔗 GitHub

yaml
Copy
Edit

---

### ✅ What Next?

1. Save this file as `README.md` in your root folder.
2. Push to GitHub:
   ```bash
   git add README.md
   git commit -m "Add project README"
   git push origin main
