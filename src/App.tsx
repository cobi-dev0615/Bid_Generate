import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TemplatesPage from './pages/TemplatesPage'
import GeneratePage from './pages/GeneratePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-link">Templates</Link>
          <Link to="/generate" className="nav-link">Generate Bid</Link>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TemplatesPage />} />
            <Route path="/generate" element={<GeneratePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

