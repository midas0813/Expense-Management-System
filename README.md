# 💰 Expense Management App

A modern React + Vite web application for managing expenses and improvement suggestions with role-based authentication and approval workflows. Features a beautiful glassmorphism UI design.

## ✨ Key Features

### 🔐 Authentication System
- **Login/Signup** with password authentication
- **Role-based access control** (Employee, Supervisor, President)
- **Signup approval workflow** - President reviews and assigns roles
- **Session persistence** using localStorage
- Pre-configured president account in database

### 👥 Role-Based Dashboards

#### For Employees
- ✅ Submit expense requests with amount, reason, and receipt photos
- 📸 Upload receipt images (up to 5MB)
- 💡 Submit improvement suggestions
- 👍 Like and comment on suggestions
- 💬 Respond to supervisor requests for field input
- 📊 View personal expense history

#### For Supervisors
- ✅ Approve/reject expenses up to ¥30,000
- 📊 Forward high-value expenses to president
- 🗣️ Gather field opinions on specific topics
- 📈 View all expenses and pending approvals
- 💡 Review improvement suggestions

#### For President
- ✅ Final approval for high-value expenses (>¥30,000)
- 📊 Overview dashboard with statistics
- 👤 Manage signup requests (approve/reject/assign roles)
- 📈 View all expenses and suggestions
- 💰 Track total approved expenses

### 🎨 Design Features
- **Glassmorphism UI** with backdrop blur effects
- **Elegant serif typography** for headings
- **Smooth animations** and hover effects
- **Professional color scheme** (black, white, subtle gradients)
- **Responsive layout** with clean, minimal design
- **Image preview** and full-size modal view

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🔑 Demo Accounts

Use these credentials to test different roles:

- **President**: yamada@company.com / admin123
- **Supervisor**: suzuki@company.com / pass123
- **Employee**: tanaka@company.com / pass123

## 💡 How to Use

### 1. Login
- Use demo credentials or create a new account
- New signups require president approval

### 2. Submit Expenses (Employee)
- Navigate to "My Expenses" tab
- Fill in amount and reason
- Optionally upload receipt photo
- Submit for approval

### 3. Approve Expenses (Supervisor/President)
- View pending approvals in dashboard
- Review expense details and receipts
- Approve or reject with one click

### 4. Submit Suggestions (All Users)
- Go to "Suggestions" tab
- Share improvement ideas
- Like and comment on others' suggestions

### 5. Manage Users (President)
- View signup requests in "Signup Requests" tab
- Assign appropriate roles
- Approve or reject new users

## 📊 Approval Workflow

```
Employee Submits Expense
        ↓
Supervisor Reviews
        ↓
    ≤¥30,000 → Approved ✓
    >¥30,000 → Forward to President
        ↓
President Reviews
        ↓
    Approved ✓
```

## 💾 Data Storage

Currently uses temporary in-memory data (resets on page refresh). All data is defined in `src/data/tempData.js`.

**Stored Data:**
- User accounts with passwords
- Expense requests with photos (base64)
- Improvement suggestions
- Signup requests
- Comments and likes

## 🎯 Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx       # Expense submission with photo upload
│   ├── ExpenseList.jsx        # Expense display with approval actions
│   ├── SuggestionForm.jsx     # Suggestion submission
│   ├── SuggestionList.jsx     # Suggestions with likes/comments
│   ├── SupervisorRequest.jsx  # Field input requests
│   ├── Login.jsx              # Login page
│   ├── Signup.jsx             # Signup page
│   └── SignupApproval.jsx     # Admin approval interface
├── pages/
│   ├── EmployeeDashboard.jsx  # Employee view
│   ├── SupervisorDashboard.jsx # Supervisor view
│   └── PresidentDashboard.jsx  # President view with stats
├── data/
│   └── tempData.js            # Mock database
├── App.jsx                    # Main app with auth logic
├── App.css                    # Glassmorphism styles
├── main.jsx                   # React entry point
└── index.css                  # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: #2d2d2d (Dark charcoal)
- **Background**: Linear gradient (#f5f7fa to #e8ecf1)
- **Glass**: rgba(255, 255, 255, 0.8) with backdrop-filter
- **Accent**: Subtle shadows and borders

### Typography
- **Headings**: Georgia, serif
- **Body**: System fonts (-apple-system, Segoe UI, etc.)
- **Letter spacing**: -0.5px to -1px for large text

### Effects
- Backdrop blur (10-20px)
- Box shadows with low opacity
- Smooth transitions (0.2-0.3s)
- Hover animations (translateY, scale)

## 📅 Development Info

- **Development Time**: ~8-10 hours for full implementation
- **Estimated Cost**: ¥80,000 - ¥120,000 (freelance rate)
- **Timeline**: 2-3 days for complete implementation with testing

## 🔄 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] Email notifications for approvals
- [ ] Monthly expense reports and analytics
- [ ] Export to CSV/Excel
- [ ] Mobile app version
- [ ] Real-time updates with WebSocket
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Expense categories and tags
- [ ] Budget limits and alerts
- [ ] Audit logs and history

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Glassmorphism effects with backdrop-filter
- **LocalStorage** - Session persistence
- **Base64** - Image encoding (no backend needed)

## 📝 License

This project is for demonstration purposes.
