# HN Scraper - Frontend (React)

The modern React frontend for the Hacker News Scraper, built with Vite and designed with a premium glassmorphism aesthetic.

## 🚀 Frontend Features
- **Premium UI**: Modern dark-mode interface with glassmorphism design and smooth animations.
- **Auth Context**: Global state management for user authentication using React Context API.
- **Dynamic Story Feed**: Real-time filtering for bookmarked stories and paginated browsing.
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices.
- **Micro-animations**: Enhanced UX using `framer-motion` and `lucide-react` icons.

---

### 🎨 Design Decisions

- **Vanilla CSS over Tailwind**: I chose to use custom Vanilla CSS for the frontend to maintain a clean and highly readable JSX structure. This allowed for more granular control over the glassmorphism aesthetic and ensured the codebase remains lightweight without additional configuration overhead.
- **Glassmorphism Theme**: I implemented a modern, dark-themed UI to provide a premium look and feel that enhances the reading experience.

---

## 🛠️ Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS (Custom Glassmorphism)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API Client**: Axios (with Auth interceptors)
- **Routing**: React Router 7

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashmit65/mern-hn-frontend.git
   cd mern-hn-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

4. **Start the application**:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure
```text
src/
├── components/ # Reusable UI elements (Navbar, StoryCard)
├── contexts/   # Auth state management
├── pages/      # View components (Home, Bookmarks, Login, Signup)
├── services/   # API communication (Axios instance)
└── App.jsx     # Routing & Provider setup
```
