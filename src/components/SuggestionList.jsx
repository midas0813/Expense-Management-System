import { useState } from 'react'

function SuggestionList({ suggestions, currentUser, users, onLike, onComment }) {
  const [commentTexts, setCommentTexts] = useState({})

  const getUserName = (userId) => users.find(u => u.id === userId)?.name || '不明'

  const getCategoryLabel = (category) => {
    const labels = {
      'efficiency': '効率化',
      'budget': '予算',
      'process': 'プロセス',
      'tools': 'ツール'
    }
    return labels[category] || category
  }

  const handleCommentSubmit = (suggestionId) => {
    const text = commentTexts[suggestionId]
    if (text && text.trim()) {
      onComment(suggestionId, text)
      setCommentTexts({ ...commentTexts, [suggestionId]: '' })
    }
  }

  return (
    <div className="card">
      <h2>改善提案一覧</h2>
      {suggestions.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>まだ提案がありません</p>
      ) : (
        suggestions.map(suggestion => (
          <div key={suggestion.id} className="suggestion-item">
            <div className="suggestion-header">
              <h3>{suggestion.title}</h3>
              <span className="status-badge" style={{ background: '#e0e7ff', color: '#3730a3' }}>
                {getCategoryLabel(suggestion.category)}
              </span>
            </div>
            <div className="suggestion-meta">
              <strong>{getUserName(suggestion.userId)}</strong> • {suggestion.date}
            </div>
            <p>{suggestion.description}</p>

            <div className="like-section">
              <button
                className={`like-btn ${suggestion.likedBy.includes(currentUser.id) ? 'liked' : ''}`}
                onClick={() => onLike(suggestion.id)}
              >
                👍 {suggestion.likes}
              </button>
              <span style={{ color: '#666' }}>{suggestion.comments.length} コメント</span>
            </div>

            {suggestion.comments.length > 0 && (
              <div className="comments">
                {suggestion.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-author">
                      {getUserName(comment.userId)} • {comment.date}
                    </div>
                    <div>{comment.text}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="comment-form">
              <input
                type="text"
                placeholder="コメントを追加..."
                value={commentTexts[suggestion.id] || ''}
                onChange={(e) => setCommentTexts({ ...commentTexts, [suggestion.id]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(suggestion.id)}
              />
              <button
                className="btn btn-secondary"
                onClick={() => handleCommentSubmit(suggestion.id)}
              >
                コメント
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SuggestionList
