# Social Feed Application

A modern, feature-rich social feed application inspired by X.com (formerly Twitter). Built with React, TypeScript, and Tailwind CSS, featuring real-time interactions, and a clean component-based architecture.

## ✨ Features

### Core Functionality
- **Post Composer** - Create new posts with a Twitter-like interface
- **Feed Display** - Chronological feed showing posts from users
- **Like System** - Toggle likes on posts with real-time count updates
- **Comment System** - Add and view comments on posts
- **Responsive Design** - Mobile-friendly layout that works on all devices

### Technical Features
- Type-safe with TypeScript
- Modular component architecture
- Mock API for development (no backend required)
- Smooth transitions and animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```
git clone <your-repo-url>
cd social-feed
```
2. **Install dependencies**

```
npm install
# or
yarn install
# or
pnpm install

```
3. **Run the development server**

```
npm run dev
# or
yarn dev
# or
pnpm dev
```
    Open your browser
    Navigate to http://localhost:3000 (or the port shown in your terminal)

**📁 Project Structure**

```
src/
├── app/
    ├── globals.css           # Global styles and Tailwind imports
│   ├── Page.tsx              # Main feed page
│   └── layout.tsx            # Root layout
├── components/
│   ├── Avatar.tsx            # User avatar component
│   ├── CommentSection.tsx    # Comments display and input
│   ├── Post.tsx              # Individual post component
│   └── PostComposer.tsx      # Post creation interface
├── controllers/
│   ├── baseController.ts     # Base controller with common methods
│   ├── postController.ts     # Post-related operations
│   ├── commentController.ts  # Comment-related operations
│   └── index.ts              # Controller exports
├── models/
│   ├── api.ts                # API response types
│   ├── feed.ts               # Post and comment types
│   └── index.ts              # Type exports
├── services/
│   ├── api/
│   │   └── client.ts         # HTTP client setup
│   └── mock/
│       ├── feed.ts           # Mock data and API simulation
│       └── index.ts          # Mock exports
└── utils/
    └── utility.ts            # Helper functions
```
**🛠️ Built With**

    React 18 - UI framework

    TypeScript - Type safety

    Tailwind CSS - Styling

    Axios - HTTP requests (ready for backend integration)

    Next.js - React framework with SSR support

**💻 Usage Guide Creating a Post**

    Type your content in the composer textarea at the top of the feed

    Click "Post" or press Enter (Shift+Enter for new line)

    Your post will appear instantly at the top of the feed

**❤️ Liking a Post**

    Click the ❤️ button below any post to like/unlike

    Like count updates in real-time

**💬 Commenting on a Post**

    Click "Show comments" below any post

    Type your comment in the input field

    Press Enter or click outside the input to submit

    Comments appear immediately


**📱 Responsive Design**

The application is fully responsive:

    Desktop (>1024px): Full-width feed with max-width container

    Tablet (768px-1024px): Adjusted spacing and font sizes

    Mobile (<768px): Compact layout with touch-friendly buttons

**🔄 Backend Integration**

Currently using mock data. To integrate a real backend:

    Update API client in src/services/api/client.ts

    Replace mock service calls in controllers

    Add authentication logic in controllers
