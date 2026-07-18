# Book Store App

A React Native (Expo) training app for CRUD operations against a books API.

## Features

- View all books from API
- Create a new book
- Edit an existing book
- Delete a book
- Modal form flow for add/edit

## Tech Stack

- React Native
- Expo
- TypeScript
- Axios

## Screenshots

<img width="300" alt="Books list" src="https://github.com/user-attachments/assets/d894594d-22e0-472a-98db-651b0577ee28" />
<img width="300" alt="Book details list view" src="https://github.com/user-attachments/assets/7814c5ca-d671-49db-9738-7d935580ff07" />
<img width="300" alt="Edit book modal" src="https://github.com/user-attachments/assets/1c7ef64c-c6b5-4aa3-a506-c403bcc66469" />
<img width="300" alt="Create book modal" src="https://github.com/user-attachments/assets/da88e917-9ccb-4f9a-895d-42001aac2c78" />

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variable

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_BOOKS_API_URL=https://your-api-url-here/books
```

You can copy from `.env.example`.

### 3. Start the app

```bash
npm start
```

## Scripts

- `npm start` - start Expo dev server
- `npm run android` - run on Android
- `npm run ios` - run on iOS
- `npm run web` - run on web

