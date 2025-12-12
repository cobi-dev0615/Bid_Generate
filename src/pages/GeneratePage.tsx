import { useState, useEffect } from 'react'
import { BidTemplate } from '../types'
import { getTemplates, generateBid } from '../utils/storage'
import './GeneratePage.css'

function GeneratePage() {
  const [templates, setTemplates] = useState<BidTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  const [jobDescription, setJobDescription] = useState<string>('')
  const [generatedBid, setGeneratedBid] = useState<string>('')
  const [copySuccess, setCopySuccess] = useState<boolean>(false)

  useEffect(() => {
    const loadedTemplates = getTemplates()
    setTemplates(loadedTemplates)
    if (loadedTemplates.length > 0) {
      setSelectedTemplateId(loadedTemplates[0].id)
    }
  }, [])

  const handleGenerate = () => {
    if (!selectedTemplateId || !jobDescription.trim()) {
      alert('Please select a template and enter a job description.')
      return
    }

    const selectedTemplate = templates.find(t => t.id === selectedTemplateId)
    if (selectedTemplate) {
      const bid = generateBid(selectedTemplate, jobDescription)
      setGeneratedBid(bid)
      setCopySuccess(false)
      setJobDescription('')
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedBid)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = generatedBid
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (fallbackErr) {
        alert('Failed to copy. Please select and copy manually.')
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="generate-page">
      <h1>Generate Bid</h1>
      
      <div className="template-selector">
        <label>Select Template:</label>
        <div className="btn-group">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplateId(template.id)}
              className={`btn btn-template ${selectedTemplateId === template.id ? 'active' : ''}`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <div className="two-column-layout">
        <div className="left-panel">
          <div className="panel-header">
            <h2>Job Description</h2>
          </div>
          <div className="panel-content">
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter the job description here..."
              className="form-control textarea-large"
            />
            <button onClick={handleGenerate} className="btn btn-primary btn-generate">
              Generate Bid
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="panel-header">
            <h2>Generated Bid</h2>
            {generatedBid && (
              <button
                onClick={handleCopy}
                className={`btn btn-copy ${copySuccess ? 'copied' : ''}`}
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="panel-content">
            <div className="bid-output">
              {generatedBid ? (
                <pre>{generatedBid}</pre>
              ) : (
                <div className="empty-state">
                  <p>Generated bid will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneratePage

