export const stages = [
  { id: 'idea', number: '01', name: 'Idea', short: 'Shape the spark' },
  { id: 'learn', number: '02', name: 'Learn', short: 'Gather what you need' },
  { id: 'plan', number: '03', name: 'Plan', short: 'Map the way forward' },
  { id: 'create', number: '04', name: 'Create', short: 'Make the first version' },
  { id: 'build', number: '05', name: 'Build', short: 'Bring it to life' },
  { id: 'result', number: '06', name: 'Final result', short: 'Share what you made' },
]

export const starterProjects = []

export const navGroups = [
  {
    label: 'Your studio',
    items: [
      { id: 'dashboard', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'idea', label: 'Idea workshop', icon: 'Lightbulb' },
      { id: 'learn', label: 'Learn', icon: 'BookOpen' },
      { id: 'plan', label: 'Plan', icon: 'Map' },
      { id: 'create', label: 'Create', icon: 'PenTool' },
      { id: 'build', label: 'Build', icon: 'Hammer' },
    ],
  },
  {
    label: 'Out in the world',
    items: [
      { id: 'result', label: 'Final result', icon: 'Sparkles' },
      { id: 'explore', label: 'Idea explorer', icon: 'Compass' },
      { id: 'showcase', label: 'Community showcase', icon: 'PanelsTopLeft' },
      { id: 'pricing', label: 'Request a quote', icon: 'MessageCircle' },
    ],
  },
  {
    label: 'About & support',
    items: [
      { id: 'about', label: 'About the Forge', icon: 'Info' },
      { id: 'services', label: 'Services', icon: 'Layers3' },
      { id: 'testimonials', label: 'Testimonials', icon: 'Quote' },
      { id: 'faq', label: 'FAQ', icon: 'CircleHelp' },
      { id: 'contact', label: 'Contact', icon: 'Mail' },
      { id: 'privacy', label: 'Privacy', icon: 'ShieldCheck' },
      { id: 'terms', label: 'Terms', icon: 'Scale' },
    ],
  },
]

export const forgeServices = [
  { title: 'Idea development', detail: 'Turn an early thought into a clear problem, audience, goal, and first direction.', stage: 'IDEA', number: '01' },
  { title: 'Project learning paths', detail: 'Find useful skills and beginner-friendly lessons connected to what you want to make.', stage: 'LEARN', number: '02' },
  { title: 'Practical roadmaps', detail: 'Break the work into milestones, next steps, and manageable progress.', stage: 'PLAN', number: '03' },
  { title: 'Creative workspace', detail: 'Develop the writing, concepts, designs, and early versions your project needs.', stage: 'CREATE', number: '04' },
  { title: 'Build and test', detail: 'Work through a build checklist, try your first version, and make improvements.', stage: 'BUILD', number: '05' },
  { title: 'Project showcase', detail: 'Capture the journey, celebrate the finished work, and share the result.', stage: 'RESULT', number: '06' },
]

export const websiteStages = [
  { id: 'discovery', stage: '01', title: 'Discovery & scope', detail: 'Agree project goals, audience, page count, and delivery scope.' },
  { id: 'research', stage: '02', title: 'Research & sitemap', detail: 'Map the pages, content needs, and visitor journey.' },
  { id: 'ux', stage: '03', title: 'UX & wireframes', detail: 'Plan responsive layouts before visual design begins.' },
  { id: 'design', stage: '04', title: 'Visual design', detail: 'Approve the visual direction and page designs.' },
  { id: 'build', stage: '05', title: 'Website build', detail: 'Develop the agreed website pages and interactions.' },
  { id: 'launch', stage: '06', title: 'Testing & handover', detail: 'Review the finished scope, test devices, and arrange handover.' },
]

export const forgeFaqs = [
  { question: 'What is IdeaVision Forge?', answer: 'IdeaVision Forge is a guided creative workspace that helps you move from a first thought to a practical project and a finished result.' },
  { question: 'What does I.L.P.C.B. stand for?', answer: 'Idea, Learn, Plan, Create, Build, and Final Result. Each stage connects to the next so your research, decisions, and progress stay with the project.' },
  { question: 'What kinds of projects can I work on?', answer: 'Websites, apps, businesses, books, games, products, brands, inventions, presentations, educational work, community projects, and more.' },
  { question: 'Do I need experience to get started?', answer: 'No. Start with a rough idea. The learning area suggests useful beginner-friendly topics, and you can build skills as the project develops.' },
  { question: 'Does the roadmap have to be followed exactly?', answer: 'No. Milestones are a flexible guide. Update them as you learn, change direction, or discover a better next step.' },
  { question: 'Where is my project information saved?', answer: 'Without account setup, projects stay in this browser. When Supabase is configured, signed-in projects are stored in that account. Browser-only projects are not automatically imported.' },
  { question: 'How do I get a website quote?', answer: 'Contact IdeaVision Forge with your requirements, page count, and preferred features. The website does not publish a confirmed fee schedule or accept online payments.' },
]

export const inspirationIdeas = [
  { title: 'A little free library map', type: 'Community', concept: 'Help neighbors discover book-sharing shelves nearby.', stage: 'Start with the gaps in your neighborhood, then map one useful block.' },
  { title: 'A gentle morning routine', type: 'Digital product', concept: 'Make small daily rituals easier to remember and enjoy.', stage: 'Notice the parts of your morning you want to make more intentional.' },
  { title: 'Stories from the old arcade', type: 'Creative project', concept: 'Collect the memories of a beloved local gathering place.', stage: 'Ask three people what they remember before you decide the format.' },
  { title: 'A balcony garden guide', type: 'Educational project', concept: 'Help first-time growers get more from a small outdoor space.', stage: 'Find out what grows well on the balconies closest to yours.' },
  { title: 'The one-pan supper club', type: 'Small business', concept: 'Bring neighbors together around unfussy, shared meals.', stage: 'Invite a few people to describe what would make them show up.' },
  { title: 'A pocket-sized sky atlas', type: 'Book', concept: 'Make star watching approachable for curious city kids.', stage: 'Pick one sky visible above your nearest familiar place.' },
]

export const learningTracks = [
  { category: 'Research', title: 'Ask better questions', detail: 'Write down three questions to ask someone affected by the problem.', tone: 'mint' },
  { category: 'Design', title: 'Sketch the simplest version', detail: 'Draw the smallest useful version of the idea before you build it.', tone: 'blue' },
  { category: 'Communication', title: 'Explain the idea clearly', detail: 'Describe who the project helps and what it changes in two sentences.', tone: 'peach' },
]

export const creationTypes = ['Website', 'App', 'Small business', 'Book', 'Book or story', 'Game', 'Product', 'Digital product', 'Brand', 'Invention', 'Presentation', 'Educational project', 'Community', 'Community project', 'Creative project', 'Something else']
