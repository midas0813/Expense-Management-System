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
          My Expenses
        </button>
        <button className={activeTab === 'suggestions' ? 'active' : ''} onClick={() => setActiveTab('suggestions')}>
          Suggestions
        </button>
        <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
          Supervisor Requests
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
