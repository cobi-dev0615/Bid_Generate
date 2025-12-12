import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BidTemplate } from '../types'
import { getTemplates } from '../utils/storage'
import './TemplatesPage.css'

function TemplatesPage() {
  const [templates, setTemplates] = useState<BidTemplate[]>([])

  useEffect(() => {
    setTemplates(getTemplates())
  }, [])

  return (
    <div className="templates-page">
      <h1>Bid Templates</h1>
      <p className="page-description">
        View and manage your bid templates. Click "Generate Bid" to create a new bid using one of these templates.
      </p>
      
      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <h2>{template.name}</h2>
            <div className="template-content">
              <pre>{template.content}</pre>
            </div>
          </div>
        ))}
      </div>

      <div className="action-section">
        <Link to="/generate" className="btn btn-primary">
          Generate New Bid
        </Link>
      </div>
    </div>
  )
}

export default TemplatesPage

