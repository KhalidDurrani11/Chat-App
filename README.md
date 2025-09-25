# AetherChat - Real-time AI Chat Application

A modern, beautiful, and fully functional AI-powered chat application built with React, TypeScript, Clerk authentication, Google Gemini AI, and Supabase.

<div align="center">
<img width="1200" height="475" alt="AetherChat Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## ✨ Features

- 🔐 **Secure Authentication** - Powered by Clerk
- 🤖 **AI-Powered Conversations** - Google Gemini 1.5 Flash integration
- 💬 **Real-time Chat** - Instant messaging with beautiful UI
- 🎨 **Modern Design** - Beautiful gradients, animations, and responsive layout
- 🌙 **Dark/Light Mode** - Automatic theme switching
- 📱 **Responsive** - Works perfectly on all screen sizes
- ⚡ **Performance Optimized** - Memoized components and optimized re-renders
- 🛡️ **Error Handling** - Comprehensive error boundaries and fallbacks
- 🔄 **Real-time Updates** - Supabase integration for data persistence
- ✨ **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- 🎨 **Professional UI** - Glassmorphism effects and modern design
- 🔄 **Auto-scroll** - Messages automatically scroll to bottom
- ⚡ **Loading States** - Beautiful loading indicators and disabled states

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **AI**: Google Gemini 1.5 Flash
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Clerk account ([clerk.com](https://clerk.com))
- A Google AI API key ([ai.google.dev](https://ai.google.dev))
- A Supabase account ([supabase.com](https://supabase.com)) (optional)

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd aetherchat---real-time-chat-ui
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk Authentication (Required)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# Google Gemini AI (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase (Optional)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Clerk Setup

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Copy your publishable key
4. Add it to your `.env` file as `VITE_CLERK_PUBLISHABLE_KEY`

### 4. Google Gemini Setup

1. Go to [ai.google.dev](https://ai.google.dev)
2. Create an API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

### 5. Supabase Setup (Optional)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL schema from `supabase-schema-simple.sql`
4. Add your URL and anon key to `.env`

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 🎯 Usage

1. **Sign In**: Click "Sign In to Continue" to authenticate with Clerk
2. **Start Chatting**: Select a conversation from the sidebar
3. **AI Responses**: Type messages and get intelligent AI responses from Gemini
4. **Switch Themes**: Toggle between light and dark modes
5. **Responsive**: Works seamlessly on desktop, tablet, and mobile

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Main chat interface components
│   └── ErrorBoundary.tsx
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── services/           # API services (Gemini, Supabase)
├── types.ts           # TypeScript type definitions
├── constants.ts        # App constants and mock data
└── App.tsx            # Main application component
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | No |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | No |

### Customization

- **Themes**: Modify `contexts/ThemeContext.tsx`
- **Styling**: Update Tailwind classes in components
- **AI Behavior**: Adjust prompts in `services/gemini.ts`
- **Database**: Modify Supabase schema as needed

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy!

## 🐛 Troubleshooting

### Common Issues

1. **"Configuration Required" Error**
   - Ensure `.env` file exists with correct keys
   - Restart development server after adding environment variables

2. **Clerk Not Working**
   - Verify `VITE_CLERK_PUBLISHABLE_KEY` is correct
   - Check Clerk dashboard for any configuration issues

3. **AI Not Responding**
   - Verify `GEMINI_API_KEY` is correct
   - Check browser console for API errors
   - Ensure API key has proper permissions

4. **Layout Issues**
   - Clear browser cache
   - Check for CSS conflicts
   - Verify Tailwind CSS is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Google Gemini](https://ai.google.dev) for AI capabilities
- [Supabase](https://supabase.com) for database services
- [Framer Motion](https://framer.com/motion) for animations
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**Built with ❤️ by the AetherChat team**