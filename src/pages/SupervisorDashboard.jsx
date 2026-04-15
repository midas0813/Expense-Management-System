import { useState } from 'react'
import ExpenseList from '../components/ExpenseList'
import SuggestionList from '../components/SuggestionList'

function SupervisorDashboard({ 
  currentUser, 
  expenses, 
  suggestions, 
  users,
  onApproval,
  onLike,
  onComment
}) {
  const [activeTab, setActiveTab] = useState('approvals')

  const pendingExpenses = expenses.filter(e => 
    e.status === 'pending_supervisor' || e.status === 'pending_president'
  )

  return (
    <div>
      <nav className="tabs">
        <button className={activeTab === 'approvals' ? 'active' : ''} onClick={() => setActiveTab('approvals')}>
          Pending Approvals ({pendingExpenses.length})
        </button>
        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
          All Expenses
        </button>
        <button className={activeTab === 'suggestions' ? 'active' : ''} onClick={() => setActiveTab('suggestions')}>
          Suggestions
        </button>
      </nav>

      <main className="main">
        {activeTab === 'approvals' && (
          <ExpenseList 
            expenses={pendingExpenses}
            currentUser={currentUser}
            users={users}
            onApproval={onApproval}
          />
        )}

        {activeTab === 'all' && (
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
      </main>
    </div>
  )
}

export default SupervisorDashboard
