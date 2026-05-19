# 🍲 Recipe App (React Native + Expo Go + Firebase)

## 📌 Overview

This Recipe App is a mobile application built using React Native and Expo Go, integrated with Firebase for backend services. It allows users to browse recipes, search for meals, and view detailed cooking instructions. Firebase is used for authentication, database storage, and optional media handling.

---

## 🚀 Features

* Browse a list of recipes
* Search recipes by name or category
* View recipe details (ingredients and instructions)
* Create new recipes using an in-app form
* Delete recipes from the recipe details screen
* User authentication (Login/Register)
* Save favorite recipes using Firebase
* Real-time database integration
* Clean and responsive mobile interface

---

## 🛠️ Tech Stack

* React Native
* Expo Go
* JavaScript (ES6+)
* React Navigation
* Firebase (Authentication, Firestore/Realtime Database)

---

## 📂 Project Structure

```
recipe-app/
│── assets/
│── components/
│── contexts/       # Auth, favorites, and recipe CRUD state
│── screens/
│── services/        # Firebase configuration and API calls
│── data/            # Local fallback recipe data
│── App.js
│── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Firebase

```bash
npm install firebase
```

### 4. Setup Firebase

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Create a **Firestore Database** (or Realtime Database)
5. Copy your Firebase configuration

Create a file:
`services/firebaseConfig.js`

```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export default app;
```

---

## 🔐 Firebase Features Used

### Authentication

* User registration and login using Email/Password

### Firestore Database

* Store recipes
* Save user favorites

Example collection structure:

```
recipes/
  └── recipeId
        ├── title
        ├── ingredients
        ├── instructions

users/
  └── userId
        ├── favorites: [recipeId]
```

---

## ▶️ Running the App

```bash
npx expo start
```

* Open Expo Go on your phone
* Scan the QR code

---

## 🧩 Future Improvements

* Add edit recipe feature
* Save created/deleted recipes permanently with Firebase Firestore
* Upload recipe images using Firebase Storage
* Add user profile management
* Implement ratings and reviews
* Add offline caching

---

# Contribution

## Villegas

Developed the main app UI including Home screen, RecipeCard component, and navigation flow with tab and stack navigators.

## Tusi

## Valeza


