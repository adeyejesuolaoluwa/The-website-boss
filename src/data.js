export const stages = [
  { id: 'idea', number: '01', name: 'Idea', short: 'Shape the spark' },
  { id: 'learn', number: '02', name: 'Learn', short: 'Gather what you need' },
  { id: 'plan', number: '03', name: 'Plan', short: 'Map the way forward' },
  { id: 'create', number: '04', name: 'Create', short: 'Make the first version' },
  { id: 'build', number: '05', name: 'Build', short: 'Bring it to life' },
  { id: 'result', number: '06', name: 'Final result', short: 'Share what you made' },
]

export const starterProjects = [
  {
    id: 'pantry',
    title: 'The Neighborhood Pantry',
    type: 'Community project',
    description: 'A small, welcoming food-sharing network that makes it easier for neighbors to give and receive what they need.',
    purpose: 'Reduce food waste and make everyday essentials easier to access, one block at a time.',
    audience: 'Neighbors, local growers, and community organizers',
    problem: 'Good food goes unused while neighbors nearby may need a little extra support.',
    solution: 'A simple map of trusted neighborhood pantries, donation shelves, and volunteer pickup times.',
    progress: 62,
    stage: 'build',
    stageIndex: 4,
    category: 'Community',
    nextTask: 'Test the pickup flow with three neighbors',
    due: 'Today',
    skills: ['Research', 'Community building', 'Design'],
    milestones: [
      { title: 'Listen to the neighborhood', done: true },
      { title: 'Sketch the pantry directory', done: true },
      { title: 'Gather local partners', done: true },
      { title: 'Test the first pickup flow', done: false },
    ],
    createdAt: '2026-09-12',
  },
  {
    id: 'fieldnotes',
    title: 'Field Notes for Curious Kids',
    type: 'Educational project',
    description: 'A pocket-sized collection of playful outdoor prompts that turns an ordinary walk into a tiny nature expedition.',
    purpose: 'Help young explorers notice more of the natural world close to home.',
    audience: 'Curious kids ages 7–11 and the grown-ups walking alongside them',
    problem: 'Outdoor learning can feel like a lesson instead of an invitation to look closer.',
    solution: 'A beautifully illustrated field journal with quick, sensory-led activities.',
    progress: 34,
    stage: 'create',
    stageIndex: 3,
    category: 'Education',
    nextTask: 'Write five “look a little closer” prompts',
    due: 'Tomorrow',
    skills: ['Writing', 'Illustration', 'Learning design'],
    milestones: [
      { title: 'Choose a curious point of view', done: true },
      { title: 'Explore a few local trails', done: true },
      { title: 'Write the first set of prompts', done: false },
      { title: 'Share a draft with young explorers', done: false },
    ],
    createdAt: '2026-09-20',
  },
  {
    id: 'quietcorners',
    title: 'Quiet Corners',
    type: 'Digital product',
    description: 'A map of calm, comfortable places to take a break during a busy day in the city.',
    purpose: 'Make room for a small reset between the busy parts of the day.',
    audience: 'City dwellers looking for a softer place to pause',
    problem: 'It is surprisingly hard to find a quiet seat when you need one.',
    solution: 'A community-sourced guide to welcoming, low-noise spaces and their best visiting hours.',
    progress: 100,
    stage: 'result',
    stageIndex: 5,
    category: 'Digital product',
    nextTask: 'Celebrate your first finished project',
    due: 'Complete',
    skills: ['Research', 'Mapping', 'Product design'],
    milestones: [
      { title: 'Talk with people who need a pause', done: true },
      { title: 'Map welcoming quiet spots', done: true },
      { title: 'Build the first neighborhood guide', done: true },
      { title: 'Share Quiet Corners with the city', done: true },
    ],
    createdAt: '2026-08-24',
  },
]

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

export const forgeFaqs = [
  { question: 'What is IdeaVision Forge?', answer: 'IdeaVision Forge is a guided creative workspace that helps you move from a first thought to a practical project and a finished result.' },
  { question: 'What does I.L.P.C.B. stand for?', answer: 'Idea, Learn, Plan, Create, Build, and Final Result. Each stage connects to the next so your research, decisions, and progress stay with the project.' },
  { question: 'What kinds of projects can I work on?', answer: 'Websites, apps, businesses, books, games, products, brands, inventions, presentations, educational work, community projects, and more.' },
  { question: 'Do I need experience to get started?', answer: 'No. Start with a rough idea. The learning area suggests useful beginner-friendly topics, and you can build skills as the project develops.' },
  { question: 'Does the roadmap have to be followed exactly?', answer: 'No. Milestones are a flexible guide. Update them as you learn, change direction, or discover a better next step.' },
  { question: 'Where is my project information saved?', answer: 'In this preview, projects are stored in your browser on this device. There is no account sync or cloud storage yet.' },
  { question: 'Can I share a finished project?', answer: 'The Final Result page includes a share action for copying a project summary. The showcase currently uses example projects.' },
]

export const makerReflections = [
  { quote: 'I had plenty of enthusiasm and no obvious place to begin. Breaking the idea into one small next step made starting feel possible.', byline: 'Example maker reflection', context: 'Finding a first step' },
  { quote: 'The roadmap gave me direction without making the project feel fixed. I could change the plan as I learned more.', byline: 'Example maker reflection', context: 'Learning while building' },
  { quote: 'Seeing the first thought next to the finished project made the progress feel real. I could finally say: I made it.', byline: 'Example maker reflection', context: 'Sharing the result' },
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
  { category: 'Research', title: 'Ask better questions', detail: 'Short interviews that turn assumptions into useful insight.', time: '12 min', tone: 'mint' },
  { category: 'Design', title: 'Sketch the simplest version', detail: 'Explore an idea on paper before committing to a build.', time: '18 min', tone: 'blue' },
  { category: 'Community', title: 'Find your first collaborators', detail: 'Build a small circle of people who care about the same problem.', time: '9 min', tone: 'peach' },
]

export const creationTypes = ['Website', 'App', 'Small business', 'Book', 'Book or story', 'Game', 'Product', 'Digital product', 'Brand', 'Invention', 'Presentation', 'Educational project', 'Community', 'Community project', 'Creative project', 'Something else']
