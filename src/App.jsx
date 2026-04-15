import { useState, useEffect } from 'react'
import { users as initialUsers, expenses as initialExpenses, suggestions as initialSuggestions, supervisorRequests as initialRequests, signupRequests as initialSignupRequests } from './data/tempData'
import Login from './components/Login'
import Signup from './components/Signup'
import EmployeeDashboard from './pages/EmployeeDashboard'
import SupervisorDashboard from './pages/SupervisorDashboard'
import PresidentDashboard from './pages/PresidentDashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState(initialUsers)
  const [expenses, setExpenses] = useState(initialExpenses)
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const [requests, setRequests] = useState(initialRequests)
  const [signupRequests, setSignupRequests] = useState(initialSignupRequests)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      const existingUser = users.find(u => u.id === user.id)
      if (existingUser) {
        setCurrentUser(existingUser)
        setIsAuthenticated(true)
      }
    }
  }, [users])

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }
    if (user.status !== 'active') {
      return { success: false, message: 'Account is not active. Please wait for approval.' }
    }
    setCurrentUser(user)
    setIsAuthenticated(true)
    localStorage.setItem('currentUser', JSON.stringify(user))
    return { success: true }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('currentUser')
  }

  const handleSignup = (signupData) => {
    const newRequest = {
      ...signupData,
      id: signupRequests.length + 1,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    }
    setSignupRequests([...signupRequests, newRequest])
  }

  const handleSignupApprove = (requestId, assignedRole) => {
    const request = signupRequests.find(r => r.id === requestId)
    if (request) {
      const newUser = {
        id: users.length + 1,
        name: request.name,
        email: request.email,
        password: request.password,
        role: assignedRole,
        status: 'active'
      }
      setUsers([...users, newUser])
      setSignupRequests(signupRequests.map(r => 
        r.id === requestId ? { ...r, status: 'approved' } : r
      ))
    }
  }

  const handleSignupReject = (requestId) => {
    setSignupRequests(signupRequests.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' } : r
    ))
  }

  const handleExpenseSubmit = (newExpense) => {
    const expense = {
      ...newExpense,
      id: expenses.length + 1,
      userId: currentUser.id,
      status: 'pending_supervisor',
      date: new Date().toISOString().split('T')[0],
      approvedBy: [],
    }
    setExpenses([expense, ...expenses])
  }

  const handleApproval = (expenseId, action) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === expenseId) {
        if (action === 'approve') {
          if (currentUser.role === 'supervisor') {
            return {
              ...exp,
              status: exp.amount > 30000 ? 'pending_president' : 'approved',
              approvedBy: [...exp.approvedBy, currentUser.id]
            }
          } else if (currentUser.role === 'president') {
            return {
              ...exp,
              status: 'approved',
              approvedBy: [...exp.approvedBy, currentUser.id]
            }
          }
        } else {
          return { ...exp, status: 'rejected' }
        }
      }
      return exp
    }))
  }

  const handleSuggestionSubmit = (newSuggestion) => {
    const suggestion = {
      ...newSuggestion,
      id: suggestions.length + 1,
      userId: currentUser.id,
      likes: 0,
      likedBy: [],
      comments: [],
      status: 'open',
      date: new Date().toISOString().split('T')[0],
    }
    setSuggestions([suggestion, ...suggestions])
  }

  const handleLike = (suggestionId) => {
    setSuggestions(suggestions.map(sug => {
      if (sug.id === suggestionId) {
        const alreadyLiked = sug.likedBy.includes(currentUser.id)
        return {
          ...sug,
          likes: alreadyLiked ? sug.likes - 1 : sug.likes + 1,
          likedBy: alreadyLiked 
            ? sug.likedBy.filter(id => id !== currentUser.id)
            : [...sug.likedBy, currentUser.id]
        }
      }
      return sug
    }))
  }

  const handleComment = (suggestionId, text) => {
    setSuggestions(suggestions.map(sug => {
      if (sug.id === suggestionId) {
        return {
          ...sug,
          comments: [...sug.comments, {
            id: sug.comments.length + 1,
            userId: currentUser.id,
            text,
            date: new Date().toISOString().split('T')[0]
          }]
        }
      }
      return sug
    }))
  }

  const handleRequestResponse = (requestId, text) => {
    setRequests(requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          responses: [...req.responses, {
            id: req.responses.length + 1,
            userId: currentUser.id,
            text,
            date: new Date().toISOString().split('T')[0]
          }]
        }
      }
      return req
    }))
  }

  if (!isAuthenticated) {
    if (showSignup) {
      return (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setShowSignup(false)}
        />
      )
    }
    return (
      <Login 
        onLogin={handleLogin}
        onSwitchToSignup={() => setShowSignup(true)}
      />
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Management</h1>
        <div className="user-info">
          <span className="user-name">{currentUser.name}</span>
          <span className="user-role">{currentUser.role}</span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {currentUser.role === 'employee' && (
        <EmployeeDashboard 
          currentUser={currentUser}
          expenses={expenses}
          suggestions={suggestions}
          requests={requests}
          users={users}
          onExpenseSubmit={handleExpenseSubmit}
          onSuggestionSubmit={handleSuggestionSubmit}
          onLike={handleLike}
          onComment={handleComment}
          onRequestResponse={handleRequestResponse}
        />
      )}

      {currentUser.role === 'supervisor' && (
        <SupervisorDashboard 
          currentUser={currentUser}
          expenses={expenses}
          suggestions={suggestions}
          users={users}
          onApproval={handleApproval}
          onLike={handleLike}
          onComment={handleComment}
        />
      )}

      {currentUser.role === 'president' && (
        <PresidentDashboard 
          currentUser={currentUser}
          expenses={expenses}
          suggestions={suggestions}
          signupRequests={signupRequests}
          users={users}
          onApproval={handleApproval}
          onLike={handleLike}
          onComment={handleComment}
          onSignupApprove={handleSignupApprove}
          onSignupReject={handleSignupReject}
        />
      )}
    </div>
  )
}

export default App
