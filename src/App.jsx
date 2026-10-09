import { useEffect, useState } from 'react'
import {
  BookOpen, Check, ChevronDown, CircleHelp, Compass, Hammer, Info, Layers3,
  LayoutDashboard, Lightbulb, LogIn, LogOut, Mail, Map, Menu, MessageCircle, PanelsTopLeft, PenTool, Plus,
  Quote, Scale, Search, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import Workspace from './components/Workspace'
import { creationTypes, navGroups, stages, starterProjects } from './data'
import { loadAccountProjects, saveAccountProject } from './lib/projectStore'
import { hasSupabaseConfig, supabase } from './lib/supabase'
import './App.css'

const iconMap = { LayoutDashboard, Lightbulb, BookOpen, Map, PenTool, Hammer, Sparkles, Compass, PanelsTopLeft, Info, Layers3, CircleHelp, Mail, MessageCircle, Quote, ShieldCheck, Scale }
const retiredSampleIds = new Set(['pantry', 'fieldnotes', 'quietcorners'])

function loadProjects() {
  try {
    const stored = localStorage.getItem('ideavision-projects')
    const projects = stored ? JSON.parse(stored) : starterProjects
    return Array.isArray(projects) ? projects.filter((item) => !retiredSampleIds.has(item.id)) : []
  } catch {
    return []
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
  const [session, setSession] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('sign-in')
  const [authMessage, setAuthMessage] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const project = projects.find((item) => item.id === selectedId) || projects[0]

  useEffect(() => {
    if (!supabase) return undefined
    let active = true
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) setToast('Could not restore your account session.')
      setSession(data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (!nextSession) {
        const localProjects = loadProjects()
        setProjects(localProjects)
        setSelectedId(localStorage.getItem('ideavision-selected') || localProjects[0]?.id)
      }
    })
    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !session?.user?.id) return undefined
    let active = true
    loadAccountProjects(session.user.id).then((accountProjects) => {
      if (!active) return
      setProjects(accountProjects)
      setSelectedId((currentId) => accountProjects.some((item) => item.id === currentId) ? currentId : accountProjects[0]?.id)
    }).catch(() => {
      if (active) setToast('Could not load your saved projects. Check the database setup and try again.')
    })
    return () => { active = false }
  }, [session?.user?.id])

  useEffect(() => {
    if (!supabase || !session) localStorage.setItem('ideavision-projects', JSON.stringify(projects))
  }, [projects, session])
  useEffect(() => {
    localStorage.removeItem('ideavision-test-transactions')
    if (project) localStorage.setItem('ideavision-selected', project.id)
    else localStorage.removeItem('ideavision-selected')
  }, [project])
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
    const existing = projects.find((item) => item.id === id)
    if (!existing) return
    const updated = { ...existing, ...updates }
    setProjects((items) => items.map((item) => item.id === id ? updated : item))
    if (supabase && session?.user?.id) {
      saveAccountProject(session.user.id, updated).catch(() => setToast('This change could not be saved to your account.'))
    }
  }

  const selectView = (view) => {
    setActiveView(view)
    setMobileNavOpen(false)
  }

  const changeStage = (stageId) => {
    const index = stages.findIndex((item) => item.id === stageId)
    if (!project && index >= 0) {
      setActiveView('idea')
      setMobileNavOpen(false)
      setModalOpen(true)
      return
    }
    selectView(stageId)
    if (project && index >= 0) {
      updateProject(project.id, { stage: stageId, stageIndex: index })
    }
  }

  const createProject = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title')).trim()
    const description = String(form.get('description')).trim()
    const problem = String(form.get('problem')).trim()
    const type = String(form.get('type'))
    if (!title || !description) return
    const created = {
      id: `idea-${Date.now()}`, title, description, type, purpose: '',
      audience: String(form.get('audience')).trim(),
      problem,
      solution: '', progress: 0, stage: 'idea', stageIndex: 0,
      category: type.replace(' project', ''), nextTask: 'Write down who this idea could help', due: 'Whenever you are ready',
      skills: [], milestones: [
        { title: 'Name the problem this could help solve', done: false },
        { title: 'Learn what people already need', done: false },
        { title: 'Sketch a first, useful version', done: false },
        { title: 'Share what you made with someone', done: false },
      ],
      createdAt: new Date().toISOString().slice(0, 10),
    }
    if (supabase && session?.user?.id) {
      try {
        await saveAccountProject(session.user.id, created)
      } catch {
        setToast('Your idea was not saved. Check your account connection and try again.')
        return
      }
    }
    setProjects((items) => [created, ...items])
    setSelectedId(created.id)
    setActiveView('idea')
    setModalOpen(false)
    setToast('Your new idea is ready for its first step.')
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    if (!supabase) return
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email')).trim()
    const password = String(form.get('password'))
    setAuthBusy(true)
    setAuthMessage('')
    try {
      const result = authMode === 'sign-up'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })
      if (result.error) {
        setAuthMessage(result.error.message)
        return
      }
      if (authMode === 'sign-up' && !result.data.session) {
        setAuthMessage('Account created. Check your email if confirmation is enabled for this Supabase project.')
        return
      }
      setAuthOpen(false)
      setToast(authMode === 'sign-up' ? 'Account created.' : 'Signed in.')
    } catch {
      setAuthMessage('Could not reach the account service. Check the connection and try again.')
    } finally {
      setAuthBusy(false)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) setToast('Could not sign out. Please try again.')
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
        <div className="sidebar-bottom"><div className="sidebar-note"><span className="note-star">✳</span><p>Good things start<br />with a first thought.</p></div><div className="profile-row"><span className="profile-avatar">IF</span><span><strong>{session?.user?.email || 'Local workspace'}</strong><small>{session ? 'Synced to your account' : 'Saved in this browser'}</small></span></div></div>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <div className="topbar-left"><button type="button" className="mobile-menu icon-button" aria-label="Toggle navigation" onClick={() => setMobileNavOpen(!mobileNavOpen)}><Menu size={20} /></button><span className="breadcrumb-root">Your studio</span><span className="breadcrumb-slash">/</span><span className="breadcrumb-current">{activeLabel}</span></div>
          <div className="topbar-right">
            <label className="top-search"><Search size={16} /><span className="sr-only">Search your projects</span><input aria-label="Search projects" placeholder="Search projects" onKeyDown={(event) => { if (event.key === 'Enter') { const match = projects.find((item) => item.title.toLowerCase().includes(event.currentTarget.value.toLowerCase())); if (match) { setSelectedId(match.id); selectView('dashboard') } } }} /><kbd>↵</kbd></label>
            {hasSupabaseConfig && (session
              ? <button type="button" className="account-button" onClick={signOut}><LogOut size={15} /> Sign out</button>
              : <button type="button" className="account-button" onClick={() => { setAuthMode('sign-in'); setAuthMessage(''); setAuthOpen(true) }}><LogIn size={15} /> Sign in</button>)}
          </div>
        </header>
        <div className="content-area">
          <div className="content-toolbar"><span><span className="live-dot" /> YOUR CREATIVE STUDIO</span>{project ? <label className="current-project-select"><span>WORKING ON</span><select value={project.id} onChange={(event) => setSelectedId(event.target.value)} aria-label="Select a project">{projects.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select><ChevronDown size={14} /></label> : <button type="button" className="button button-outline" onClick={() => openNewProject()}><Plus size={14} /> Start your first idea</button>}</div>
          <Workspace key={`${activeView}-${project?.id}`} view={activeView} project={project} projects={projects} onUpdate={updateProject} onStageChange={changeStage} onNewProject={openNewProject} onSelectProject={(id) => { setSelectedId(id); selectView('dashboard') }} />
          <footer className="studio-footer"><span>IDEAVISION FORGE <i>·</i> I.L.P.C.B.</span><span>Turn any idea into something real.</span></footer>
        </div>
      </main>

      {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><section className="idea-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><span className="modal-symbol"><Lightbulb size={19} /></span><button className="icon-button" type="button" onClick={() => setModalOpen(false)} aria-label="Close"><X size={18} /></button></div><p className="eyebrow">EVERYTHING STARTS SOMEWHERE</p><h2 id="modal-title">What have you been thinking about?</h2><p className="modal-intro">It does not need to be polished. Start with the thought that keeps coming back.</p><form onSubmit={createProject}><label className="field-label">A working title<input name="title" defaultValue={prefill.title} required placeholder="A name, even if it changes" autoFocus /></label><label className="field-label">What would you like to make?<select name="type" defaultValue={prefill.type || 'Creative project'}>{creationTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="field-label">Describe the idea<textarea name="description" rows="3" required placeholder="A sentence is a good place to start…" /></label><label className="field-label">Who or what could it help?<input name="problem" placeholder="A need, a question, or a small frustration" /></label><label className="field-label">Who do you imagine this is for?<input name="audience" placeholder="Anyone you have in mind so far" /></label><div className="modal-actions"><button className="button button-text" type="button" onClick={() => setModalOpen(false)}>Maybe later</button><button className="button button-primary" type="submit"><Plus size={16} /> Start with this idea</button></div></form></section></div>}
      {authOpen && hasSupabaseConfig && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false) }}><section className="idea-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><div className="modal-heading"><span className="modal-symbol"><LogIn size={19} /></span><button className="icon-button" type="button" onClick={() => setAuthOpen(false)} aria-label="Close account dialog"><X size={18} /></button></div><p className="eyebrow">YOUR PROJECTS, ACROSS DEVICES</p><h2 id="auth-title">{authMode === 'sign-up' ? 'Create your account.' : 'Sign in to your studio.'}</h2><p className="modal-intro">Your projects will be saved to your account. Browser-only projects are not automatically imported.</p><form onSubmit={handleAuthSubmit}><label className="field-label">Email<input name="email" type="email" required autoComplete="email" /></label><label className="field-label">Password<input name="password" type="password" required autoComplete={authMode === 'sign-up' ? 'new-password' : 'current-password'} minLength={8} /></label>{authMessage && <p className="auth-message" role="status">{authMessage}</p>}<div className="modal-actions"><button className="button button-text" type="button" onClick={() => { setAuthMode(authMode === 'sign-up' ? 'sign-in' : 'sign-up'); setAuthMessage('') }}>{authMode === 'sign-up' ? 'I already have an account' : 'Create an account'}</button><button className="button button-primary" type="submit" disabled={authBusy}>{authBusy ? 'Please wait…' : authMode === 'sign-up' ? 'Create account' : 'Sign in'}</button></div></form></section></div>}
      {toast && <div className="toast-message" role="status"><span><Check size={15} /></span>{toast}</div>}
    </div>
  )
}

export default App
