import { useState } from 'react'

function ExpenseList({ expenses, currentUser, users, onApproval }) {
  const [expandedPhoto, setExpandedPhoto] = useState(null)
  
  const getUserName = (userId) => users.find(u => u.id === userId)?.name || '不明'

  const getStatusLabel = (status) => {
    const labels = {
      'pending_supervisor': '管理者承認待ち',
      'pending_president': '社長承認待ち',
      'approved': '承認済み',
      'rejected': '却下'
    }
    return labels[status] || status
  }

  const canApprove = (expense) => {
    if (expense.status === 'pending_supervisor' && currentUser.role === 'supervisor') return true
    if (expense.status === 'pending_president' && currentUser.role === 'president') return true
    return false
  }

  return (
    <>
      <div className="card">
        <h2>経費申請一覧</h2>
        {expenses.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>まだ経費がありません</p>
        ) : (
          expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-header">
              <div className="expense-amount">¥{expense.amount.toLocaleString()}</div>
              <span className={`status-badge status-${expense.status}`}>
                {getStatusLabel(expense.status)}
              </span>
            </div>
            <div className="expense-meta">
              <strong>{getUserName(expense.userId)}</strong> • {expense.date}
            </div>
            <p>{expense.reason}</p>
            
            {expense.photoUrl && (
              <div className="expense-photo-container">
                <img 
                  src={expense.photoUrl} 
                  alt="領収書" 
                  className="expense-photo-thumb"
                  onClick={() => setExpandedPhoto(expense.photoUrl)}
                />
                <span className="photo-label">📷 領収書添付済み</span>
              </div>
            )}
            
            {expense.approvedBy.length > 0 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                承認者: {expense.approvedBy.map(id => getUserName(id)).join(', ')}
              </div>
            )}

            {canApprove(expense) && (
              <div className="approval-actions">
                <button 
                  className="btn btn-success"
                  onClick={() => onApproval(expense.id, 'approve')}
                >
                  ✓ 承認
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onApproval(expense.id, 'reject')}
                >
                  ✗ 却下
                </button>
              </div>
            )}
          </div>
          ))
        )}
      </div>

      {expandedPhoto && (
        <div className="photo-modal" onClick={() => setExpandedPhoto(null)}>
          <div className="photo-modal-content">
            <button className="photo-modal-close" onClick={() => setExpandedPhoto(null)}>
              ✕
            </button>
            <img src={expandedPhoto} alt="Receipt full size" />
          </div>
        </div>
      )}
    </>
  )
}

export default ExpenseList
