# MyLibrary Full-Stack Template

A modern, high-performance template for a personal library management system.

## Project Structure

- `frontend/`: Vite + React + TypeScript + Framer Motion + Lucide Icons.
- `backend/`: Node.js + Express + TypeScript + Morgan + Helmet.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. **Clone the repository** (if you haven't already).
2. **Install dependencies**:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at the URL provided by Vite (usually `http://localhost:5173`).

## Features

- **Premium UI**: Modern glassmorphism design with a dark-themed aesthetic.
- **Micro-animations**: Smooth transitions using Framer Motion.
- **Type-Safe**: Full TypeScript support on both frontend and backend.
- **Secure Backend**: Basic security headers implemented with Helmet.
- **Responsive**: Mobile-friendly layout.

## License

MIT
