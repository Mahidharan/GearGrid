# GearGrid - Car Parts E-Commerce Platform

A full-stack MERN application for car parts e-commerce with dual login support for customers and mechanics.

## Features

### User Management

- **Dual Login System**: Separate login for Customers and Mechanics
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different features and pricing for different user types

### Customer Features

- Browse car parts catalog
- View retail pricing
- Place manual orders
- View order history
- User dashboard

### Mechanic Features

- Access to wholesale/mechanic pricing
- Create restock reminders with custom intervals
- Automated reorder from reminders
- Track manual vs reminder-based orders
- Mechanic dashboard with due reminders

### Product Management

- Dual pricing (retail & mechanic)
- Stock management
- Category filtering
- Product search

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication (httpOnly cookies)
- bcryptjs for password hashing
- cookie-parser for cookie handling

### Frontend

- React 18
- Vite
- React Router v6
- Axios for API calls
- Context API for state management
- Tailwind CSS for styling

## Project Structure

```
GearGrid/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── reminderController.js
│   ├── data/
│   │   └── products.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── RestockReminder.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── reminderRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── CustomerDashboard.jsx
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── MechanicDashboard.jsx
    │   │   ├── OrderHistoryPage.jsx
    │   │   ├── ProductDetailsPage.jsx
    │   │   ├── ProductListPage.jsx
    │   │   └── RegisterPage.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── orderService.js
    │   │   ├── productService.js
    │   │   └── reminderService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    │   └── geargridlogo.png
    ├── .env.example
    ├── .env.production
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone the repository

```bash
cd GearGrid
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (see `.env.example` for reference):

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/geargrid
JWT_SECRET=your_secure_jwt_secret_key_here
NODE_ENV=development
```

For production (Render), set these environment variables in your deployment platform.

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

For local development, the Vite proxy will handle API calls. For production, create a `.env.production` file:

```env
VITE_API_URL=https://geargrid.onrender.com
```

### Running the Application

#### Start MongoDB

Make sure MongoDB is running on your machine or you have a MongoDB Atlas connection string.

#### Start Backend Server

```bash
cd backend
npm run dev
# Server runs on http://localhost:8000
```

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

## Deployment

### Production URLs

- Frontend: https://jeeva-grid.vercel.app
- Backend API: https://geargrid.onrender.com

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `PORT=8000`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `NODE_ENV=production`
4. Set build command: `npm install`
5. Set start command: `node server.js`

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Set environment variable:
   - `VITE_API_URL=https://geargrid.onrender.com`
5. Deploy!

### Seeding Sample Data (Optional)

You'll need to manually create some products in the database. You can use MongoDB Compass or create a seed script.

Sample product structure:

```javascript
{
  "name": "Brake Pads",
  "description": "High-quality ceramic brake pads",
  "image": "https://via.placeholder.com/300",
  "category": "Brakes",
  "retailPrice": 89.99,
  "mechanicPrice": 59.99,
  "stock": 50
}
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders

- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/user/:userId` - Get user orders (Protected)

### Reminders (Mechanics Only)

- `POST /api/reminders` - Create restock reminder (Protected, Mechanic)
- `GET /api/reminders/user/:userId` - Get user reminders (Protected)
- `POST /api/reminders/reorder` - Reorder from reminder (Protected, Mechanic)

## User Roles

### Customer

- Can view products at retail price
- Can place orders
- Can view order history
- Automatically verified upon registration

### Mechanic

- Can view products at mechanic (wholesale) price
- Can place orders
- Can create restock reminders
- Can reorder from reminders
- isVerified defaults to false (can be used for admin approval)

## Key Features Explained

### Restock Reminders

Mechanics can set up automatic restock reminders for products they order frequently:

1. Set quantity and interval (in days)
2. System tracks next reminder date
3. Dashboard shows due reminders
4. Click "Reorder Now" to create order and update next reminder date

### Dual Pricing

- Products have both retail and mechanic prices
- Price displayed depends on logged-in user's role
- Orders track which price was used

### Order Types

- **Manual**: User-initiated orders
- **Reminder**: Orders created from restock reminders

## Development Notes

- Frontend uses React Context API for authentication state
- Protected routes redirect unauthorized users to login
- Role-based route protection ensures mechanics/customers see appropriate pages
- JWT tokens stored in httpOnly cookies for enhanced security (not in localStorage)
- Passwords hashed with bcrypt before storage
- Loading spinner with gear animation for route transitions
- Environment-aware API URLs using Vite environment variables
- CORS configured for both local development and production deployment

## Future Enhancements

- Admin panel for product management
- Email notifications for reminders
- Payment gateway integration
- Order tracking and status updates
- Product reviews and ratings
- Advanced search and filtering
- Shopping cart functionality
- Wishlist feature

## License

MIT

## Author

Your Name

---

**Note**: This is a demo application. For production use, implement additional security measures, input validation, error handling, and testing.
