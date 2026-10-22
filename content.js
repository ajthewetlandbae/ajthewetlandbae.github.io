/* EDIT THIS ONE FILE to add photos, research links, videos and profile URLs.
   Leave values as empty strings ('') until you have real public links.
   Upload your images into /photos and set their paths below.
   Video embeds accept YouTube or Vimeo URLs; no platform is required today. */
const SITE_CONTENT = {
  portrait: '', // Example: 'photos/aj-fieldwork.jpg'
  cv: '',       // Example: 'assets/AJ_Public_CV.pdf' (remove address/personal email first)
  paper: '',    // URL to actual Ecological Indicators manuscript/preprint
  dataset: '',  // URL to public Bradford dataset on HydroShare
  linkedin: '', // Example: 'https://www.linkedin.com/in/your-profile/'
  github: 'https://github.com/ajthewetlandbae', // change if your username differs
  email: '', // OPTIONAL: professional email, or leave blank
  gallery: [
    { category:'field', heading:'In the Field', caption:'Wetland sampling, hydrologic monitoring, and behind-the-scenes research.', image:'', alt:'Fieldwork photograph' },
    { category:'conference', heading:'Conferences & Research', caption:'Presentations, professional connections, and sharing scientific findings.', image:'', alt:'Conference photograph' },
    { category:'outreach', heading:'Education & Outreach', caption:'Engaging students and communities through hands-on science and conversations.', image:'', alt:'Science outreach photograph' },
    { category:'beyond', heading:'Beyond the Field', caption:'Museum experiences, representation in science, and other moments worth sharing.', image:'', alt:'Museum or community photograph' }
  ],
  videos: [
    { heading:'Wetland Wisdom Lectures', label:'CORE LECTURES', description:'Structured lessons on wetland foundations, hydrology, soils, and biogeochemistry.', video:'' },
    { heading:'Field Fridays', label:'FIELD VIDEOS', description:'Field-based videos showing wetland science and research in practice.', video:'' },
    { heading:'More to Explore', label:'ADDITIONAL VIDEOS', description:'Other videos, demonstrations, and educational resources.', video:'' }
  ],
  media: [
    { title:'H.T. Odum articles', detail:'Articles and features', url:'' },
    { title:'ESSIE article or profile', detail:'University feature', url:'' },
    { title:'Magazine feature', detail:'Interview or profile', url:'' },
    { title:'Recorded research seminar', detail:'Seminar presentation', url:'' },
    { title:'Interview with Mackenzie', detail:'Future feature · not yet published', url:'' }
  ]
};
