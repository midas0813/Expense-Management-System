import { useState } from 'react'

function SuggestionForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('efficiency')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && description) {
      onSubmit({ title, description, category })
      setTitle('')
      setDescription('')
      setCategory('efficiency')
    }
  }

  return (
    <div className="card">
      <h2>改善提案を投稿</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="提案のタイトル..."
            required
          />
        </div>
        <div className="form-group">
          <label>詳細</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="改善案の詳細を記入してください..."
            required
          />
        </div>
        <div className="form-group">
          <label>カテゴリー</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="efficiency">効率化</option>
            <option value="budget">予算</option>
            <option value="process">プロセス</option>
            <option value="tools">ツール</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">提案を送信</button>
      </form>
    </div>
  )
}

export default SuggestionForm
