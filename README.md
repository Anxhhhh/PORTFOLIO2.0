# Portfolio 2.0 - Cinematic 3D Portfolio

A premium, cinematic 3D portfolio website built with React, Three.js, and Framer Motion. This project features a modern dark aesthetic, smooth scrolling transitions, and a fully functional contact system.

## 🚀 Architecture Overview

The project follows a **Client-Server architecture**:

- **Frontend**: A high-performance React application powered by Vite, utilizing Three.js for 3D renderings and GSAP/Framer Motion for complex animations.
- **Backend**: A Node.js Express server that handles form submissions and sends automated email notifications using Nodemailer.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Email Service**: [Nodemailer](https://nodemailer.com/)
- **Security**: [Dotenv](https://github.com/motdotla/dotenv) for environment variables
- **CORS**: [Cors](https://github.com/expressjs/cors) for cross-origin resource sharing

## 📂 Project Structure

```text
finalPortFolio/
├── frontend/             # React application source code
│   ├── src/
│   │   ├── components/   # UI Components (Sections, Layout, Common)
│   │   ├── fonts/        # Custom typography
│   │   └── App.jsx       # Main application entry
│   └── vite.config.js    # Vite configuration
├── backend/              # Node.js server source code
│   ├── server.js         # Express server & Mail logic
│   ├── .env              # Environment variables (not tracked)
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd finalPortFolio
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `env.example`:
   ```text
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ✨ Features
- **Cinematic Experience**: Immersive 3D elements and background effects.
- **Dynamic Navigation**: Smooth scrolling with section-aware updates.
- **Interactive Tech Stack**: A premium grid of skills with hover interactions.
- **Functional Contact Form**: Real-time validation and email delivery.
- **Responsive Design**: Optimized for all screen sizes.

---
Developed by **Ansh raj Singh Thakur**
