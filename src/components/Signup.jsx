import { useState } from 'react'

function Signup({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [requestedRole, setRequestedRole] = useState('employee')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignup({ name, email, password, requestedRole })
    setSuccess(true)
    setTimeout(() => {
      onSwitchToLogin()
    }, 2000)
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="success-message">
            ✓ Signup request submitted! Please wait for admin approval.
          </div>
          <button className="btn btn-primary btn-full" onClick={onSwitchToLogin}>
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Expense Management</h1>
        <h2>Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tanaka Taro"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label>Requested Role</label>
            <select value={requestedRole} onChange={(e) => setRequestedRole(e.target.value)}>
              <option value="employee">Employee</option>
              <option value="supervisor">Supervisor</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.85rem' }}>
              Admin will review and assign your role
            </small>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Submit Request
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account? 
          <button className="link-btn" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
