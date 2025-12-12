import { useState, useEffect } from 'react'
import { BidTemplate } from '../types'
import { getTemplates, generateBid } from '../utils/storage'
import './GeneratePage.css'

function GeneratePage() {
  const [templates, setTemplates] = useState<BidTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  const [jobDescription, setJobDescription] = useState<string>('')
  const [generatedBid, setGeneratedBid] = useState<string>('')

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
    }
  }

  return (
    <div className="generate-page">
      <h1>Generate Bid</h1>
      
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="template-select">Select Template:</label>
          <select
            id="template-select"
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="form-control"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="job-description">Job Description:</label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description here..."
            className="form-control textarea-large"
            rows={8}
          />
        </div>

        <button onClick={handleGenerate} className="btn btn-primary btn-generate">
          Generate Bid
        </button>
      </div>

      {generatedBid && (
        <div className="result-section">
          <h2>Generated Bid Text</h2>
          <div className="bid-output">
            <pre>{generatedBid}</pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedBid)
                alert('Bid text copied to clipboard!')
              }}
              className="btn btn-secondary btn-copy"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GeneratePage

