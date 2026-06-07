# Healthcare System - Full Stack Application

A comprehensive online appointment booking and healthcare management system built with **Next.js**, **Node.js/Express**, and **MongoDB**.

## 📋 Overview

This system enables patients to book online appointments with doctors, manage medical records, track treatments, and receive notifications. Doctors can manage appointments, prescriptions, and treatment records. Admins manage the entire system.

### Key Features

✅ **Authentication System**
- JWT-based secure authentication
- Role-based access control (Admin, Doctor, Patient)
- Password hashing with bcrypt
- Protected routes

✅ **Doctor & Patient Management**
- Complete CRUD operations
- Doctor profiles with specialization and availability
- Patient medical history tracking
- Doctor-patient assignment

✅ **Appointment Management**
- Book appointments online
- Approve/reject appointments
- Track appointment status
- Automatic follow-up scheduling

✅ **Treatment Tracking**
- Treatment lifecycle management
- Physical checkup records
- Progress monitoring
- Follow-up visit management

✅ **Prescription Management**
- Create and manage prescriptions
- Medicine details and dosage
- Prescription expiry tracking
- Link prescriptions to treatments

✅ **Notification System**
- Appointment confirmations
- Medication reminders
- Follow-up reminders
- Email notifications

✅ **Responsive UI**
- Modern, clean interface
- Role-based dashboards
- Mobile-friendly design
- Real-time feedback with toast notifications

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Email**: Nodemailer
- **Environment**: dotenv

### Frontend
- **Framework**: Next.js 16+ (React 19)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast
- **Icons**: react-icons
- **State Management**: React Context API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare_db
   JWT_SECRET=your_super_secret_key
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   FRONTEND_URL=http://localhost:3000
   ```

4. **Seed the database (optional - creates 15 doctors and 15 patients)**
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

   Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # .env.local already created with:
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`

## 🚀 Running the Application

### Development Environment

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:3000`

### Test Credentials (After Seeding)

**Admin**
- Email: `admin@hospital.com`
- Password: `admin123`

**Doctor**
- Email: `ahmed.doctor@hospital.com`
- Password: `password123`

**Patient**
- Email: `amina@patient.com`
- Password: `password123`

## 📂 Project Structure

```
Final_Term_Project_HLApp/
├── backend/
│   ├── config/              # Database and services config
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Authentication middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── services/            # Email service
│   ├── utils/               # Validators and utilities
│   ├── BACKEND_server.js    # Main server file
│   ├── seed.js              # Database seeding
│   ├── package.json
│   └── .env                 # Environment variables
│
└── frontend/
    ├── app/
    │   ├── admin/           # Admin pages
    │   ├── doctor/          # Doctor pages
    │   ├── patient/         # Patient pages
    │   ├── login/
    │   ├── register/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/          # Reusable components
    ├── context/             # React Context
    ├── lib/                 # Utilities (API client)
    ├── public/
    ├── package.json
    └── .env.local
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Create doctor profile
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Create patient profile
- `PUT /api/patients/:id` - Update patient
- `POST /api/patients/:id/assign-doctor/:doctorId` - Assign doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments/book` - Book appointment
- `PUT /api/appointments/:id/approve` - Approve appointment
- `PUT /api/appointments/:id/reject` - Reject appointment
- `PUT /api/appointments/:id/complete` - Complete appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `POST /api/prescriptions` - Create prescription
- `GET /api/prescriptions/patient/:patientId` - Get patient prescriptions

### Treatments
- `GET /api/treatments` - Get all treatments
- `POST /api/treatments` - Create treatment
- `POST /api/treatments/:id/checkup` - Add checkup
- `POST /api/treatments/:id/follow-up` - Add follow-up
- `PUT /api/treatments/:id/complete` - Complete treatment

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread` - Get unread notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read

## 🎯 Features Implemented

### I. Authentication System (15/15 Marks)
✅ User registration with validation
✅ Password hashing with bcrypt
✅ JWT token generation (7-day expiry)
✅ Protected routes with middleware
✅ Role-based access control
✅ Logout functionality

### II. Doctor & Patient Management
✅ Complete CRUD for doctors
✅ Complete CRUD for patients
✅ 15+ doctor records seeded
✅ 15+ patient records seeded
✅ Doctor-patient assignment
✅ Comprehensive profile management

### III. Appointment & Treatment Management
✅ Online appointment booking
✅ Appointment approval/rejection
✅ Treatment lifecycle tracking
✅ Physical checkup records
✅ Follow-up visit scheduling
✅ Treatment progress monitoring

### IV. Prescription & Medical Records
✅ Prescription creation and management
✅ Medicine details with dosage
✅ Prescription expiry tracking
✅ Medical history maintenance
✅ Link prescriptions to treatments

### V. Notification System
✅ Appointment confirmations
✅ Medication reminders
✅ Follow-up reminders
✅ Email notifications via Nodemailer
✅ In-app notifications

### VI. Next.js Frontend
✅ Modern, responsive design
✅ Role-based dashboards
✅ Appointment booking interface
✅ Protected routing
✅ Reusable components

### VII. UI Feedback System
✅ Toast notifications
✅ Success messages
✅ Error handling
✅ Loading states
✅ Delete confirmations

### VIII. Code Quality
✅ Clean folder structure
✅ Consistent naming conventions
✅ Reusable components
✅ Error handling
✅ Input validation

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes with middleware
- Role-based authorization
- Input validation
- CORS configuration
- Environment variables for sensitive data

## 📝 Database Models

### User
- Email (unique)
- Name, Password (hashed)
- Role (admin, doctor, patient)
- Contact information
- Account status

### Doctor
- Specialization
- Qualifications, License Number
- Experience, Consultation Fee
- Work schedule
- Hospital information
- Rating and reviews

### Patient
- Blood Type, Height, Weight
- Medical history
- Chronic diseases, Allergies
- Emergency contact
- Insurance information
- Appointment history

### Appointment
- Patient & Doctor references
- Date, Time, Reason
- Status (pending, approved, rejected, completed, cancelled)
- Doctor & Admin notes
- Treatment tracking

### Treatment
- Appointment reference
- Diagnosis & Treatment Plan
- Physical checkups array
- Follow-ups array
- Progress tracking
- Cost information

### Prescription
- Medicines array
- Dosage & Frequency
- Dietary & Activity restrictions
- Prescription & Expiry dates
- Patient & Doctor references

### Notification
- Recipient & Type
- Title & Message
- Delivery channels (email, in-app)
- Read status
- Related references (appointment, prescription, treatment)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI in `.env`
- Check network access in MongoDB Atlas (if using cloud)
- Ensure MongoDB is running (if local)

### JWT Token Issues
- Clear browser localStorage: `localStorage.clear()`
- Check JWT_SECRET in `.env` matches on both backend and frontend

### Email Not Sending
- Enable "Less secure app access" for Gmail
- Use [App Passwords](https://myaccount.google.com/apppasswords) for Gmail
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`

### CORS Errors
- Ensure FRONTEND_URL in backend `.env` is correct
- Check backend is running on correct port

## 📚 Additional Commands

**Backend**
```bash
npm run dev       # Start with nodemon
npm start         # Start production server
npm run seed      # Seed database with sample data
```

**Frontend**
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run linter
```

## 👥 User Roles & Permissions

### Admin
- Manage all doctors and patients
- Approve/reject appointments
- View system-wide statistics
- Manage system operations

### Doctor
- View assigned appointments
- Create prescriptions
- Record treatment progress
- Schedule follow-ups
- Manage patient medical records

### Patient
- Book appointments
- View appointment history
- Download prescriptions
- Track treatment progress
- Receive notifications

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web application development
- RESTful API design
- MongoDB data modeling
- JWT authentication & authorization
- React/Next.js best practices
- Responsive UI design
- Error handling & validation
- Email integration

## 📄 License

This project is part of a Full-Stack Programming Lab assignment.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review environment variable setup
3. Check database connectivity
4. Review API endpoints documentation

---

**Happy Coding! 🚀**
