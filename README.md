# AURELION — Luxury Watch Brand Website

A cinematic, scroll-driven MERN stack website for a fictional luxury 
watch brand. Features a full-screen hero video whose playback is 
directly controlled by scroll position — the watch visually assembles 
itself as the visitor scrolls.

## Live Demo
- Frontend: https://aurelion-frontend-4dfp.onrender.com
- Backend API: https://aurelion-backend-4iv8.onrender.com

## Features
- Scroll-controlled cinematic hero video (custom React hook + requestAnimationFrame)
- 5 scroll-timed text overlays (Framer Motion)
- Dynamic product catalog (MongoDB → Express API → React)
- Product detail pages with full specs
- "Reserve a Consultation" enquiry system with email notifications (Resend)
- Fully responsive (desktop / tablet / mobile with hamburger menu)

## Tech Stack
**Frontend:** React (Vite), React Router, Framer Motion, CSS  
**Backend:** Node.js, Express, MongoDB (Mongoose)  
**Email:** Resend API  
**Deployment:** Render (frontend + backend)

## Project Structure
\`\`\`
client/   — React frontend
server/   — Express + MongoDB backend
\`\`\`

## Running Locally

### Backend
\`\`\`
cd server
npm install
npm run seed     # populates MongoDB with sample watches
node server.js
\`\`\`

### Frontend
\`\`\`
cd client
npm install
npm run dev
\`\`\`

### Environment Variables
Create a \`.env\` file in \`server/\` with:
\`\`\`
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
RESEND_API_KEY=your_resend_key
EMAIL_USER=your_email
\`\`\`

## Screenshots
(add 2-3 screenshots here — hero section, collection page, product detail)

## What I Learned
- Building smooth scroll-linked video playback using requestAnimationFrame and linear interpolation
- Debugging deployment-specific issues (SMTP ports blocked on Render, fixed by switching to an HTTPS-based email API)
- Structuring a full MERN app with clean separation between models, controllers and routes
