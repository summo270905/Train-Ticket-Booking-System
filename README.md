# 🚂 Train Ticket Booking System

A full-stack web application for managing train ticket bookings, built with Spring Boot (Backend) and React + Vite (Frontend).

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- **User Management**: Create, view, update, and delete users
- **Train Management**: Add trains with details like route, pricing, and seat capacity
- **Booking System**: Book train tickets with travel date and seat selection
- **Responsive UI**: Modern, mobile-friendly React interface with smooth animations
- **Real-time Updates**: Automatic refresh after CRUD operations
- **Error Handling**: User-friendly error messages and toast notifications
- **Component-Based Architecture**: Modular React components for better maintainability

---

## 🛠 Technology Stack

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React 18.2
- Vite 5.x (Build tool)
- Axios (HTTP client)
- Modern CSS3 with animations
- Component-based architecture

---

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java -version`

2. **Maven 3.6+**
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -version`

3. **MySQL Server 8.0+**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Verify installation: `mysql --version`

4. **Node.js 18+ and npm**
   - Download from: https://nodejs.org/
   - Verify installation: `node -v` and `npm -v`

5. **IDE (Optional but Recommended)**
   - IntelliJ IDEA / Eclipse / VS Code

6. **Web Browser**
   - Chrome, Firefox, Edge, or Safari (latest version)

---

## train_ticket_booking/            # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/trainbooking/train_ticket_booking/
│   │   │   │   ├── controller/      # REST API Controllers
│   │   │   │   │   ├── BookingController.java
│   │   │   │   │   ├── TrainController.java
│   │   │   │   │   └── UserController.java
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   │   └── BookingRequest.java
│   │   │   │   ├── exception/       # Custom Exceptions
│   │   │   │   │   └── ResourceNotFoundException.java
│   │   │   │   ├── model/           # Entity Classes
│   │   │   │   │   ├── Booking.java
│   │   │   │   │   ├── Train.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── repository/      # JPA Repositories
│   │   │   │   │   ├── BookingRepository.java
│   │   │   │   │   ├── TrainRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   │   ├── BookingService.java
│   │   │   │   │   ├── TrainService.java
│   │   │   │   │   └── UserService.java
│   │   │   │   └── TrainTicketBookingApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Test classes
│   └── pom.xml                      # Maven configuration
│
└── frontend/                        # Frontend (React + Vite)
    ├── src/
    │   ├── components/              # React Components
    │   │   ├── Header.jsx
    │   │   ├── Users.jsx
    │   │   ├── Trains.jsx
    │   │   ├── Bookings.jsx
    │   │   └── Toast.jsx
    │   ├── services/                # API Services
    │   │   └── api.js
    │   ├── App.jsx                  # Main App Component
    │   ├── App.css                  # App Styles
    │   ├── main.jsx                 # Entry Point
    │   └── index.css                # Global Styles
    ├── index.html                   # HTML Template
    ├── package.json                 # npm dependencies
    ├── vite.config.js               # Vite configuration
    └── .gitignorpt logic
│   │       └── application.properties
│   └── test/                        # Test classes
├── pom.xml                          # Maven configuration
└── README.md                        # This file
```

---

## 🔧 Installation & Setup

### Step 1: Clone or Download the Project

Navigate to the project directory:
```bash
cd "z:\aca\DEC TRAINING\SPRING BOOT\train_ticket_booking"
```

### Step 2: Setup MySQL Database

1. **Start MySQL Server**
   ```bash
   # On Windows (if MySQL is installed as a service)
   net start MySQL80
   ```

2. **Login to MySQL**
   ```bash
   mysql -u root -p
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE tbs;
   USE tbs;
   ```

4. **Exit MySQL**
   ```sql
   EXIT;
   ```

### Step 3: Configure Database Connection

Open `train_ticket_booking/src/main/resources/application.properties` and verify/update these settings:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tbs?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=1234
```

**⚠️ Important:** Update the `username` and `password` to match your MySQL credentials.

### Step 4: Install Backend Dependencies

Navigate to the backend directory:
```bash
cd train_ticket_booking
mvn clean install
```

This command will:
- Download all required dependencies
- Compile the project
- Run tests
- Package the application

### Step 5: Install Frontend Dependencies

Navigate to the frontend directory:
```bash
cd ..\frontend
npm install
```

This will install all required React and Vite dependencies.

---

## 🚀 Running the Application

### Running Backend (Spring Boot)

**Method 1: Using Maven**

Navigate to the backend directory:
```bash
cd train_ticket_booking
mvn spring-boot:run
```

**Method 2: Using Java (after building)**

```bash
# Build the JAR file
mvn clean package

# Run the JAR
java -jar target/train_ticket_booking-0.0.1-SNAPSHOT.jar
```

**Method 3: Using IDE**

1. Open the backend project in your IDE
2. Locate `TrainTicketBookingApplication.java`
3. Right-click and select "Run" or "Debug"

### Running Frontend (React + Vite)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

This will start the Vite development server.

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 🌐 Accessing the Application

Once both backend and frontend are running:

### Backend API
- **URL**: http://localhost:8080
- **Status**: Look for "Started TrainTicketBookingApplication" in console logs

### Frontend UI
- **URL**: http://localhost:3000
- Open this URL in your web browser

**Backend Console Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.x.x)

...
Started TrainTicketBookingApplication in X.XXX seconds
```

**Frontend Console Output:**
```
VITE v5.x.x ready in XXX ms
➜ Local:   http://localhost:3000/
```

---

## 📡 API Endpoints

### User Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/users` | Get all users |
| GET    | `/users/{id}` | Get user by ID |
| POST   | `/users` | Create new user |
| PUT    | `/users/{id}` | Update user |
| DELETE | `/users/{id}` | Delete user |

### Train Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/trains` | Get all trains |
| GET    | `/trains/{id}` | Get train by ID |
| POST   | `/trains` | Create new train |
| PUT    | `/trains/{id}` | Update train |
| DELETE | `/trains/{id}` | Delete train |

### Booking Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/bookings` | Get all bookings |
| GET    | `/bookings/{id}` | Get booking by ID |
| POST   | `/bookings` | Create new booking |
| DELETE | `/bookings/{id}` | Cancel booking |

---

## 📖 Usage Guide

### 1. Managing Users

**Create a User:**
1. Navigate to the "Users" tab
2. Fill in the user form:
   - Name: Full name of the user
   - Email: Valid email address
   - Phone: Contact number
3. Click "Save User"

**Edit/Delete User:**
- Use the "Edit" button to modify user details
- Use the "Delete" button to remove a user

### 2. Managing Trains

**Add a Train:**
1. Navigate to the "Trains" tab
2. Fill in the train form:
   - Train Name: e.g., "Rajdhani Express"
   - Train Number: Unique identifier
   - Source: Starting station
   - Destination: End station
   - Ticket Price: Price per ticket
   - Total Seats: Available seats
3. Click "Save Train"

### 3. Making Bookings

**Book a Ticket:**
1. Navigate to the "Bookings" tab
2. Select a user from the dropdown
3. Select a train from the dropdown
4. Choose travel date (today or future date)
5. Enter seat number
6. Click "Book Ticket"

**Cancel a Booking:**
- Click the "Cancel" button next to the booking

---

## 🐛 Troubleshooting

### Problem: Application won't start

**Solution 1: Check MySQL Service**
```bash
# Windows
net start MySQL80

# Check if MySQL is running
mysql -u root -p
```

**Solution 2: Verify Database Exists**
```sql
SHOW DATABASES;
-- If 'tbs' database doesn't exist, create it:
CREATE DATABASE tbs;
```

**Solution 3: Check Port 8080**
```bash
# Windows - Check if port 8080 is in use
netstat -ano | findstr :8080

# Kill process if needed (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Problem: Frontend not loading

**Solution:**
- Ensure backend is running on port 8080
- Ensure frontend dev server is running on port 3000
- Check backend API: http://localhost:8080/users
- Check browser console for errors (F12)
- Verify Node.js and npm are installed correctly

### Problem: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Problem: Vite dev server won't start

**Solution 1: Check Port 3000**
```bash
# Windows - Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process if needed (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution 2: Change Port**
Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Change to different port
    // ... rest of config
  }
})
```

### Problem: CORS errors in browser

**Solution:**
The controllers already have `@CrossOrigin("*")` annotation. If still experiencing issues:
1. Restart the Spring Boot application
2. Clear browser cache
3. Ensure you're accessing frontend from http://localhost:3000
4. Check that Vite proxy is configured correctly in `vite.config.js`

### Problem: Database connection failed

**Error:** `Communications link failure`

**Solution:**
1. Verify MySQL is running
2. Check credentials in `application.properties`
3. Test connection:
   ```bash
   mysql -u root -p -h localhost
   ```

### Problem: Port already in use
 (Backend) or `Port 3000 is already in use` (Frontend)

**Solution 1: Change Backend Port**
Add to `application.properties`:
```properties
server.port=8081
```
Then update frontend `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8081';
```

**Solution 2: Change Frontend Port**
Edit `vite.config.js`:
```javascript
server: {
  port: 3001
}
```

**Solution 3: Kill Process**
```bash
# Windows - for backend port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Windows - for frontend port 3000
netstat -ano | findstr :300
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## 🧪 Testing the API with cURL

### Create a User
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"1234567890\"}"
```

### Create a Train
```bash
curl -X POST http://localhost:8080/trains \
  -H "Content-Type: application/json" \
  -d "{\"trainName\":\"Express 101\",\"trainNumber\":\"EX101\",\"source\":\"New York\",\"destination\":\"Boston\",\"ticketPrice\":50.00,\"totalSeats\":100}"
```

### Create a Booking
```bash
curl -X POST http://localhost:8080/bookings \
  -H "Content-Type: application/json" \
  -d "{\"userId\":1,\"trainId\":1,\"travelDate\":\"2026-01-25\",\"seatNumber\":1}"
```

---

## 📝 Additional Notes

### Default Configuration
**Backend:**
- Server Port: 8080
- Database: tbs
- MySQL Port: 3306
- JPA: Auto DDL Update
- SQL Logging: Enabled

**Frontend:**
- Dev Server Port: 3000
- API Proxy: Configured for /api routes
- Hot Module Replacement: Enabled

### Development Commands

**Backend:**
```bash
mvn clean install      # Build project
mvn spring-boot:run    # Run application
mvn test              # Run tests
```

**Frontend:**
```bash
npm install           # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `dist` folder.

### Features in Development
- [ ] User authentication and authorization
- [ ] Seat availability checking in real-time
- [ ] Payment integration
- [ ] Email notifications
- [ ] Booking history per user
- [ ] Advanced search and filters
- [ ] Admin dashboard

---

## 📧 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all prerequisites are installed correctly
3. Ensure database connection is working
4. Check that all ports are available

---

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Guide](https://spring.io/guides/gs/accessing-data-jpa/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [REST API Best Practices](https://restfulapi.net/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

**Happy Coding! 🚀**
