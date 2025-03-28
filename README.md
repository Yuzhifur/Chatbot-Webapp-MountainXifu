# Mountain Xifu - Roleplay Chatbot Webapp V0.1.3

A roleplay chatbot web application based on Firebase, React, and language model APIs.

## Project Structure

This project is a React application with Firebase integration for authentication, database, and hosting.

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the project root:
   - Fill in your Firebase project credentials as NEXT_PUBLIC_FIREBASE_API_KEY
   - Set development/production mode with NODE_ENV=production or NODE_ENV=development

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Emulate and test:
   ```bash
   firebase emulators:start --only hosting,auth,firestore,functions,storage
   ```
   Open the emulated hosting in private browsing (with empty browser cache).

7. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Firebase Services Used
- Authentication - For user login
- Firestore - For data storage
- Hosting - For web app hosting
- Storage - For file storage

## Features
- User login with email/password
- More features coming soon