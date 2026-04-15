import { useState } from 'react'
import ExpenseList from '../components/ExpenseList'
import SuggestionList from '../components/SuggestionList'
import SignupApproval from '../components/SignupApproval'

function PresidentDashboard({ 
  currentUser, 
  expenses, 
  suggestions, 
  signupRequests,
  users,
  onApproval,
  onLike,
  onComment,
  onSignupApprove,
  onSignupReject
}) {
  const [activeTab, setActiveTab] = useState('overview')

  const pendingExpenses = expenses.filter(e => e.status === 'pending_president')
  const approvedExpenses = expenses.filter(e => e.status === 'approved')
  const totalApproved = approvedExpenses.reduce((sum, e) => sum + e.amount, 0)
  const pendingSignups = signupRequests.filter(r => r.status === 'pending').length

  return (
    <div>
      <nav className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
          概要
        </button>
        <button className={activeTab === 'approvals' ? 'active' : ''} onClick={() => setActiveTab('approvals')}>
          承認待ち ({pendingExpenses.length})
        </button>
        <button className={activeTab === 'expenses' ? 'active' : ''} onClick={() => setActiveTab('expenses')}>
          全ての経費
        </button>
        <button className={activeTab === 'suggestions' ? 'active' : ''} onClick={() => setActiveTab('suggestions')}>
          改善提案
        </button>
        <button className={activeTab === 'signups' ? 'active' : ''} onClick={() => setActiveTab('signups')}>
          登録申請 {pendingSignups > 0 && `(${pendingSignups})`}
        </button>
      </nav>

      <main className="main">
        {activeTab === 'overview' && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">¥{totalApproved.toLocaleString()}</div>
                <div className="stat-label">承認済み合計</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{approvedExpenses.length}</div>
                <div className="stat-label">承認済み経費</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{pendingExpenses.length}</div>
                <div className="stat-label">承認待ち</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{suggestions.length}</div>
                <div className="stat-label">改善提案</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>最近のアクティビティ</h2>
              <ExpenseList 
                expenses={expenses.slice(0, 5)}
                currentUser={currentUser}
                users={users}
                onApproval={onApproval}
              />
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <ExpenseList 
            expenses={pendingExpenses}
            currentUser={currentUser}
            users={users}
            onApproval={onApproval}
          />
        )}

        {activeTab === 'expenses' && (
          <ExpenseList 
            expenses={expenses}
            currentUser={currentUser}
            users={users}
            onApproval={onApproval}
          />
        )}

        {activeTab === 'suggestions' && (
          <SuggestionList 
            suggestions={suggestions}
            currentUser={currentUser}
            users={users}
            onLike={onLike}
            onComment={onComment}
          />
        )}

        {activeTab === 'signups' && (
          <SignupApproval 
            requests={signupRequests}
            onApprove={onSignupApprove}
            onReject={onSignupReject}
          />
        )}
      </main>
    </div>
  )
}

export default PresidentDashboard
