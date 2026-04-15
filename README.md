# 💰 Expense Management App

A React + Vite web application for managing expenses and improvement suggestions with approval workflows.

## 📋 Features

### For Employees
- ✅ Submit expense requests with amount and reason
- 💡 Submit improvement suggestions
- 👍 Like and comment on suggestions
- 💬 Respond to supervisor requests for field input

### For Supervisors
- ✅ Approve/reject expenses up to ¥30,000
- 📊 Forward high-value expenses to president
- 🗣️ Gather field opinions on specific topics

### For President
- ✅ Final approval for high-value expenses (>¥30,000)
- 📈 View all expenses and suggestions

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

## 💡 How to Use

1. **Switch Users**: Use the dropdown in the header to switch between different roles:
   - Tanaka Taro (Employee)
   - Suzuki Hanako (Supervisor)
   - Yamada Ichiro (President)
   - Sato Yuki (Employee)

2. **Submit Expenses**: As an employee, go to the Expenses tab and fill out the form

3. **Approve Expenses**: As supervisor/president, review pending expenses and approve/reject

4. **Submit Suggestions**: Use the Suggestions tab to share improvement ideas

5. **Engage**: Like and comment on suggestions from colleagues

6. **Respond to Requests**: Employees can respond to supervisor requests for field input

## 📊 Approval Workflow

- **Low-Medium Amount (≤¥30,000)**: Employee → Supervisor → Approved
- **High Amount (>¥30,000)**: Employee → Supervisor → President → Approved

## 💾 Data Storage

Currently uses temporary in-memory data (resets on page refresh). All data is defined in `src/data/tempData.js`.

## 🎯 Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── SuggestionForm.jsx
│   ├── SuggestionList.jsx
│   └── SupervisorRequest.jsx
├── data/
│   └── tempData.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## 📅 Deadline & Cost

- **Development Time**: ~4-6 hours for MVP
- **Estimated Cost**: ¥50,000 - ¥80,000 (freelance rate)
- **Timeline**: 1-2 days for complete implementation

## 🔄 Future Enhancements

- Photo upload for expense receipts
- Monthly expense reports
- Email notifications
- Export to CSV/Excel
- Backend API integration
- User authentication
- Mobile responsive improvements
