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
      <h2>Submit Improvement Suggestion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your suggestion title..."
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your improvement idea..."
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="efficiency">Efficiency</option>
            <option value="budget">Budget</option>
            <option value="process">Process</option>
            <option value="tools">Tools</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Suggestion</button>
      </form>
    </div>
  )
}

export default SuggestionForm
