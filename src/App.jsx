import { useEffect, useState } from 'react'
import {
  BookOpen, Check, ChevronDown, CircleHelp, Compass, Hammer, Info, Layers3,
  LayoutDashboard, Lightbulb, Mail, Map, Menu, PanelsTopLeft, PenTool, Plus,
  Quote, Search, Sparkles, X,
} from 'lucide-react'
import Workspace from './components/Workspace'
import { creationTypes, navGroups, stages, starterProjects } from './data'
import './App.css'

const iconMap = { LayoutDashboard, Lightbulb, BookOpen, Map, PenTool, Hammer, Sparkles, Compass, PanelsTopLeft, Info, Layers3, Quote, CircleHelp, Mail }

function loadProjects() {
  try {
    const stored = localStorage.getItem('ideavision-projects')
    return stored ? JSON.parse(stored) : starterProjects
  } catch {
    return starterProjects
  }
}

function App() {
  const [projects, setProjects] = useState(loadProjects)
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem('ideavision-selected') || loadProjects()[0]?.id)
  const [activeView, setActiveView] = useState('dashboard')
  const [modalOpen, setModalOpen] = useState(false)
  const [prefill, setPrefill] = useState({ title: '', type: '' })
  const [toast, setToast] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const project = projects.find((item) => item.id === selectedId) || projects[0]

  useEffect(() => { localStorage.setItem('ideavision-projects', JSON.stringify(projects)) }, [projects])
  useEffect(() => { if (project) localStorage.setItem('ideavision-selected', project.id) }, [project])
  useEffect(() => {
    const handleToast = (event) => {
      setToast(event.detail)
      window.setTimeout(() => setToast(''), 2800)
    }
    window.addEventListener('ivf-toast', handleToast)
    return () => window.removeEventListener('ivf-toast', handleToast)
  }, [])

  const openNewProject = (title = '', type = '') => {
    setPrefill({ title, type })
    setModalOpen(true)
  }

  const updateProject = (id, updates) => {
    setProjects((items) => items.map((item) => item.id === id ? { ...item, ...updates } : item))
  }

  const selectView = (view) => {
    setActiveView(view)
    setMobileNavOpen(false)
  }

  const changeStage = (stageId) => {
    selectView(stageId)
    if (stageId !== 'result') {
      const index = stages.findIndex((item) => item.id === stageId)
      if (index >= 0) updateProject(project.id, { stage: stageId, stageIndex: index, progress: Math.max(project.progress, Math.min(95, index * 16)) })
    }
  }

  const createProject = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title')).trim()
    const description = String(form.get('description')).trim()
    const problem = String(form.get('problem')).trim()
    const type = String(form.get('type'))
    if (!title || !description) return
    const created = {
      id: `idea-${Date.now()}`, title, description, type, purpose: description,
      audience: String(form.get('audience')).trim() || 'People who could use a thoughtful new solution',
      problem: problem || 'A problem worth understanding more closely.',
      solution: description, progress: 8, stage: 'idea', stageIndex: 0,
      category: type.replace(' project', ''), nextTask: 'Write down who this idea could help', due: 'Whenever you are ready',
      skills: ['Research', 'Creativity', 'Planning'], milestones: [
        { title: 'Name the problem this could help solve', done: false },
        { title: 'Learn what people already need', done: false },
        { title: 'Sketch a first, useful version', done: false },
        { title: 'Share what you made with someone', done: false },
      ],
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProjects((items) => [created, ...items])
    setSelectedId(created.id)
    setActiveView('idea')
    setModalOpen(false)
    setToast('Your new idea is ready for its first step.')
  }

  const activeLabel = [...navGroups.flatMap((group) => group.items), ...stages.map((stage) => ({ id: stage.id, label: stage.name }))].find((item) => item.id === activeView)?.label || 'Overview'

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <button className="brand-lockup" type="button" onClick={() => selectView('dashboard')} aria-label="IdeaVision Forge overview">
          <span className="brand-symbol"><span /><span /><span /></span><span className="brand-name">idea<span>vision</span><strong>forge</strong></span>
        </button>
        <div className="brand-rule" />
        <button className="workspace-picker" type="button" onClick={() => selectView('dashboard')}><span className="workspace-avatar">IF</span><span><strong>My studio</strong><small>Personal workspace</small></span><ChevronDown size={15} /></button>
        <nav aria-label="Main navigation">
          {navGroups.map((group) => <div className="nav-group" key={group.label}><p className="nav-group-label">{group.label}</p>{group.items.map((item) => {
            const Icon = iconMap[item.icon]
            const active = activeView === item.id
            return <button type="button" key={item.id} className={`nav-link ${active ? 'nav-active' : ''}`} onClick={() => selectView(item.id)} aria-current={active ? 'page' : undefined}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>{active && <span className="nav-indicator" />}</button>
          })}</div>)}
        </nav>
        <div className="sidebar-bottom"><div className="sidebar-note"><span className="note-star">✳</span><p>Good things start<br />with a first thought.</p></div><div className="profile-row"><span className="profile-avatar">Y</span><span><strong>Your studio</strong><small>Maker account</small></span><button type="button" aria-label="Profile options" className="profile-menu"><Menu size={17} /></button></div></div>
      </aside>

      <main className="main-shell">
        <header className="topbar"><div className="topbar-left"><button type="button" className="mobile-menu icon-button" aria-label="Toggle navigation" onClick={() => setMobileNavOpen(!mobileNavOpen)}><Menu size={20} /></button><span className="breadcrumb-root">Your studio</span><span className="breadcrumb-slash">/</span><span className="breadcrumb-current">{activeLabel}</span></div><div className="topbar-right"><label className="top-search"><Search size={16} /><span className="sr-only">Search your projects</span><input aria-label="Search projects" placeholder="Search projects" onKeyDown={(event) => { if (event.key === 'Enter') { const match = projects.find((item) => item.title.toLowerCase().includes(event.currentTarget.value.toLowerCase())); if (match) { setSelectedId(match.id); selectView('dashboard') } } }} /><kbd>↵</kbd></label><span className="topbar-divider" /><button className="profile-avatar top-avatar" type="button" aria-label="Your account">Y</button></div></header>
        <div className="content-area">
          <div className="content-toolbar"><span><span className="live-dot" /> YOUR CREATIVE STUDIO</span><label className="current-project-select"><span>WORKING ON</span><select value={project?.id || ''} onChange={(event) => setSelectedId(event.target.value)} aria-label="Select a project">{projects.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select><ChevronDown size={14} /></label></div>
          <Workspace key={`${activeView}-${project?.id}`} view={activeView} project={project} projects={projects} onUpdate={updateProject} onStageChange={changeStage} onNewProject={openNewProject} onSelectProject={(id) => { setSelectedId(id); selectView('dashboard') }} onContactSubmit={() => setToast('Contact preview: connect an inbox to receive messages.')} />
          <footer className="studio-footer"><span>IDEAVISION FORGE <i>·</i> I.L.P.C.B.</span><span>Turn any idea into something real.</span></footer>
        </div>
      </main>

      {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><section className="idea-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><span className="modal-symbol"><Lightbulb size={19} /></span><button className="icon-button" type="button" onClick={() => setModalOpen(false)} aria-label="Close"><X size={18} /></button></div><p className="eyebrow">EVERYTHING STARTS SOMEWHERE</p><h2 id="modal-title">What have you been thinking about?</h2><p className="modal-intro">It does not need to be polished. Start with the thought that keeps coming back.</p><form onSubmit={createProject}><label className="field-label">A working title<input name="title" defaultValue={prefill.title} required placeholder="A name, even if it changes" autoFocus /></label><label className="field-label">What would you like to make?<select name="type" defaultValue={prefill.type || 'Creative project'}>{creationTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="field-label">Describe the idea<textarea name="description" rows="3" required placeholder="A sentence is a good place to start…" /></label><label className="field-label">Who or what could it help?<input name="problem" placeholder="A need, a question, or a small frustration" /></label><label className="field-label">Who do you imagine this is for?<input name="audience" placeholder="Anyone you have in mind so far" /></label><div className="modal-actions"><button className="button button-text" type="button" onClick={() => setModalOpen(false)}>Maybe later</button><button className="button button-primary" type="submit"><Plus size={16} /> Start with this idea</button></div></form></section></div>}
      {toast && <div className="toast-message" role="status"><span><Check size={15} /></span>{toast}</div>}
    </div>
  )
}

export default App
