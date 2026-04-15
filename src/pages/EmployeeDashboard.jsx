import { useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import SuggestionForm from '../components/SuggestionForm'
import SuggestionList from '../components/SuggestionList'
import SupervisorRequest from '../components/SupervisorRequest'

function EmployeeDashboard({ 
  currentUser, 
  expenses, 
  suggestions, 
  requests, 
  users,
  onExpenseSubmit,
  onSuggestionSubmit,
  onLike,
  onComment,
  onRequestResponse
}) {
  const [activeTab, setActiveTab] = useState('expenses')

  const myExpenses = expenses.filter(e => e.userId === currentUser.id)

  return (
    <div>
      <nav className="tabs">
        <button className={activeTab === 'expenses' ? 'active' : ''} onClick={() => setActiveTab('expenses')}>
          マイ経費
        </button>
        <button className={activeTab === 'suggestions' ? 'active' : ''} onClick={() => setActiveTab('suggestions')}>
          改善提案
        </button>
        <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
          管理者からの質問
        </button>
      </nav>

      <main className="main">
        {activeTab === 'expenses' && (
          <>
            <ExpenseForm onSubmit={onExpenseSubmit} />
            <ExpenseList 
              expenses={myExpenses}
              currentUser={currentUser}
              users={users}
              onApproval={() => {}}
            />
          </>
        )}

        {activeTab === 'suggestions' && (
          <>
            <SuggestionForm onSubmit={onSuggestionSubmit} />
            <SuggestionList 
              suggestions={suggestions}
              currentUser={currentUser}
              users={users}
              onLike={onLike}
              onComment={onComment}
            />
          </>
        )}

        {activeTab === 'requests' && (
          <SupervisorRequest 
            requests={requests}
            currentUser={currentUser}
            users={users}
            onResponse={onRequestResponse}
          />
        )}
      </main>
    </div>
  )
}

export default EmployeeDashboard
