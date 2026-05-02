# Password Reset Flow

This is a full-stack application that implements a secure password reset flow using Node.js, Express, MongoDB, and React.

## Features
- **Register**: Create a new account.
- **Forgot Password**: Send a password reset link to your email.
- **Reset Password**: Securely update your password using a temporary token.
- **Responsive UI**: Built with Bootstrap 5.
- **Notifications**: Toast alerts for success and error messages.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/password-reset.git
cd password-reset
```

### 2. Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/password-reset
   EMAIL_USER=your-verified-brevo-sender@email.com
   BREVO_API_KEY=your_brevo_api_key_here
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret_key
   ```
   > **Note**: For `BREVO_API_KEY`, generate an API key from your Brevo account (SMTP & API settings). Ensure `EMAIL_USER` is a verified sender in Brevo.
4. Start the server:
   ```bash
   node index.js
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Workflow
1. Go to `http://localhost:5173/register` to create a user.
2. Go to `http://localhost:5173/login` and click "Forgot Password?".
3. Enter your email. If the user exists, a reset link will be sent to your email.
4. Click the link in your email (it will look like `http://localhost:5173/reset-password/<token>`).
5. Enter your new password and submit.
6. You will be redirected to the login page upon success.
