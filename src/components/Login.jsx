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
        <h1>💰 経費管理システム</h1>
        <h2>ログイン</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            ログイン
          </button>
        </form>
        
        <div className="auth-footer">
          アカウントをお持ちでない方は 
          <button className="link-btn" onClick={onSwitchToSignup}>
            新規登録
          </button>
        </div>

        <div className="demo-credentials">
          <strong>デモアカウント:</strong>
          <div>社長: yamada@company.com / admin123</div>
          <div>管理者: suzuki@company.com / pass123</div>
          <div>社員: tanaka@company.com / pass123</div>
        </div>
      </div>
    </div>
  )
}

export default Login
