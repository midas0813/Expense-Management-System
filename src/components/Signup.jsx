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
            ✓ 登録申請が送信されました！管理者の承認をお待ちください。
          </div>
          <button className="btn btn-primary btn-full" onClick={onSwitchToLogin}>
            ログインに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>💰 経費管理システム</h1>
        <h2>新規登録</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>氏名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="田中 太郎"
              required
            />
          </div>
          
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
              placeholder="パスワードを作成"
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label>希望する役職</label>
            <select value={requestedRole} onChange={(e) => setRequestedRole(e.target.value)}>
              <option value="employee">社員</option>
              <option value="supervisor">管理者</option>
            </select>
            <small style={{ color: '#666', fontSize: '0.85rem' }}>
              管理者が役職を確認して割り当てます
            </small>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            申請を送信
          </button>
        </form>
        
        <div className="auth-footer">
          既にアカウントをお持ちの方は 
          <button className="link-btn" onClick={onSwitchToLogin}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
