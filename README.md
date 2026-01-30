# 🍳 My Recipe Book

A beautiful React-based recipe website with real-time sync across all users via Firebase.

## Features

- ✨ Add, edit, and delete recipes
- 📝 Ingredients and step-by-step instructions
- 📷 Multiple image upload support
- 🔍 Search functionality
- ☁️ Real-time sync with Firebase
- 📱 Fully responsive design
- 🚀 Easy GitHub Pages deployment

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase (for multi-user sync)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to **Realtime Database** → Create Database → Start in **test mode**
4. Go to **Project Settings** → Add web app
5. Copy your config to `src/firebase/config.js`

### 3. Run Locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

## Deploy to GitHub Pages

### 1. Update `package.json`

Change the `homepage` field:

```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```

### 2. Deploy

```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch automatically!

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── RecipeList.js
│   ├── RecipeCard.js
│   ├── RecipeForm.js
│   ├── RecipeDetail.js
│   └── Notification.js
├── hooks/
│   ├── useRecipes.js
│   └── useImageUpload.js
├── firebase/
│   └── config.js
├── styles/
│   └── index.css
├── App.js
└── index.js
```

## Technologies

- React 18 with Hooks
- Firebase Realtime Database
- React Router (HashRouter for GitHub Pages)
- Lucide React Icons
- CSS3 with CSS Variables

## License

MIT
