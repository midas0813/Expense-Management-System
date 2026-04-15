import { useState } from 'react'

function ExpenseForm({ onSubmit }) {
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ファイルサイズは5MB以下にしてください')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result)
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (amount && reason) {
      onSubmit({ amount: parseInt(amount), reason, photoUrl: photo })
      setAmount('')
      setReason('')
      setPhoto(null)
      setPhotoPreview(null)
    }
  }

  return (
    <div className="card">
      <h2>経費申請</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>金額 (¥)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="15000"
            required
          />
        </div>
        <div className="form-group">
          <label>理由</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="クライアントとの会食費用..."
            required
          />
        </div>
        
        <div className="form-group">
          <label>領収書の写真（任意）</label>
          <div className="photo-upload-area">
            {!photoPreview ? (
              <label className="upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
                <div className="upload-placeholder">
                  📷 クリックして領収書をアップロード
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                    最大5MB • JPG, PNG, GIF
                  </div>
                </div>
              </label>
            ) : (
              <div className="photo-preview">
                <img src={photoPreview} alt="領収書プレビュー" />
                <button
                  type="button"
                  className="btn-remove-photo"
                  onClick={handleRemovePhoto}
                >
                  ✕ 削除
                </button>
              </div>
            )}
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">申請を送信</button>
      </form>
    </div>
  )
}

export default ExpenseForm
