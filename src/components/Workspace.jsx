import { useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, CheckCircle2,
  ChevronRight, Circle, CircleHelp, Clock3, Compass, ExternalLink, Info, Lightbulb, Mail, Plus,
  Search, Sparkles, Target, WandSparkles,
} from 'lucide-react'
import { creationTypes, forgeFaqs, forgeServices, inspirationIdeas, learningTracks, makerReflections, stages } from '../data'
import Journey from './Journey'

const topicNames = ['Research', 'Design', 'Writing', 'Business', 'Marketing', 'Technology', 'Creativity', 'Communication']
const showcaseCategories = ['All', 'Community', 'Education', 'Digital product']
const typeColors = { 'Community project': 'mint', 'Educational project': 'blue', 'Digital product': 'peach' }
const showcaseImages = {
  quietcorners: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
  fieldnotes: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  pantry: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export default function Workspace({ view, project, projects, onUpdate, onStageChange, onNewProject, onSelectProject, onContactSubmit }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  if (!project) return null

  const updateProject = (updates) => onUpdate(project.id, updates)
  const currentStage = stages[project.stageIndex] || stages[0]
  const nextStage = stages[Math.min(project.stageIndex + 1, stages.length - 1)]
  const filteredIdeas = inspirationIdeas.filter((idea) =>
    (filter === 'All' || idea.type === filter) && `${idea.title} ${idea.concept} ${idea.type}`.toLowerCase().includes(query.toLowerCase()),
  )

  if (view === 'idea') {
    return <IdeaWorkspace project={project} onUpdate={updateProject} onStageChange={onStageChange} />
  }
  if (view === 'learn') {
    return <LearnWorkspace project={project} onUpdate={updateProject} onStageChange={onStageChange} />
  }
  if (view === 'plan') {
    return <PlanWorkspace project={project} onUpdate={updateProject} onStageChange={onStageChange} />
  }
  if (view === 'create') {
    return <CreateWorkspace project={project} onUpdate={updateProject} onStageChange={onStageChange} />
  }
  if (view === 'build') {
    return <BuildWorkspace project={project} onUpdate={updateProject} onStageChange={onStageChange} />
  }
  if (view === 'result') {
    return <ResultWorkspace project={project} onStageChange={onStageChange} />
  }
  if (view === 'explore') {
    return (
      <>
        <PageHeading eyebrow="A little spark goes a long way" title="Idea explorer" description="Browse thoughtful starting points, then make one your own." />
        <div className="explorer-controls">
          <label className="search-field"><Search size={17} /><span className="sr-only">Search ideas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ideas, themes, or formats" /></label>
          <div className="filter-tabs" aria-label="Filter ideas">
            {['All', 'Community', 'Digital product', 'Creative project', 'Educational project', 'Small business', 'Book'].map((item) => <button type="button" className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className="idea-grid">
          {filteredIdeas.map((idea, index) => (
            <article className="idea-card" key={idea.title}>
              <div className={`idea-art idea-art-${index % 4}`}><span>{String(index + 1).padStart(2, '0')}</span><Lightbulb size={24} /></div>
              <p className="eyebrow">{idea.type}</p>
              <h2>{idea.title}</h2>
              <p>{idea.concept}</p>
              <div className="idea-first-step"><span>START HERE</span>{idea.stage}</div>
              <button className="text-action" type="button" onClick={() => onNewProject(idea.title, idea.type)}><Plus size={16} /> Make it your idea</button>
            </article>
          ))}
          {filteredIdeas.length === 0 && <p className="empty-filter">No sparks found. Try a different search.</p>}
        </div>
      </>
    )
  }
  if (view === 'showcase') {
    const completed = projects.filter((item) => item.progress === 100)
    const results = completed.filter((item) => (filter === 'All' || item.category === filter) && `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()))
    return (
      <>
        <PageHeading eyebrow="Made by people like you" title="Community showcase" description="Every finished project started as a thought someone decided to follow." />
        <div className="explorer-controls">
          <label className="search-field"><Search size={17} /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search finished projects" /></label>
          <div className="filter-tabs" aria-label="Filter showcase">
            {showcaseCategories.map((item) => <button type="button" className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className="showcase-grid">
          {results.map((item, index) => <article className="showcase-card" key={item.id}>
            <div className={`showcase-art showcase-art-${index % 3}`}><img className="showcase-image" src={showcaseImages[item.id]} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><span className="showcase-stamp">FINISHED<br />WITH CARE</span><Sparkles size={23} /></div>
            <div className="showcase-copy"><div className="showcase-meta"><span>{item.category}</span><span>By a fellow maker</span></div><h2>{item.title}</h2><p>{item.description}</p><div className="showcase-tags">{item.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div><button className="text-action" type="button" onClick={() => onSelectProject(item.id)}><span>See the transformation</span><ArrowRight size={16} /></button></div>
          </article>)}
          {results.length === 0 && <p className="empty-filter">No completed projects match yet.</p>}
        </div>
      </>
    )
  }
  if (['about', 'services', 'testimonials', 'faq', 'contact'].includes(view)) {
    return <InformationWorkspace view={view} onNewProject={onNewProject} onStageChange={onStageChange} onContactSubmit={onContactSubmit} />
  }

  return <Dashboard project={project} projects={projects} onUpdate={updateProject} onStageChange={onStageChange} onNewProject={onNewProject} onSelectProject={onSelectProject} currentStage={currentStage} nextStage={nextStage} />
}

function InformationWorkspace({ view, onNewProject, onStageChange, onContactSubmit }) {
  if (view === 'services') {
    return <>
      <PageHeading eyebrow="A connected creative process" title="Services for the whole journey." description="IdeaVision Forge brings the tools, learning, and structure to take a personal idea from first thought to finished work." action={<button className="button button-primary" type="button" onClick={() => onNewProject()}><Plus size={16} /> Start with your idea</button>} />
      <div className="service-grid">{forgeServices.map((service) => <article className="service-card" key={service.number}><div className="service-card-top"><span>{service.number}</span><span>{service.stage}</span></div><h2>{service.title}</h2><p>{service.detail}</p><button type="button" className="text-action" onClick={() => onStageChange(stages[Number(service.number) - 1].id)}>Explore this stage <ArrowRight size={15} /></button></article>)}</div>
      <div className="info-bottom-cta"><div><p className="eyebrow">ONE WORKSPACE, START TO FINISH</p><h2>Bring the idea you have been carrying.</h2></div><button type="button" className="button button-dark" onClick={() => onNewProject()}>Start a project <ArrowRight size={16} /></button></div>
    </>
  }

  if (view === 'testimonials') {
    return <>
      <PageHeading eyebrow="The work speaks for itself" title="Small steps. Real momentum." description="A few example reflections on what it can feel like to move an idea forward." />
      <div className="reflection-note"><Info size={16} /><span>These are illustrative reflections, not attributed customer reviews.</span></div>
      <div className="reflection-grid">{makerReflections.map((reflection, index) => <article className="reflection-card" key={reflection.context}><span className={`reflection-mark reflection-mark-${index}`} aria-hidden="true">“</span><p className="reflection-quote">{reflection.quote}</p><div className="reflection-byline"><span className="reflection-avatar">{String(index + 1).padStart(2, '0')}</span><span><strong>{reflection.byline}</strong><small>{reflection.context}</small></span></div></article>)}</div>
      <div className="info-bottom-cta"><div><p className="eyebrow">YOUR TURN</p><h2>Make the first step your own.</h2></div><button type="button" className="button button-dark" onClick={() => onNewProject()}>Start with an idea <ArrowRight size={16} /></button></div>
    </>
  }

  if (view === 'faq') {
    return <>
      <PageHeading eyebrow="A few useful answers" title="Frequently asked questions." description="A quick guide to the IdeaVision Forge process and this website preview." />
      <section className="faq-layout"><div className="faq-aside"><span className="faq-icon"><CircleHelp size={22} /></span><h2>Still wondering about something?</h2><p>Send a note and tell us what would make the process clearer.</p><button type="button" className="text-action" onClick={() => onStageChange('contact')}>Go to Contact <ArrowRight size={15} /></button></div><div className="faq-list">{forgeFaqs.map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary><span>{item.question}</span><span className="faq-toggle" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
    </>
  }

  if (view === 'contact') {
    return <>
      <PageHeading eyebrow="We would like to hear from you" title="Let's start a conversation." description="Share a question, tell us what you are making, or let us know how IdeaVision Forge could be more helpful." />
      <div className="contact-layout"><section className="contact-copy"><span className="contact-symbol"><Mail size={21} /></span><p className="eyebrow">A NOTE TO THE FORGE</p><h2>Good ideas grow through conversation.</h2><p>Use the form to draft a question, share feedback, or talk about the creative process. We welcome beginners, curious makers, and people with a project already in motion.</p><div className="contact-promise"><CheckCircle2 size={17} /><span>Your message stays yours. This preview does not transmit or store contact details.</span></div></section><form className="contact-form" onSubmit={(event) => { event.preventDefault(); onContactSubmit() }}><p className="eyebrow">CONTACT FORM PREVIEW</p><label className="field-label">Your name<input name="name" autoComplete="name" required placeholder="How should we address you?" /></label><label className="field-label">Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label className="field-label">What is this about?<select name="topic"><option>Project question</option><option>Website feedback</option><option>Partnership idea</option><option>Something else</option></select></label><label className="field-label">Your message<textarea name="message" rows="5" required placeholder="A little context helps us understand…" /></label><p className="contact-notice">This preview form does not send messages yet. Connect a monitored inbox or form service before publishing.</p><button className="button button-primary" type="submit">Preview contact request <ArrowRight size={16} /></button></form></div>
    </>
  }

  return <>
    <PageHeading eyebrow="About IdeaVision Forge" title="An idea deserves a way forward." description="IdeaVision Forge is a creative studio for turning a thought, problem, or possibility into something practical and real." action={<button type="button" className="button button-primary" onClick={() => onNewProject()}><Plus size={16} /> Start with your idea</button>} />
    <section className="about-statement"><div className="about-monogram">IF<span>✳</span></div><div><p className="eyebrow">THE IDEA BEHIND THE FORGE</p><h2>You do not need to have it all figured out before you begin.</h2><p>Start with what you have. Learn what you need. Make a plan you can change. Create a first version, build it with care, and share the result. IdeaVision Forge keeps those steps connected in one workspace.</p></div></section>
    <div className="about-steps">{stages.map((stage, index) => <button className="about-step" type="button" key={stage.id} onClick={() => onStageChange(stage.id)}><span>{stage.number}</span><strong>{stage.name}</strong><small>{stage.short}</small>{index < stages.length - 1 && <ArrowRight size={14} />}</button>)}</div>
    <section className="about-audience"><div><p className="eyebrow">MADE FOR CURIOUS MAKERS</p><h2>From a personal project to a community idea.</h2></div><p>Build a website, app, business, book, game, product, brand, invention, presentation, educational resource, community project, or the thing only you can imagine. Begin anywhere; the next step is easier to see once you start.</p></section>
  </>
}

function Dashboard({ project, projects, onUpdate, onStageChange, onNewProject, onSelectProject, currentStage, nextStage }) {
  const totalDone = projects.filter((item) => item.progress === 100).length
  const milestonesDone = project.milestones.filter((item) => item.done).length
  const transformations = projects.filter((item) => ['quietcorners', 'fieldnotes'].includes(item.id))
  return (
    <>
      <PageHeading eyebrow="Your ideas, in motion" title="Turn Any Idea Into Something Real." description="Move from a first thought through six connected stages: Idea, Learn, Plan, Create, Build, and Final Result." action={<button className="button button-primary" type="button" onClick={() => onNewProject()}><Plus size={17} /> Start with your idea</button>} />
      <section className="welcome-strip" aria-label="IdeaVision Forge mission">
        <div className="welcome-mark" aria-hidden="true"><span>i</span><span>·</span><span>f</span></div>
        <p><strong>I.L.P.C.B.</strong> is your idea-to-impact journey: <span>Idea</span><i>→</i><span>Learn</span><i>→</i><span>Plan</span><i>→</i><span>Create</span><i>→</i><span>Build</span><i>→</i><span>Result</span></p>
        <button type="button" className="welcome-link" onClick={() => onStageChange('idea')}>Explore the process <ArrowUpRight size={15} /></button>
      </section>

      <section className="journey-panel">
        <div className="section-topline"><div><p className="eyebrow">THE JOURNEY</p><h2>Your progress, at a glance</h2></div><span className="project-status"><span /> IN PROGRESS</span></div>
        <Journey stageIndex={project.stageIndex} onSelect={(_stage, index) => onStageChange(stages[index].id)} />
        <div className="journey-footer"><span>Currently shaping <strong>{project.title}</strong></span><button className="text-action" type="button" onClick={() => onStageChange(currentStage.id)}>Open {currentStage.name}<ArrowRight size={16} /></button></div>
      </section>

      <div className="dashboard-grid">
        <section className="panel next-panel">
          <div className="section-topline"><div><p className="eyebrow">A GOOD NEXT STEP</p><h2>Keep the momentum</h2></div><span className="step-icon"><ArrowDownRight size={17} /></span></div>
          <div className="next-project"><span className="project-type-badge mint">{project.type}</span><h3>{project.title}</h3><p>{project.nextTask}</p></div>
          <div className="next-meta"><span><Clock3 size={15} /> {project.due}</span><span><Target size={15} /> {project.progress}% there</span></div>
          <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
          <button type="button" className="button button-dark full-button" onClick={() => onStageChange(currentStage.id)}>Pick up where you left off <ArrowRight size={16} /></button>
        </section>

        <section className="panel milestones-panel">
          <div className="section-topline"><div><p className="eyebrow">SMALL STEPS ADD UP</p><h2>Project milestones</h2></div><span className="milestone-count">{milestonesDone}<span> / {project.milestones.length}</span></span></div>
          <div className="milestone-list">
            {project.milestones.map((milestone, index) => <button className={`milestone-row ${milestone.done ? 'is-done' : ''}`} type="button" key={milestone.title} onClick={() => onUpdate({ milestones: project.milestones.map((entry, entryIndex) => entryIndex === index ? { ...entry, done: !entry.done } : entry) })}>
              {milestone.done ? <CheckCircle2 size={19} /> : <Circle size={19} />}<span>{milestone.title}</span><ChevronRight size={15} />
            </button>)}
          </div>
          <button type="button" className="text-action" onClick={() => onStageChange('plan')}>Open your roadmap <ArrowRight size={16} /></button>
        </section>

        <section className="panel projects-panel">
          <div className="section-topline"><div><p className="eyebrow">A FEW THINGS IN THE WORKS</p><h2>Your projects</h2></div><button type="button" className="icon-button" aria-label="Create project" onClick={() => onNewProject()}><Plus size={17} /></button></div>
          <div className="project-list">
            {projects.slice(0, 3).map((item) => <button className={`project-row ${item.id === project.id ? 'active-project' : ''}`} key={item.id} type="button" onClick={() => onSelectProject(item.id)}>
              <span className={`project-color ${typeColors[item.type] || 'peach'}`}><Sparkles size={16} /></span><span className="project-row-copy"><strong>{item.title}</strong><small>{stages[item.stageIndex]?.name} · {item.progress}% complete</small></span><span className="mini-progress"><i style={{ width: `${item.progress}%` }} /></span>
            </button>)}
          </div>
          <div className="project-footnote"><span>{totalDone} project{totalDone === 1 ? '' : 's'} finished so far</span><span className="footnote-star">✳</span></div>
        </section>

        <section className="learn-callout">
          <div className="learn-orbit" aria-hidden="true"><BookOpen size={22} /></div><div><p className="eyebrow">A LITTLE LEARNING GOES A LONG WAY</p><h2>What would help you move forward?</h2><p>Find a useful, bite-sized lesson picked for <strong>{project.title}</strong>.</p></div><button type="button" className="button button-outline" onClick={() => onStageChange('learn')}>Explore your learning path <ArrowRight size={16} /></button>
        </section>
      </div>
      <section className="home-extras">
        <div className="section-topline"><div><p className="eyebrow">FROM A FIRST THOUGHT TO A FINISHED THING</p><h2>Small ideas can travel a long way.</h2></div><button className="text-action" type="button" onClick={() => onStageChange('showcase')}>See the community showcase <ArrowRight size={16} /></button></div>
        <div className="transformation-grid">{transformations.map((item, index) => <button className="transformation-card" type="button" key={item.id} onClick={() => { onSelectProject(item.id); onStageChange('result') }}><span className={`transformation-index transform-${index}`}>0{index + 1}</span><span className="transformation-story"><span>THE FIRST THOUGHT</span><strong>{index === 0 ? 'Could the city use a softer place to pause?' : 'What if a walk could spark a little wonder?'}</strong></span><ArrowRight className="transform-arrow" size={17} /><span className="transformation-story transformation-outcome"><span>WHAT IT BECAME</span><strong>{item.title}</strong><small>{item.type}</small></span></button>)}</div>
        <div className="type-band"><div><p className="eyebrow">A STUDIO FOR ALL KINDS OF IDEAS</p><h2>What would you like to make?</h2></div><div className="type-ribbon">{creationTypes.map((type) => <button key={type} type="button" onClick={() => onNewProject('', type)}>{type}<Plus size={12} /></button>)}</div></div>
      </section>
      <p className="dashboard-footnote">{nextStage && `Next up in your journey: ${nextStage.name}.`} A good idea grows one thoughtful step at a time.</p>
    </>
  )
}

function StageHeader({ eyebrow, title, description, project, onStageChange }) {
  return <><PageHeading eyebrow={eyebrow} title={title} description={description} /><div className="stage-context"><Journey stageIndex={project.stageIndex} compact onSelect={(_stage, index) => onStageChange(stages[index].id)} /></div></>
}

function IdeaWorkspace({ project, onUpdate, onStageChange }) {
  const [draft, setDraft] = useState({ title: project.title, description: project.description, problem: project.problem, purpose: project.purpose, audience: project.audience, solution: project.solution, goal: project.goal || project.purpose || '', inspiration: project.inspiration || '', knowledge: project.knowledge || '', resources: project.resources || '', features: project.features || '' })
  const [saved, setSaved] = useState(false)
  const change = (key) => (event) => { setDraft({ ...draft, [key]: event.target.value }); setSaved(false) }
  const save = () => { onUpdate({ ...draft, purpose: draft.goal }); setSaved(true) }
  return <>
    <StageHeader eyebrow="01 / FIND THE THREAD" title="Start with what matters." description="A first thought is enough. Give it a shape, and let the next questions come into focus." project={project} onStageChange={onStageChange} />
    <div className="workbench-grid">
      <section className="panel editor-panel"><div className="section-topline"><div><p className="eyebrow">IDEA NOTES</p><h2>Tell us what you have in mind</h2></div><span className="editor-spark"><Lightbulb size={18} /></span></div>
        <label className="field-label">What are you calling it?<input value={draft.title} onChange={change('title')} placeholder="Give your idea a working title" /></label>
        <label className="field-label">Your idea, in a few words<textarea rows="3" value={draft.description} onChange={change('description')} placeholder="What do you imagine creating?" /></label>
        <div className="field-pair"><label className="field-label">What problem would it help solve?<textarea rows="3" value={draft.problem} onChange={change('problem')} placeholder="Who needs something to change?" /></label><label className="field-label">Who might it be for?<textarea rows="3" value={draft.audience} onChange={change('audience')} placeholder="Describe the people this could help" /></label></div>
        <label className="field-label">What would a useful solution look like?<textarea rows="3" value={draft.solution} onChange={change('solution')} placeholder="A small, practical first version could…" /></label>
        <div className="field-pair"><label className="field-label">What would you like to achieve?<textarea rows="2" value={draft.goal} onChange={change('goal')} placeholder="A result worth working toward" /></label><label className="field-label">What sparked this idea?<textarea rows="2" value={draft.inspiration} onChange={change('inspiration')} placeholder="A moment, question, or observation" /></label></div>
        <div className="field-pair"><label className="field-label">What do you already know?<textarea rows="2" value={draft.knowledge} onChange={change('knowledge')} placeholder="Experience, skills, or useful context" /></label><label className="field-label">What resources do you have?<textarea rows="2" value={draft.resources} onChange={change('resources')} placeholder="Time, tools, people, or materials" /></label></div>
        <label className="field-label">What should the first version include?<textarea rows="2" value={draft.features} onChange={change('features')} placeholder="A few useful details or features" /></label>
        <div className="form-footer"><span className="save-state">{saved && <><Check size={15} /> Idea notes saved</>}</span><button className="button button-primary" type="button" onClick={save}>Save idea notes <ArrowRight size={16} /></button></div>
      </section>
      <aside className="panel concept-panel"><p className="eyebrow">THE IDEA, TAKING SHAPE</p><div className="concept-title"><span className="concept-number">01</span><h2>{draft.title || 'Your idea, right here'}</h2></div><p className="concept-description">{draft.description || 'A small thought can become a starting point. Add a few notes and watch the outline appear here.'}</p><div className="concept-detail"><span>THE OPPORTUNITY</span><p>{draft.problem || 'What feels harder than it should for the people you want to help?'}</p></div><div className="concept-detail"><span>WHO IT COULD HELP</span><p>{draft.audience || 'The people who might recognize themselves in this idea.'}</p></div><div className="concept-detail"><span>A FIRST SOLUTION</span><p>{draft.solution || 'The simplest useful thing you could make to explore the idea.'}</p></div><div className="concept-detail"><span>THE GOAL</span><p>{draft.goal || 'Choose a useful result you can work toward.'}</p></div><div className="concept-detail"><span>FIRST-VERSION FEATURES</span><p>{draft.features || 'Start with one clear, useful thing the project should do.'}</p></div><div className="concept-detail"><span>A QUESTION TO TEST</span><p>{draft.problem ? `Ask someone who faces this problem whether your solution would help.` : 'Talk with one person who might use what you make.'}</p></div><div className="concept-detail"><span>YOUR NEXT STEP</span><p>{project.nextTask}</p></div><button type="button" className="text-action" onClick={() => onStageChange('learn')}>See what you could learn next <ArrowRight size={16} /></button></aside>
    </div>
  </>
}

function LearnWorkspace({ project, onUpdate, onStageChange }) {
  const completed = project.lessonProgress || []
  const toggle = (title) => onUpdate({ lessonProgress: completed.includes(title) ? completed.filter((entry) => entry !== title) : [...completed, title] })
  return <>
    <StageHeader eyebrow="02 / GET CURIOUS" title="Learn just enough to begin." description={`A learning path connected to ${project.title}, built around useful skills instead of busywork.`} project={project} onStageChange={onStageChange} />
    <section className="learning-overview"><div><p className="eyebrow">YOUR LEARNING TRAIL</p><h2>Good questions are a skill, too.</h2><p>Start with what you already know. Choose one topic that helps with the next project step.</p></div><div className="learning-progress"><strong>{completed.length}<span> / 6</span></strong><small>topics explored</small><div className="progress-track"><span style={{ width: `${Math.min(completed.length / 6 * 100, 100)}%` }} /></div></div></section>
    <div className="topic-strip">{topicNames.map((topic) => <span className={project.skills?.includes(topic) ? 'topic-active' : ''} key={topic}>{topic}</span>)}</div>
    <div className="lesson-grid">{learningTracks.map((lesson, index) => {
      const done = completed.includes(lesson.title)
      return <article className="lesson-card" key={lesson.title}><div className={`lesson-mark ${lesson.tone}`}><span>0{index + 1}</span><BookOpen size={19} /></div><div className="lesson-meta"><span>{lesson.category}</span><span><Clock3 size={13} /> {lesson.time}</span></div><h2>{lesson.title}</h2><p>{lesson.detail}</p><button type="button" className={`lesson-button ${done ? 'lesson-done' : ''}`} onClick={() => toggle(lesson.title)}>{done ? <><CheckCircle2 size={17} /> Completed</> : <>Mark as explored <ArrowRight size={16} /></>}</button></article>
    })}</div>
    <div className="stage-nudge"><div><span className="nudge-icon"><WandSparkles size={18} /></span><div><strong>A little knowledge is enough to start.</strong><p>Keep your curiosity; you can learn the rest as you go.</p></div></div><button className="button button-dark" type="button" onClick={() => onStageChange('plan')}>Make a practical plan <ArrowRight size={16} /></button></div>
  </>
}

function PlanWorkspace({ project, onUpdate, onStageChange }) {
  const toggle = (index) => onUpdate({ milestones: project.milestones.map((milestone, milestoneIndex) => milestoneIndex === index ? { ...milestone, done: !milestone.done } : milestone) })
  return <>
    <StageHeader eyebrow="03 / MAKE A MAP" title="A plan you can actually use." description="Break the big picture into clear milestones. Your roadmap can change as you learn." project={project} onStageChange={onStageChange} />
    <section className="plan-summary"><div><p className="eyebrow">PROJECT GOAL</p><h2>{project.purpose}</h2><span><Target size={15} /> For {project.audience}</span></div><div className="plan-summary-stat"><strong>{project.milestones.filter((item) => item.done).length}<span> / {project.milestones.length}</span></strong><small>milestones reached</small></div></section>
    <section className="roadmap-panel"><div className="section-topline"><div><p className="eyebrow">YOUR IDEA-TO-ACTION ROADMAP</p><h2>One thing at a time</h2></div><span className="roadmap-time"><Clock3 size={15} /> Flexible timeline</span></div><div className="roadmap-list">{project.milestones.map((milestone, index) => <div className={`roadmap-row ${milestone.done ? 'roadmap-done' : ''}`} key={milestone.title}><button className="roadmap-check" type="button" onClick={() => toggle(index)} aria-label={`${milestone.done ? 'Reopen' : 'Complete'} ${milestone.title}`}>{milestone.done ? <Check size={16} /> : index + 1}</button><div className="roadmap-copy"><span>{index === 0 ? 'GET GROUNDED' : index === project.milestones.length - 1 ? 'SHARE & REFLECT' : `MILESTONE 0${index + 1}`}</span><h3>{milestone.title}</h3><p>{index === 0 ? 'Get clear on who this will help and why.' : index === 1 ? 'Make a rough first pass; clarity comes from making.' : index === 2 ? 'Ask someone you trust to react to what you have.' : 'Take stock, share what you made, and decide what is next.'}</p></div><span className="roadmap-status">{milestone.done ? 'Done' : index === project.milestones.findIndex((item) => !item.done) ? 'Up next' : 'On the way'}</span></div>)}</div><div className="roadmap-bottom"><span>Plans are living documents. Adjust as you go.</span><button type="button" className="text-action" onClick={() => onStageChange('create')}>Start making something <ArrowRight size={16} /></button></div></section>
  </>
}

function CreateWorkspace({ project, onUpdate, onStageChange }) {
  const [note, setNote] = useState(project.creationNote || '')
  const [saved, setSaved] = useState(false)
  const tools = [
    { name: 'Shape the story', detail: 'Find the human thread that makes your idea matter.', icon: '01', tone: 'mint' },
    { name: 'Sketch a first version', detail: 'Rough is welcome. Make the shape visible on paper.', icon: '02', tone: 'peach' },
    { name: 'Name the feeling', detail: 'Decide what someone should feel when they meet your work.', icon: '03', tone: 'blue' },
  ]
  return <>
    <StageHeader eyebrow="04 / MAKE A FIRST VERSION" title="This is where it gets tangible." description={`Shape the creative building blocks for ${project.title}. Start rough. Make it yours.`} project={project} onStageChange={onStageChange} />
    <div className="creation-grid"><section className="creation-tools">{tools.map((tool) => <article className="creation-tool" key={tool.name}><span className={`creation-tool-index ${tool.tone}`}>{tool.icon}</span><div><p className="eyebrow">A SMALL CREATIVE EXERCISE</p><h2>{tool.name}</h2><p>{tool.detail}</p></div><ArrowUpRight size={17} /></article>)}<div className="creation-footnote"><Sparkles size={16} /><span>Your first version is an invitation to learn, not a promise to get everything right.</span></div></section>
      <section className="creation-canvas"><div className="canvas-toolbar"><span><span className="canvas-dot" /> YOUR WORKING CANVAS</span><span>{project.type}</span></div><div className="canvas-body"><p className="eyebrow">THE THING I WANT TO MAKE</p><h2>{project.title}</h2><p className="canvas-prompt">What is the part of this project you cannot stop thinking about?</p><label className="sr-only" htmlFor="creation-note">Your creative notes</label><textarea id="creation-note" rows="6" value={note} onChange={(event) => { setNote(event.target.value); setSaved(false) }} placeholder="A phrase, a sketch description, the first paragraph, a color, a question…"/><div className="canvas-footer"><span>{saved && <><Check size={14} /> Notes saved</>}</span><button className="button button-dark" type="button" onClick={() => { onUpdate({ creationNote: note }); setSaved(true) }}>Save a first thought <Check size={15} /></button></div></div></section></div>
    <div className="stage-nudge"><div><span className="nudge-icon"><ArrowDownRight size={18} /></span><div><strong>Something real can start small.</strong><p>When your first version feels ready, take it into the build stage.</p></div></div><button className="button button-dark" type="button" onClick={() => onStageChange('build')}>Move into the build <ArrowRight size={16} /></button></div>
  </>
}

function BuildWorkspace({ project, onUpdate, onStageChange }) {
  const defaultItems = ['Make a usable first version', 'Ask someone to try it', 'Make one improvement', 'Get ready to share it']
  const checklist = project.buildChecklist || defaultItems.map((title, index) => ({ title, done: project.stageIndex > 4 && index < 4 }))
  const setChecklist = (index) => onUpdate({ buildChecklist: checklist.map((item, itemIndex) => itemIndex === index ? { ...item, done: !item.done } : item) })
  const completion = checklist.filter((item) => item.done).length
  return <>
    <StageHeader eyebrow="05 / PUT IT TO WORK" title="Make it useful in the real world." description="A plan becomes a project when you try it with real people. Build, test, improve, and repeat." project={project} onStageChange={onStageChange} />
    <section className="build-banner"><div><p className="eyebrow">BUILD STATUS</p><h2>{project.title}</h2><p>{project.description}</p></div><div className="build-ring" style={{ '--progress': `${completion / checklist.length * 100}%` }}><strong>{Math.round(completion / checklist.length * 100)}<small>%</small></strong><span>READY</span></div></section>
    <div className="build-grid"><section className="panel build-checklist"><div className="section-topline"><div><p className="eyebrow">A BUILD CHECKLIST</p><h2>Bring it into the world</h2></div><span className="milestone-count">{completion}<span> / {checklist.length}</span></span></div><div className="build-list">{checklist.map((item, index) => <button type="button" key={item.title} className={`build-item ${item.done ? 'is-done' : ''}`} onClick={() => setChecklist(index)}>{item.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}<span><strong>{item.title}</strong><small>{['Keep the first version focused on the main thing.', 'Give someone a real chance to react to it.', 'Use what you learned to make one change.', 'A small, honest launch counts.'][index]}</small></span><span className="build-step">0{index + 1}</span></button>)}</div></section><aside className="build-aside"><div className="build-aside-icon"><Compass size={21} /></div><p className="eyebrow">TOOLS & RESOURCES</p><h2>Use what you have.</h2><p>You do not need the perfect tools to get a useful first version into someone else’s hands.</p><div className="resource-pills">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><button className="text-action" type="button" onClick={() => onStageChange('learn')}>Explore helpful skills <ArrowRight size={16} /></button></aside></div>
    <div className="stage-nudge"><div><span className="nudge-icon"><Sparkles size={18} /></span><div><strong>{completion === checklist.length ? 'This is the moment you made it real.' : 'Finished does not have to mean perfect.'}</strong><p>Mark your milestones, reflect on the journey, and share what you made.</p></div></div><button className="button button-dark" type="button" onClick={() => { if (completion === checklist.length) onUpdate({ progress: 100, stageIndex: 5, stage: 'result' }); onStageChange('result') }}>See your final result <ArrowRight size={16} /></button></div>
  </>
}

function ResultWorkspace({ project, onStageChange }) {
  const done = project.progress === 100
  return <>
    <StageHeader eyebrow="06 / LOOK WHAT YOU MADE" title={done ? 'You made it real.' : 'Your story is taking shape.'} description={done ? 'A clear idea became a real thing. Take a moment to see how far you have come.' : 'Every meaningful project is a work in progress until you decide it is ready to share.'} project={project} onStageChange={onStageChange} />
    <section className="result-hero"><div className="result-overline"><span className="result-spark"><Sparkles size={17} /></span><span>{done ? 'A FINISHED PROJECT' : 'YOUR CURRENT PROJECT'}</span><span className="result-date">{done ? 'READY TO SHARE' : `${project.progress}% COMPLETE`}</span></div><h2>{project.title}</h2><p>{project.description}</p><div className="result-stamp">{done ? 'MADE IT REAL' : 'IN THE MAKING'}<ArrowUpRight size={16} /></div></section>
    <div className="before-after"><article><span className="before-label">THE FIRST THOUGHT</span><h3>“I have an idea…”</h3><p>{project.problem}</p></article><span className="transformation-arrow"><ArrowRight size={21} /></span><article className="after-card"><span className="before-label">WHAT IT BECAME</span><h3>{project.title}</h3><p>{project.solution}</p></article></div>
    <div className="result-details-grid"><section className="panel result-journey"><div className="section-topline"><div><p className="eyebrow">THE WAY HERE</p><h2>Small steps, real progress</h2></div></div><Journey stageIndex={project.stageIndex} compact onSelect={(_stage, index) => onStageChange(stages[index].id)} /><div className="result-milestones">{project.milestones.filter((milestone) => milestone.done).map((milestone) => <span key={milestone.title}><CheckCircle2 size={15} />{milestone.title}</span>)}</div></section><section className="panel result-skills"><p className="eyebrow">THINGS YOU KNOW NOW</p><h2>Skills along the way</h2><div className="result-skill-pills">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><p>Every project teaches you something the next one will need.</p></section></div>
    {!done && <div className="stage-nudge"><div><span className="nudge-icon"><CheckCircle2 size={18} /></span><div><strong>Your work deserves to be seen.</strong><p>Complete the build checklist and make this a finished project.</p></div></div><button type="button" className="button button-dark" onClick={() => onStageChange('build')}>Finish the build <ArrowRight size={16} /></button></div>}
    <div className="result-footnote"><span>YOUR IDEA, YOUR WORK, YOUR STORY.</span><button type="button" className="text-action" onClick={() => navigator.clipboard?.writeText(`${project.title} — ${project.description}`).then(() => window.dispatchEvent(new CustomEvent('ivf-toast', { detail: 'Project details copied to clipboard.' })))}>Share project <ExternalLink size={15} /></button></div>
  </>
}
