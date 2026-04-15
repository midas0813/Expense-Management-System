function SignupApproval({ requests, onApprove, onReject }) {
  const pendingRequests = requests.filter(r => r.status === 'pending')

  const getRoleLabel = (role) => {
    const labels = {
      employee: '社員',
      supervisor: '管理者',
      president: '社長'
    }
    return labels[role] || role
  }

  return (
    <div className="card">
      <h2>登録申請 ({pendingRequests.length})</h2>
      
      {pendingRequests.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
          承認待ちの登録申請はありません
        </p>
      ) : (
        pendingRequests.map(request => (
          <div key={request.id} className="signup-request-item">
            <div className="request-header">
              <div>
                <h3>{request.name}</h3>
                <div className="request-meta">
                  {request.email} • 申請日: {request.date}
                </div>
              </div>
              <span className="status-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                {getRoleLabel(request.requestedRole)}
              </span>
            </div>
            
            <div className="approval-actions" style={{ marginTop: '1rem' }}>
              <select
                id={`role-${request.id}`}
                defaultValue={request.requestedRole}
                style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="employee">社員</option>
                <option value="supervisor">管理者</option>
                <option value="president">社長</option>
              </select>
              
              <button
                className="btn btn-success"
                onClick={() => {
                  const role = document.getElementById(`role-${request.id}`).value
                  onApprove(request.id, role)
                }}
              >
                ✓ 承認
              </button>
              
              <button
                className="btn btn-danger"
                onClick={() => onReject(request.id)}
              >
                ✗ 却下
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SignupApproval
