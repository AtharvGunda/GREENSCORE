# GreenScore

<div align="center">
  <h3>Cinematic ESG Reporting for the Net-Zero Enterprise</h3>
  <p>Executive-grade carbon analytics and green marketplace portfolio management.</p>
</div>

## 🌟 Overview

GreenScore is a comprehensive platform designed to help enterprises achieve net-zero goals through advanced carbon tracking, ESG reporting, and sustainable financing solutions. It combines intuitive dashboards, AI-powered insights, and a marketplace for green loans and savings products.

## ✨ Features

### 📊 Carbon Analytics Dashboard
- Real-time carbon footprint tracking
- Interactive charts and visualizations (emissions trends, sector comparisons, pillar radar charts)
- KPI monitoring and insights panel
- Eco-gauge for sustainability scoring

### 📈 ESG Reporting
- Automated report generation
- Customizable formulas and metrics
- PDF export capabilities
- Executive-grade visualizations

### 🏪 Green Marketplace
- Loan schemes and financing options
- Savings calculator
- Portfolio management tools
- Sustainable investment opportunities

### 🔐 User Management
- Secure authentication and authorization
- Admin and user roles
- Profile management

### 🤖 AI-Powered Insights
- Intelligent carbon scoring algorithms
- Predictive analytics for emissions trends
- Personalized recommendations

## 🛠️ Tech Stack

### Frontend (Client)
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Chart.js/Recharts** for data visualization
- **Three.js** for 3D components
- **Google GenAI** for AI features

### Backend (Server)
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for validation

### Infrastructure
- **Docker Compose** for containerized database
- **PostgreSQL 16** in Alpine container

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd greenscore
```

### 2. Install Dependencies
```bash
# Install all dependencies for client and server
npm run install:all
```

### 3. Database Setup
```bash
# Start PostgreSQL database with Docker Compose
docker-compose up -d
```

### 4. Environment Configuration
Create environment files for both client and server:

#### Server (.env)
```env
PORT=5000
DATABASE_URL=postgresql://greenscore_user:greenscore_pass@localhost:5433/greenscore
JWT_SECRET=your-jwt-secret-key
```

#### Client (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### 5. Build and Run
```bash
# Development mode (runs both client and server concurrently)
npm run dev

# Production build
npm run build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
greenscore/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   └── database/      # SQL schemas and seeds
│   ├── package.json
│   └── tsconfig.json
├── shared/                 # Shared types and utilities
├── docker-compose.yml      # Database container config
└── package.json           # Root package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Carbon Tracking
- `GET /api/carbon/emissions` - Get emissions data
- `POST /api/carbon/input` - Submit carbon input
- `GET /api/carbon/score` - Get carbon score

### Reports
- `GET /api/reports/generate` - Generate ESG report
- `GET /api/reports/download` - Download report PDF

### Marketplace
- `GET /api/loans/schemes` - Get loan schemes
- `POST /api/loans/calculate` - Calculate savings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@greenscore.com or join our Slack community.

---

<div align="center">
  <p>Built with ❤️ for a sustainable future</p>
</div>
