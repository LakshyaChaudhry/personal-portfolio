# Personal Portfolio V2

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with light/dark mode support.

## ✨ Features

- 🌓 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- 📱 **Fully Responsive**: Optimized for all screen sizes
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎨 **Modern Design**: Clean, minimalist interface inspired by contemporary web design
- 🎭 **Smooth Animations**: Powered by Framer Motion
- 📧 **Contact Form**: Integrated contact functionality
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📂 Project Structure

```
personal-portfolio/
├── src/
│   ├── components/       # React components
│   │   ├── HomePage.tsx
│   │   ├── Navigation.tsx
│   │   ├── CodingProjects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Experience.tsx
│   │   ├── timeline.tsx
│   │   └── Blog.tsx
│   ├── contexts/         # React contexts
│   │   └── ThemeContext.tsx
│   ├── data/            # Static data
│   │   └── projects.ts
│   ├── lib/             # Utilities
│   │   └── utils.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── api/                 # API routes
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LakshyaChaudhry/personal-portfolio.git
cd personal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Updating Projects

Edit `src/data/projects.ts` to add or modify projects:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: "Your Project",
    shortDescription: "Brief description",
    fullDescription: "Detailed description",
    technologies: ["React", "TypeScript"],
    githubLink: "https://github.com/...",
    liveLink: "https://...",
  },
];
```

### Updating Experience

Edit `src/components/timeline.tsx` to modify the experience timeline.

### Changing Theme Colors

Modify the color scheme in `src/index.css` under the `:root` and `.dark` selectors.

## 📝 Sections

1. **Home**: Introduction with social links
2. **Projects**: Showcase of coding projects with detailed modals
3. **Experience**: Professional timeline with company logos
4. **About**: Personal information and contact form

## 🌐 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Lakshya Chaudhry**

- GitHub: [@LakshyaChaudhry](https://github.com/LakshyaChaudhry)
- LinkedIn: [Lakshya Chaudhry](https://www.linkedin.com/in/lakshya-chaudhry-a0155a311)
- Email: lakshchaudhry@gmail.com

## 🙏 Acknowledgments

- Design inspiration from [krishgarg.ca](https://www.krishgarg.ca)
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion)

---

⭐ Star this repo if you find it helpful!
