# EdTech Project

## Overview

This project is a simple demostration of payment gateway. The application consists of a frontend built with React and a backend built with Node.js.

## Project Structure

- **Frontend**: Developed using React.
- **Backend**: Developed using Node.js.


## Getting Started

### Clone the Repository


git clone https://github.com/your-username/edtech-project.git
cd edtech-project

### Frontend
1. Navigate to the frontend directory:

   ```bash
    cd frontend
    ```

2. Install the dependencies:
 
    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add the following Firebase configuration variables:

    ```env
    REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
    ```
  
4. Start the frontend development server:

    ```bash
    npm run start
    ```

    The frontend will be accessible at `http://localhost:3000`.

### Backend
1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following variables:

    ```env
    PORT=8000
    DATABASE_URL=your-database-url
    STRIPE_SECRET_KEY=your-stripe-secret-key
    PAYPAL_CLIENT_ID=your-paypal-client-id
    PAYPAL_SECRET_KEY=your-paypal-secret-key
    STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
    ```

4. Start the backend server:

    ```bash
    npm run dev
    ```

    The backend will be accessible at `http://localhost:8000` .


   
This should provide a complete Markdown `README.md` for your project, including setup instructions for both the frontend and backend.

