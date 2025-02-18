# Fullstack Project Setup

<p align="center">
  <img src="assets/Nokurami Logo.png" alt="Логотип" width="400">
</p>

## Overview
This project consists of a **frontend** built with [Next.js](https://nextjs.org) and a **backend** built with [NestJS](https://nestjs.com). Below are the instructions to set up and run both parts of the application.

---

## Frontend Setup (Next.js)

### Prerequisites
- Node.js (latest LTS version recommended)
- Package manager: `npm`, `yarn`, `pnpm`, or `bun`

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server
To start the frontend in development mode, run:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Editing the Project
Modify `app/page.tsx` to start editing the main page. Changes will be reflected in real-time.

### Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

### Deployment
The recommended deployment platform is [Vercel](https://vercel.com). Refer to [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for more information.

---

## Backend Setup (NestJS)

### Prerequisites
- Node.js (latest LTS version recommended)
- Yarn package manager (recommended)

### Installation
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Server
Start the backend in different modes:
```bash
# Development mode
yarn run start

# Watch mode (hot-reload)
yarn run start:dev

# Production mode
yarn run start:prod
```

By default, the backend runs on `http://localhost:3001` (or as specified in the environment variables).

### Running Tests
```bash
# Unit tests
yarn run test

# E2E tests
yarn run test:e2e

# Test coverage
yarn run test:cov
```

### Deployment
Check the [NestJS Deployment Guide](https://docs.nestjs.com/deployment) for best practices. Alternatively, deploy with Mau:
```bash
yarn global add mau
yarn install -g mau
mau deploy
```

---

## Running Fullstack Application
To run both frontend and backend simultaneously:
1. Open two terminal windows.
2. In the first terminal, start the backend:
   ```bash
   cd backend
   yarn run start:dev
   ```
3. In the second terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to access the frontend.

---

## Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Discord Support](https://discord.gg/G7Qnnhy)
- [Enterprise Support](https://enterprise.nestjs.com)

---

## License
Both the frontend (Next.js) and backend (NestJS) are open-source projects under the **MIT License**.

