# 🚀 Healthcare System - Quick Start Guide

## Project Summary

Your **Full-Stack Healthcare System** is now complete! This comprehensive application includes:

### ✅ What's Been Created

#### Backend (Node.js + Express + MongoDB)
- ✅ Complete authentication system (JWT, bcrypt)
- ✅ 6 MongoDB models (User, Doctor, Patient, Appointment, Treatment, Prescription, Notification)
- ✅ 7 API route files (Auth, Doctor, Patient, Appointment, Treatment, Prescription, Notification)
- ✅ 6 controllers with complete CRUD operations
- ✅ Email service for notifications
- ✅ Middleware for authentication & authorization
- ✅ Database seed file (generates 15 doctors + 15 patients)
- ✅ Utilities for validation & error handling

#### Frontend (Next.js + React + Tailwind)
- ✅ Authentication context & protected routes
- ✅ Responsive UI with Tailwind CSS
- ✅ Role-based dashboards (Admin, Doctor, Patient)
- ✅ Pages created:
  - Login & Register
  - Homepage
  - Patient Dashboard & Profile
  - Doctor Dashboard & Profile
  - Admin Dashboard
  - Appointment Booking
  - Unauthorized access page
- ✅ API client with Axios
- ✅ Toast notifications with react-hot-toast
- ✅ Reusable components

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v14+) and **npm** installed
- **MongoDB** (Cloud Atlas or local)
- **Git** (optional)

## 🎯 Step 1: Setup Backend

### 1a. Navigate to Backend
```bash
cd Final_Term_Project_HLApp/backend
```

### 1b. Install Dependencies
```bash
npm install
```

### 1c. Configure Environment Variables
```bash
# Copy example file
cp .env.example .env

# Edit .env with your credentials
nano .env
# or open in your editor
```

**Required .env values:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare_db
JWT_SECRET=your_secret_key_minimum_32_characters
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Note:** For Gmail app password:
1. Go to https://myaccount.google.com/apppasswords
2. Select Mail and Windows Computer
3. Generate and copy the 16-character password

### 1d. Seed Database (Optional - Creates Test Data)
```bash
npm run seed
```

This creates:
- 15 doctors with different specializations
- 15 patients with medical profiles
- 1 admin account

**Test Credentials:**
```
Admin:
  Email: admin@hospital.com
  Password: admin123

Doctor:
  Email: ahmed.doctor@hospital.com
  Password: password123

Patient:
  Email: amina@patient.com
  Password: password123
```

### 1e. Start Backend Server
```bash
npm run dev
```

✅ Backend running at: `http://localhost:5000`
✅ Check health: `http://localhost:5000/api/health`

## 🎯 Step 2: Setup Frontend

### 2a. Open New Terminal & Navigate to Frontend
```bash
cd Final_Term_Project_HLApp/frontend
```

### 2b. Install Dependencies
```bash
npm install
```

### 2c. Start Frontend Development Server
```bash
npm run dev
```

✅ Frontend running at: `http://localhost:3000`

## 🌐 Access the Application

1. **Open browser** → `http://localhost:3000`
2. **Try these actions:**

### As Patient:
- Click "Register" → Select "Patient" role
- Or login with: `amina@patient.com` / `password123`
- Complete medical profile
- Book appointment with a doctor
- View appointment history
- Check notifications

### As Doctor:
- Click "Register" → Select "Doctor" role  
- Or login with: `ahmed.doctor@hospital.com` / `password123`
- Complete professional profile
- View assigned appointments
- Create prescriptions
- Record treatment progress

### As Admin:
- Login with: `admin@hospital.com` / `admin123`
- View dashboard with statistics
- Manage doctors and patients
- Approve/reject appointments
- View all system data

## 📊 Key Features to Test

### 1. Authentication
- Register new user
- Login with correct credentials
- Verify JWT token in localStorage
- Logout functionality

### 2. Doctor Management
- View list of doctors
- Filter by specialization
- View doctor details
- Admin can add/remove doctors

### 3. Patient Management
- View patient profiles
- Edit medical information
- Track appointments
- View medical history

### 4. Appointments
- Book new appointment
- Select doctor and time
- View appointment status
- Admin approves/rejects
- Mark as completed

### 5. Prescriptions
- Doctor creates prescription
- Add medicines with dosage
- Set expiry date
- Patient views prescriptions

### 6. Notifications
- Receive appointment confirmations
- Medication reminders
- Follow-up reminders
- Email notifications (if email configured)

## 🔧 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use different port in .env
PORT=5001
```

### MongoDB Connection Error
- Verify MONGODB_URI in .env
- Check MongoDB network access (if using Atlas)
- Ensure MongoDB is running (if local)
```bash
# Test connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(e => console.log('❌', e.message))"
```

### Frontend Can't Connect to Backend
```bash
# Check NEXT_PUBLIC_API_URL in .env.local
# Should be: http://localhost:5000/api

# Clear browser cache
# Or open DevTools → Application → Storage → Clear All
```

### Email Not Working
- Enable "Less secure app access" for Gmail
- Use [App Passwords](https://myaccount.google.com/apppasswords)
- Check EMAIL_USER and EMAIL_PASSWORD in .env

## 📁 Project Structure

```
Final_Term_Project_HLApp/
├── backend/
│   ├── app/admin/              # Admin dashboard
│   ├── config/                 # Database config
│   ├── controllers/            # Request handlers
│   ├── middleware/             # Auth middleware
│   ├── models/                 # Database schemas
│   ├── routes/                 # API routes
│   ├── services/               # Email service
│   ├── utils/                  # Validators & helpers
│   ├── BACKEND_server.js       # Main server
│   ├── seed.js                 # Database seeding
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── admin/              # Admin pages
    │   ├── doctor/             # Doctor pages
    │   ├── patient/            # Patient pages
    │   ├── login/
    │   ├── register/
    │   └── layout.tsx
    ├── components/             # Reusable UI components
    ├── context/                # React Context (Auth)
    ├── lib/                    # API client
    └── package.json
```

## 🚀 Production Deployment

### Backend Deployment (Heroku, Vercel, etc.)
```bash
# Set environment variables on hosting platform
# Use: npm start (instead of npm run dev)
```

### Frontend Deployment (Vercel, Netlify, etc.)
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 API Documentation

### Base URL: `http://localhost:5000/api`

#### Authentication Endpoints
```
POST   /auth/register
POST   /auth/login
GET    /auth/me
PUT    /auth/profile
POST   /auth/logout
```

#### Doctor Endpoints
```
GET    /doctors
GET    /doctors/:id
POST   /doctors
PUT    /doctors/:id
DELETE /doctors/:id
```

#### Patient Endpoints
```
GET    /patients
GET    /patients/:id
POST   /patients
PUT    /patients/:id
DELETE /patients/:id
```

#### Appointment Endpoints
```
GET    /appointments
POST   /appointments/book
PUT    /appointments/:id/approve
PUT    /appointments/:id/reject
PUT    /appointments/:id/complete
PUT    /appointments/:id/cancel
```

#### Other Endpoints
- Prescriptions: `/prescriptions`
- Treatments: `/treatments`
- Notifications: `/notifications`

## 🎓 Learning Points

This project demonstrates:
1. ✅ Full-stack web development
2. ✅ RESTful API design
3. ✅ MongoDB data modeling
4. ✅ JWT authentication
5. ✅ React/Next.js best practices
6. ✅ Responsive UI design
7. ✅ Error handling
8. ✅ Email integration
9. ✅ Role-based authorization
10. ✅ Cloud database usage

## 🆘 Need Help?

### Check these resources:
1. **README.md** - Comprehensive project documentation
2. **Backend logs** - Check terminal for error messages
3. **Browser DevTools** - Network tab for API errors
4. **MongoDB Atlas** - Check database records

### Common Issues:
- **Login fails**: Check password spelling, verify user exists in database
- **404 errors**: Ensure backend is running on port 5000
- **CORS errors**: Check FRONTEND_URL in backend .env
- **Data not saving**: Check MongoDB connection and database

## ✨ Next Steps

To extend this project:
1. Add payment processing
2. Implement video consultation
3. Add advanced analytics
4. Create mobile app
5. Add appointment reminders (scheduler)
6. Implement doctor ratings & reviews
7. Add prescription refill system
8. Create patient medical reports

## 📝 Important Notes

- **Never commit .env files** to version control
- **Change JWT_SECRET** in production
- **Use HTTPS** in production
- **Backup MongoDB** regularly
- **Monitor API usage** and rate limit
- **Keep dependencies updated**

---

**🎉 Your Healthcare System is ready to use!**

For detailed information, check [README.md](./README.md)

Happy Coding! 🚀
