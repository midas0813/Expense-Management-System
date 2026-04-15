function SignupApproval({ requests, onApprove, onReject }) {
  const pendingRequests = requests.filter(r => r.status === 'pending')

  return (
    <div className="card">
      <h2>Signup Requests ({pendingRequests.length})</h2>
      
      {pendingRequests.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
          No pending signup requests
        </p>
      ) : (
        pendingRequests.map(request => (
          <div key={request.id} className="signup-request-item">
            <div className="request-header">
              <div>
                <h3>{request.name}</h3>
                <div className="request-meta">
                  {request.email} • Requested: {request.date}
                </div>
              </div>
              <span className="status-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                {request.requestedRole}
              </span>
            </div>
            
            <div className="approval-actions" style={{ marginTop: '1rem' }}>
              <select
                id={`role-${request.id}`}
                defaultValue={request.requestedRole}
                style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                <option value="employee">Employee</option>
                <option value="supervisor">Supervisor</option>
                <option value="president">President</option>
              </select>
              
              <button
                className="btn btn-success"
                onClick={() => {
                  const role = document.getElementById(`role-${request.id}`).value
                  onApprove(request.id, role)
                }}
              >
                ✓ Approve
              </button>
              
              <button
                className="btn btn-danger"
                onClick={() => onReject(request.id)}
              >
                ✗ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SignupApproval
