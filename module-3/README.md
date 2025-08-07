# Credit Engine API

## 🌐 Deployed URL

This API is live at:  
**[https://credit-engine-q5am.onrender.com](https://credit-engine-q5am.onrender.com)**

A lightweight Node.js API that issues and tracks **"thank-you" credits** for user interactions across an ecosystem — including tech modules, social posts, referrals, spend multipliers, and coffee-wall actions.


## Project Overview

- ✅ Express server setup with logging and environment support.
- ✅ A model enumerating valid action types.
- ✅ API routes to:
  - Enroll a new user.
  - Credit a user for a specific action type.
  - Retrieve a user’s credit summary.

---
  
## ⚙️ Tech Stack

- Node.js
- Express.js
- Morgan (logging)
- dotenv (environment config)
- Postman (for testing)

---

## 📂 Folder Structure

```
credit-engine/
├── src/
│ ├── index.js          # Server bootstrap
│ ├── routes/
│ │ └── credits.js      # Route handlers
│ └── models/
│ └── actionTypes.js  # All valid action types
├── .env                # Environment config
├── .gitignore
├── package.json
└── README.md
```



##  How to Run Locally

### 1. Clone the Repository
```
git clone https://github.com/NaviGV/credit-engine.git
cd credit-engine
```

### 2. Install Dependencies
npm install

### 3. Create a .env File
PORT=5000

### 4. Start the Server
npm start


## API Endpoints

### 1.Enroll a User

**POST** `/api/enroll`
Enrolls a new user to the system

**📤 Send This in Request Body:**
```
{
  "userId": "user123"
}
```

**✅ Sample Success Response:**
```
{
  "message": "User user123 enrolled"
}
```


### 2.Credit a User

**POST** `/api/credits`  
Credits a user for an interaction.

**📤 Send This in Request Body:**
```
{
  "userId": "user123",
  "actionType": "techModule"
}
```

**✅ Sample Success Response:**
```
{
  "message": "Credited 10 points to user123",
  "total": 10
}
```

### 3.Get User Credits

**GET** `/api/credits/:userId`  
Fetches total credits and all actions of a user.

**✅ Sample Response:**
```
{
  "credits": [
    {
      "actionType": "techModule",
      "credit": 10
    }
  ],
  "total": 10
}
```

## Action Types
Defined in `src/models/actionTypes.js`:

```js
const ACTION_TYPES = Object.freeze({
  TECH_MODULE: 'techModule',
  SOCIAL_POST: 'socialPost',
  COFFEE_BUY: 'coffeeBuy',
  REFERRAL: 'referral',
  SPEND_MULTIPLIER: 'spendMultiplier',
  COFFEE_WALL: 'coffeeWall',
});

module.exports = ACTION_TYPES;
```

## Testing Guide (Postman)
Use Postman to test the following:

- ✅ **POST** `/api/enroll`  
  _Send:_ `{ "userId": "userId" }`

- ✅ **POST** `/api/credits`  
  _Send:_ `{ "userId": "userId", "actionType": "actionType" }`

- ✅ **GET** `/api/credits/:userId`

---

## 📝 Notes

- All users start with 0 credits.
- Each actionType gives +10 credits.
- Repeated crediting for the same or different actions is allowed.
- No duplicate enrollment allowed (`userId` must be unique).

---

##  Author & Contact

Built with care by **Naveenkumar G V**  
GitHub: [github.com/NaviGV](https://github.com/NaviGV)