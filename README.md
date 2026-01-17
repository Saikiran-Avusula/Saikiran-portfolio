# 🚀 Sai Kiran Avusula - Full Stack Developer Portfolio

A modern, high-performance portfolio website built with **React 19**, **TypeScript**, and **Tailwind CSS**. Features a stunning UI with smooth animations, an admin panel for content management, and cloud-based resume storage with **Vercel Blob**.

---

## ✨ Key Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Effects**: Sleek, modern design with frosted glass aesthetics
- **Smooth Animations**: Powered by **Framer Motion** for fluid page transitions and entrance effects
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Dark Mode**: Professional dark theme throughout

### 📊 **Interactive Components**
- **Skills Visualization**: Radar charts displaying proficiency levels using **Recharts**
- **Project Showcase**: Filterable project gallery (Backend, Frontend, Full Stack)
- **Experience Timeline**: Visual representation of professional journey
- **Contact Form**: Integrated contact section for visitor engagement

### 🔐 **Admin Panel**
- **Secure Authentication**: Login system with localStorage-based session management
- **Resume Management**: Upload, preview, and replace PDF resumes
- **Drag & Drop**: Intuitive resume upload interface
- **PDF Preview**: Built-in resume viewer within admin panel
- **Cloud Storage**: Resumes stored on Vercel Blob for universal access

### 📄 **Resume Features**
- **Universal Access**: Uploaded resumes available to all visitors globally
- **Cloud-Based**: Stored on Vercel Blob Storage, accessible from any device
- **Dynamic Display**: "View Resume" button on homepage
- **Automatic Updates**: Newly uploaded resumes instantly replace previous versions

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React features and improvements
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **Lucide React** - Beautiful, consistent icons
- **Recharts** - Composable charting library

### **Storage & Data**
- **Vercel Blob Storage** - Cloud-based resume storage for universal access
- **localStorage** - Authentication state management

### **Development Tools**
- **PostCSS & Autoprefixer** - CSS processing
- **TypeScript 5.8** - Latest TypeScript features

---

## 📦 Installation & Setup

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### **1. Clone the Repository**

```bash
git clone https://github.com/Saikiran-Avusula/Saikiran-portfolio.git
cd Saikiran-portfolio
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Configuration**

For resume upload functionality, you need to configure Vercel Blob Storage:

1. **Create a Vercel Blob Store**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to your project → **Storage** → **Create Database**
   - Select **Blob** storage type
   - Copy the `BLOB_READ_WRITE_TOKEN`

2. **Set Environment Variables**:

For local development, create `.env.local`:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

For production on Vercel:
- Go to your project settings → **Environment Variables**
- Add `BLOB_READ_WRITE_TOKEN` with your token value

> [!NOTE]
> Without this configuration, the resume upload feature won't work. The app will still function, but the "View Resume" button will show an upload prompt.

### **4. Run Development Server**

```bash
npm run dev
```

The application will start at **`http://localhost:5173`**

### **5. Build for Production**

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📂 Project Structure

```
├── components/
│   ├── About.tsx          # About section with bio
│   ├── AdminPanel.tsx     # Admin panel for resume management
│   ├── Blog.tsx           # Blog posts display
│   ├── Contact.tsx        # Contact form
│   ├── Education.tsx      # Education credentials
│   ├── Footer.tsx         # Footer component
│   ├── Hero.tsx           # Landing hero section
│   ├── Login.tsx          # Admin login page
│   ├── Navbar.tsx         # Navigation bar
│   ├── Projects.tsx       # Project showcase
│   ├── Skills.tsx         # Skills radar chart
│   └── Timeline.tsx       # Experience timeline
├── services/
│   ├── authService.ts     # Authentication logic
│   ├── imageService.ts    # Image handling
│   └── resumeService.ts   # Resume upload/download
├── constants.ts           # Centralized app data
├── types.ts               # TypeScript interfaces
├── App.tsx                # Main app component
└── index.tsx              # App entry point
```

---

## 🎯 Customization Guide

### **Update Personal Information**

All personal data is centralized in **`src/constants.ts`**:

- **Personal Details**: Name, role, social links
- **Skills**: Add/remove skills with proficiency levels
- **Projects**: Update project cards with images, descriptions, and links
- **Experience**: Modify work history timeline
- **Education**: Update academic credentials
- **Blog Posts**: Add blog entries

Example:

```typescript
export const PERSONAL_DETAILS = {
  name: "Your Name",
  role: "Your Role",
  about: "Your bio...",
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    email: "mailto:your@email.com"
  }
};
```

### **Admin Panel Access**

1. Navigate to `/admin` in your browser
2. Use the login credentials stored in `authService.ts`
3. Upload a PDF resume via drag-and-drop
4. View uploaded resume in the preview pane

**Default Login** (Update in `authService.ts`):
- Username: `admin`
- Password: `password123`

> ⚠️ **Security Note**: This is a client-side authentication system suitable for personal portfolios. For production use with sensitive data, implement server-side authentication.

---

## 🚀 Deployment

### **Deploy to Vercel** (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite configuration
5. Click **Deploy**

### **Deploy to Netlify**

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

---

## 🌟 Features Deep Dive

### **Resume Management System**

The portfolio includes a complete cloud-based resume management solution:

- **Upload**: Drag-and-drop PDF files via admin panel
- **Cloud Storage**: Files stored on Vercel Blob Storage for universal access
- **Preview**: Built-in PDF viewer in admin panel
- **Universal Download**: Any visitor can view/download your resume from the homepage
- **Auto-Replace**: New uploads automatically replace old resumes globally
- **Serverless**: Uses Vercel Edge Functions for fast, scalable uploads

**Implementation Files**:
- `api/upload-resume.ts` - Serverless upload endpoint
- `api/get-resume.ts` - Serverless fetch endpoint
- `api/delete-resume.ts` - Serverless delete endpoint
- `services/resumeService.ts` - Client-side API wrapper
- `components/AdminPanel.tsx` - Admin interface
- `components/Hero.tsx` - "View Resume" button

### **Authentication System**

Simple client-side authentication for admin access:

- Login form validation
- Session persistence with localStorage
- Protected admin routes
- Logout functionality

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Saikiran-Avusula/Saikiran-portfolio/issues).

---

## 📞 Contact

**Sai Kiran Avusula**
- 💼 LinkedIn: [sai-kiran-avusula](https://www.linkedin.com/in/sai-kiran-avusula-096655290/)
- 🐙 GitHub: [@Saikiran-Avusula](https://github.com/Saikiran-Avusula)
- 📧 Email: Available in portfolio contact section

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For beautiful animations
- **Lucide** - For the clean icon set

---

**Made with ❤️ by Sai Kiran Avusula**
