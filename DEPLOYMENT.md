# Deployment Guide - CarbonCrew Studios Website

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Your site is live!

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   "homepage": "https://yourusername.github.io/carbon-crew",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 4: Traditional Web Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `build` folder contents to your web host**
   - Upload all files from the `build` folder
   - Point your domain to the upload directory
   - Ensure `.htaccess` or server config supports SPA routing

## 🔧 Environment Variables (if needed)

Create a `.env` file in the root:
```
REACT_APP_API_URL=your_api_url
REACT_APP_CONTACT_EMAIL=hello@carboncrew.studio
```

## ✅ Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test the production build locally
- [ ] Update contact information in Footer
- [ ] Update social media links
- [ ] Set up form backend (if needed)
- [ ] Add Google Analytics (optional)
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test on multiple devices
- [ ] Test all links and forms

## 🌐 Custom Domain Setup

### Netlify
1. Go to Domain Settings
2. Add your custom domain
3. Update DNS records as instructed

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS

## 📧 Contact Form Backend

The current form logs to console. To make it functional:

### Option A: Netlify Forms
```tsx
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* your form fields */}
</form>
```

### Option B: Formspree
```tsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  {/* your form fields */}
</form>
```

### Option C: EmailJS
```bash
npm install @emailjs/browser
```

## 🔒 Security Headers (Optional)

Add to `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Performance Optimization

Already optimized:
- ✅ Code splitting
- ✅ Lazy loading for 3D
- ✅ Optimized images
- ✅ Minimal dependencies
- ✅ 3D disabled on mobile

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3D Not Rendering
- Check browser WebGL support
- Verify @react-three/fiber is installed
- Check console for errors

### Styles Not Loading
- Ensure Tailwind is configured correctly
- Check `postcss.config.js`
- Verify `index.css` has Tailwind directives

## 📱 Testing Checklist

- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)
- [ ] Tablet view
- [ ] Contact form submission
- [ ] All navigation links
- [ ] 3D rendering on desktop
- [ ] 3D hidden on mobile

## 🎉 Post-Deployment

1. Test the live site thoroughly
2. Set up monitoring (optional)
3. Submit sitemap to Google
4. Share with the team!

---

**Ready to deploy!** 🚀
