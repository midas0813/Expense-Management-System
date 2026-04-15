import { useState } from 'react'

function SupervisorRequest({ requests, currentUser, users, onResponse }) {
  const [responseTexts, setResponseTexts] = useState({})

  const getUserName = (userId) => users.find(u => u.id === userId)?.name || 'Unknown'

  const handleResponseSubmit = (requestId) => {
    const text = responseTexts[requestId]
    if (text && text.trim()) {
      onResponse(requestId, text)
      setResponseTexts({ ...responseTexts, [requestId]: '' })
    }
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Supervisor Requests for Input</h2>
      {requests.length === 0 ? (
        <div className="card">
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No requests yet</p>
        </div>
      ) : (
        requests.map(request => (
          <div key={request.id} className="card request-card">
            <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#92400e' }}>
              From: <strong>{getUserName(request.supervisorId)}</strong> • {request.date}
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>{request.topic}</h3>
            <p style={{ marginBottom: '1rem' }}>{request.question}</p>

            {request.responses.length > 0 && (
              <div className="response-list">
                <strong>Responses:</strong>
                {request.responses.map(response => (
                  <div key={response.id} className="response-item">
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                      {getUserName(response.userId)} • {response.date}
                    </div>
                    <div>{response.text}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="comment-form" style={{ marginTop: '1rem' }}>
              <input
                type="text"
                placeholder="Share your thoughts..."
                value={responseTexts[request.id] || ''}
                onChange={(e) => setResponseTexts({ ...responseTexts, [request.id]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleResponseSubmit(request.id)}
              />
              <button
                className="btn btn-primary"
                onClick={() => handleResponseSubmit(request.id)}
              >
                Respond
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SupervisorRequest
