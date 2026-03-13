# RailBhoomi - Railway Complaint Management System

A comprehensive web application for managing railway complaints with department-wise routing and priority management using Firebase.

## Features

- **User Registration & Login**: Secure user authentication system
- **Complaint Submission**: Submit complaints with image attachments
- **Department Routing**: Automatic routing to appropriate departments (Cleanliness, Emergency, Canteen)
- **Priority Management**: Priority assignment (High, Medium, Low)
- **Status Tracking**: Track complaint status (New, In Progress, Resolved, Closed)
- **Department Dashboard**: Separate login for department staff
- **File Upload**: Support for image attachments with complaints
- **Real-time Database**: Firebase Firestore for real-time data sync

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage (for file uploads)
- **Authentication**: Firebase Admin SDK
- **Frontend**: HTML, CSS, JavaScript
- **File Upload**: Multer (local storage)

## Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Storage

2. **Generate Service Account Key**:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

3. **Configure Environment Variables**:
   - Copy values from the downloaded JSON to your `.env` file

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd railway-complaint-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Firebase configuration:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5001
```

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### User Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /department-login` - Department staff login

### Complaints
- `POST /submit-complaint` - Submit a new complaint
- `GET /complaints` - Get all complaints
- `GET /user-complaints/:email` - Get complaints by user email
- `GET /department-complaints/:department` - Get complaints by department
- `PUT /complaint/:id` - Update complaint status

### Setup
- `GET /setup-department-users` - Create default department users

## Firebase Collections

The app uses these Firestore collections:

### `complaints`
```javascript
{
  name: "User Name",
  email: "user@email.com",
  complaint: "Complaint description",
  priority: "High Priority" | "Medium Priority" | "Low Priority",
  status: "New" | "In Progress" | "Resolved" | "Closed",
  department: "Cleanliness" | "Emergency" | "Canteen" | "General",
  images: ["path1.jpg", "path2.jpg"],
  date: Timestamp
}
```

### `users`
```javascript
{
  name: "User Name",
  email: "user@email.com",
  password: "hashed_password",
  role: "User" | "Admin",
  date: Timestamp
}
```

### `departmentUsers`
```javascript
{
  name: "Department Name",
  email: "dept@email.com",
  password: "hashed_password",
  department: "Cleanliness" | "Emergency" | "Canteen",
  date: Timestamp
}
```

## Default Department Users

After running the setup endpoint, these users will be created:
- **Cleanliness**: clean@railway.com / clean123
- **Emergency**: emergency@railway.com / emergency123
- **Canteen**: canteen@railway.com / canteen123

## Project Structure

```
├── src/
│   ├── uploads/         # File uploads
│   ├── assets/          # Static assets
│   ├── *.html          # Frontend pages
│   ├── *.css           # Stylesheets
│   └── *.js            # Frontend scripts
├── firebaseConfig.js    # Firebase configuration
├── server.js           # Main server file
├── package.json        # Dependencies
└── README.md           # Documentation
```

## Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Firebase Hosting (for frontend)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize hosting: `firebase init hosting`
3. Deploy: `firebase deploy`

## Security Notes

- Store Firebase service account key securely
- Use environment variables for all sensitive data
- Implement proper password hashing in production
- Set up Firebase Security Rules for Firestore

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@railbhoomi.com or create an issue in the repository.