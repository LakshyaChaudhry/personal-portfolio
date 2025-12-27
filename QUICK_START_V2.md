# Quick Start Guide - Portfolio V2

## 🎉 Welcome to Your New Portfolio!

Your portfolio has been completely redesigned with a modern, clean aesthetic and dark mode support.

## 🚀 Getting Started

### 1. Start the Development Server

The dev server is already running! Open your browser to:
```
http://localhost:5173
```

If you need to restart it:
```bash
npm run dev
```

### 2. Test the Features

#### Theme Toggle
- Look for the sun/moon icon in the top navigation
- Click it to switch between light and dark modes
- Your preference will be saved automatically

#### Navigation
- Click on "Home", "Projects", "Experience", or "About" to navigate
- Smooth scroll to each section

#### Projects
- Click on any project card to see full details
- Click outside the modal or the X button to close

### 3. Customize Your Content

#### Update Your Email
In `src/components/HomePage.tsx`, line 68:
```typescript
href="mailto:lakshya@example.com"  // Change this to your actual email
```

#### Add Your Resume
Place your resume PDF in the public folder:
```
/public/resume.pdf
```

#### Update Social Links
Check `src/components/HomePage.tsx` (lines 51-76) and `src/components/Blog.tsx` (lines 10-14)

#### Modify Projects
Edit `src/data/projects.ts` to add, remove, or update projects

#### Update Experience
Edit `src/components/timeline.tsx` (lines 4-65) to update your work history

#### Change About Section
Edit `src/components/Blog.tsx` to update your bio and skills

## 🎨 What's New?

### Visual Changes
- ✅ Clean, modern design
- ✅ Dark mode with smooth transitions
- ✅ Better typography and spacing
- ✅ Improved mobile experience
- ✅ Vertical scroll instead of horizontal carousel

### Technical Improvements
- ✅ Faster load times (removed 3D model)
- ✅ Better accessibility
- ✅ Cleaner code structure
- ✅ No linter errors

## 📱 Test on Different Devices

1. **Desktop**: Full experience with all features
2. **Tablet**: Responsive grid layouts
3. **Mobile**: Touch-optimized, single column layouts

## 🐛 Common Issues & Solutions

### Theme Not Saving?
- Check browser localStorage is enabled
- Try clearing cache and reloading

### Dev Server Not Starting?
```bash
# Kill any existing processes on port 5173
lsof -ti:5173 | xargs kill -9

# Restart
npm run dev
```

### Build Errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📦 When You're Ready to Deploy

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Option 2: Manual Build
```bash
npm run build
# Upload the 'dist' folder to your hosting service
```

## 🎯 Before Going Live

- [ ] Test all links (social media, GitHub, email)
- [ ] Add your actual resume PDF
- [ ] Update email addresses
- [ ] Test contact form
- [ ] Check all project links
- [ ] Test on mobile devices
- [ ] Test both light and dark modes
- [ ] Update meta tags in `index.html` for SEO
- [ ] Add Google Analytics or other tracking (optional)

## 🔄 Git Workflow

Your changes are on the `v2` branch. To merge to main:

```bash
# Stage and commit your changes
git add .
git commit -m "V2: Complete portfolio redesign"

# Switch to main and merge
git checkout main
git merge v2

# Push to remote
git push origin main
```

## 💡 Tips

1. **Colors**: Modify theme colors in `src/index.css`
2. **Fonts**: Change fonts in Tailwind classes or add custom fonts
3. **Animations**: Adjust Framer Motion settings in component files
4. **Content**: All text content is in the component files - easy to find and edit

## 📞 Need Help?

- Check `V2_CHANGES.md` for detailed changes
- Check `README.md` for full documentation
- Review component files for inline comments

## 🎊 You're All Set!

Your portfolio is ready to showcase your work. Test it thoroughly, customize the content, and deploy when ready!

---

**Current Branch**: v2
**Dev Server**: http://localhost:5173
**Status**: ✅ Ready for testing

