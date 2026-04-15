import { useState } from 'react'

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const result = onLogin(email, password)
    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Expense Management</h1>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Login
          </button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? 
          <button className="link-btn" onClick={onSwitchToSignup}>
            Sign up
          </button>
        </div>

        <div className="demo-credentials">
          <strong>Demo Accounts:</strong>
          <div>President: yamada@company.com / admin123</div>
          <div>Supervisor: suzuki@company.com / pass123</div>
          <div>Employee: tanaka@company.com / pass123</div>
        </div>
      </div>
    </div>
  )
}

export default Login
