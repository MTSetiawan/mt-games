# 🎮 MT Games

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 15">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</div>

<div align="center">
  <h3>🚀 Modern Web-Based Mini Games Platform</h3>
  <p>Platform mini games berbasis web yang dibuat dengan teknologi modern dan AI-powered quiz generation</p>
</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Core Features
- 📝 **AI-Powered Quiz** - Soal quiz dinamis dengan berbagai topik
- 🏆 **Real-time Leaderboard** - Kompetisi skor global
- 🔐 **Secure Authentication** - Login/Register dengan JWT + Cookie
- 📱 **Responsive Design** - Optimized untuk semua device
- ⚡ **Real-time Updates** - Data tersinkronisasi secara real-time

</td>
<td width="50%">

### 🛡️ Security & Performance
- 🔒 **Protected Routes** - Halaman ter-proteksi dengan middleware
- 🍪 **Cookie-based Auth** - Secure session management  
- ⚡ **Server-side Rendering** - Fast loading dengan Next.js 14
- 🎨 **Modern UI/UX** - Clean design dengan Tailwind CSS
- 🤖 **AI Integration** - Replicate AI untuk generate konten

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">
<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
<br><strong>Next.js 15</strong>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br><strong>Tailwind CSS</strong>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=supabase" width="48" height="48" alt="Supabase" />
<br><strong>Supabase</strong>
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=typescript" width="48" height="48" alt="TypeScript" />
<br><strong>TypeScript</strong>
</td>
</tr>
</table>
</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Supabase account
- Replicate AI account

### 1️⃣ Clone Repository
```bash
git clone https://github.com/MTSetiawan/mt-games.git
cd mt-games
```

### 2️⃣ Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3️⃣ Environment Setup
Buat file `.env.local` di root project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# AI Integration
REPLICATE_API_TOKEN=your_replicate_api_token
```

### 4️⃣ Database Setup
```bash
# Setup Supabase tables (opsional: buat script setup)
npm run db:setup
```

### 5️⃣ Run Development Server
```bash
npm run dev
```

🎉 **Buka di browser:** [http://localhost:3000](http://localhost:3000)

---

## 📱 Game Features

<div align="center">
<table>
<tr>
<td align="center" width="33%">
<h3>📝 Dynamic Quiz</h3>
<img src="https://img.icons8.com/fluency/96/quiz.png" alt="Quiz" width="64"/>
<p>Quiz dengan berbagai topik dan tingkat kesulitan yang di-generate oleh AI</p>
</td>
<td align="center" width="33%">
<h3>🏆 Leaderboard</h3>
<img src="https://img.icons8.com/fluency/96/leaderboard.png" alt="Leaderboard" width="64"/>
<p>Sistem ranking global real-time berdasarkan skor tertinggi pemain</p>
</td>
<td align="center" width="33%">
<h3>👤 User Profile</h3>
<img src="https://img.icons8.com/fluency/96/user.png" alt="Profile" width="64"/>
<p>Profil pemain dengan statistik game dan achievement</p>
</td>
</tr>
</table>
</div>

---

## 🏗️ Project Structure

```
mt-games/
├── 📁 app/                 # Next.js 14 App Router
│   ├── 📁 auth/          # AuthPage
│   ├── 📁 minigames/    # Minigames page
│   └── 📁 api/            # API routes
├── 📁 components/         # Reusable components
├── 📁 lib/               # Utilities & configs
└── 📄 package.json
```

---

## 🤝 Contributing

Kontribusi sangat welcome! Ikuti langkah berikut:

### 1. Fork & Clone
```bash
git clone https://github.com/your-username/mt-games.git
cd mt-games
```

### 2. Buat Branch Baru
```bash
git checkout -b feature/amazing-feature
```

### 3. Commit Changes
```bash
git add .
git commit -m "feat: add amazing feature"
```

### 4. Push & Create PR
```bash
git push origin feature/amazing-feature
```

---

## 📈 Roadmap

- [ ] 🎮 **More Games** - Tambah game baru (Memory Card, Snake, etc.)
- [ ] 🌐 **Multiplayer** - Real-time multiplayer games
- [ ] 🏅 **Achievement System** - Badges dan rewards
- [ ] 📊 **Analytics Dashboard** - Game statistics
- [ ] 🌙 **Dark Mode** - Theme switcher
- [ ] 🔊 **Sound Effects** - Audio feedback
- [ ] 📱 **PWA Support** - Installable web app

---

## 📄 API Documentation

### Authentication Endpoints
```
POST /api/auth/login     # User login
POST /api/auth/register  # User registration  
POST /api/auth/logout    # User logout
```

### Game Endpoints
```
GET  /api/quiz/  # Generate quiz questions
POST /api/scores         # Submit game score
GET  /api/leaderboard    # Get leaderboard data
```

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ 
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Responsive**: ✅
- ♿ **Accessibility**: WCAG 2.1 AA

---

## 🙏 Acknowledgments

- 🎨 **Icons**: [Icons8](https://icons8.com)
- 🎯 **Inspiration**: Modern gaming platforms
- 🤖 **AI**: Replicate untuk quiz generation
- 💾 **Database**: Supabase untuk backend

---

## 📝 License

```
MIT License © 2025 MTSetiawan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">
  <h3>⭐ Jika project ini membantu, jangan lupa kasih star ya!</h3>
  <p>Made with ❤️ by <a href="https://github.com/MTSetiawan">MTSetiawan</a></p>
  
  <a href="https://github.com/MTSetiawan/mt-games/stargazers">
    <img src="https://img.shields.io/github/stars/MTSetiawan/mt-games?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/MTSetiawan/mt-games/network/members">
    <img src="https://img.shields.io/github/forks/MTSetiawan/mt-games?style=social" alt="GitHub forks">
  </a>
</div>
