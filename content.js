/* EDIT THIS ONE FILE to add photos, research links, videos and profile URLs.
   Leave values as empty strings ('') until you have real public links.
   Upload your images into /photos and set their paths below.
   Video embeds accept YouTube or Vimeo URLs; no platform is required today. */
const SITE_CONTENT = {
  portrait: 'photos/Alexis-jackson_headshot.webp', // Example: 'photos/aj-fieldwork.jpg'
  cv: '',       // Example: 'assets/AJ_Public_CV.pdf' (remove address/personal email first)
  paper: '',    // URL to actual Ecological Indicators manuscript/preprint
  dataset: '',  // URL to public Bradford dataset on HydroShare
  linkedin: '', // Example: 'https://www.linkedin.com/in/your-profile/'
  github: 'https://github.com/ajthewetlandbae', // change if your username differs
  email: '', // OPTIONAL: professional email, or leave blank
  
gallery: [
  // FIELDWORK
  {
    category: 'field',
    heading: 'NWCA Fieldwork',
    caption: 'Wetland research and field sampling with the National Wetland Condition Assessment.',
    image: 'photos/AJ_NWCA_1.JPG',
    alt: 'AJ conducting wetland fieldwork'
  },
  {
    category: 'field',
    heading: 'More from the NWCA',
    caption: 'Behind the scenes of wetland field research.',
    image: 'photos/Aj_NWCA_2.JPG',
    alt: 'AJ in the field during wetland research'
  },
  {
    category: 'field',
    heading: 'Sweetwater Wetlands',
    caption: 'Exploring wetland ecosystems at Sweetwater Wetlands.',
    image: 'photos/AJ_Sweetwater.JPG',
    alt: 'AJ at Sweetwater Wetlands'
  },
  {
    category: 'field',
    heading: 'Salt Marsh Fieldwork',
    caption: 'Field experiences in coastal wetland ecosystems.',
    image: 'photos/AJ_saltmarsh.jpg',
    alt: 'AJ in a salt marsh'
  },
  {
    category: 'field',
    heading: 'Coastal Wetlands',
    caption: 'More moments from the salt marsh.',
    image: 'photos/aj_saltmarsh2.JPG',
    alt: 'AJ conducting coastal wetland fieldwork'
  },
  {
    category: 'field',
    heading: 'Wetland Fieldwork',
    caption: 'Exploring wetland environments and their unique characteristics.',
    image: 'photos/WetlandPhoto (1).jpg',
    alt: 'Wetland fieldwork photograph'
  },
  {
    category: 'field',
    heading: 'Wetland Research',
    caption: 'A closer look at wetland ecosystems.',
    image: 'photos/WetlandPhoto (2).jpg',
    alt: 'Wetland research photograph'
  },

  // CONFERENCES
  {
    category: 'conference',
    heading: 'Research Conferences',
    caption: 'Presenting research and connecting with scientists.',
    image: 'photos/Conferencephoto.jpg',
    alt: 'AJ at a research conference'
  },

  // EDUCATION AND OUTREACH
  {
    category: 'outreach',
    heading: 'Rollins College Panel',
    caption: 'Sharing experiences and perspectives through a science outreach panel at Rollins College.',
    image: 'photos/rollinscollege.jpg',
    alt: 'AJ participating in a Rollins College panel'
  },
  {
    category: 'outreach',
    heading: 'CPET Outreach',
    caption: 'Supporting science education and engaging with students.',
    image: 'photos/CPETPhoto.jpg',
    alt: 'AJ participating in STEM outreach'
  },
  {
    category: 'outreach',
    heading: 'Water Institute Ambassador',
    caption: 'Connecting with others through the University of Florida Water Institute.',
    image: 'photos/Wlambassador.jpg',
    alt: 'AJ at a Water Institute event'
  },
  {
    category: 'outreach',
    heading: 'Science Communication',
    caption: 'Sharing science and connecting with different audiences.',
    image: 'photos/sciencecomphoto.png',
    alt: 'AJ participating in science communication'
  }
],
  videos: [
    { heading:'Wetland Wisdom Lectures', label:'CORE LECTURES', description:'Structured lessons on wetland foundations, hydrology, soils, and biogeochemistry.', video:'' },
    { heading:'Field Fridays', label:'FIELD VIDEOS', description:'Field-based videos showing wetland science and research in practice.', video:'' },
    { heading:'More to Explore', label:'ADDITIONAL VIDEOS', description:'Other videos, demonstrations, and educational resources.', video:'' }
  ],
  
media: [
  {
    title: 'From the EPA to GNX: Meet Alexis AJ Jackson',
    detail: '2025 · University of Florida Engineering · Graduate student profile',
    url: 'https://www.eng.ufl.edu/news/engineering-education/graduate-student-profiles/from-the-epa-to-gnx/'
  },
  {
    title: 'Heartland LIVING Magazine',
    detail: '2021 · Conservation portrait by Dustin Angell · Archbold Biological Station',
    url: 'https://issuu.com/heartlandlivingmagazine/docs/hl_aug_sep_2021/70'
  },
  {
    title: 'Wetland Science with Kids: Braving the Swamp',
    detail: '2025 · UF Center for Coastal Solutions · Girls Do Science outreach',
    url: 'https://ccs.eng.ufl.edu/why-brave-the-swamp-graduate-students-share-the-thrill-of-wetland-science-with-kids/'
  },
  {
    title: 'Helping Future Data and Environmental Scientists Build New Skills',
    detail: 'University of Florida · High school STEM education and outreach',
    url: 'https://ccs.eng.ufl.edu/ph-d-students-help-future-data-and-environmental-scientists-build-new-skills/'
  },
  {
    title: 'Virginia Tech Undergraduate Research Recognition',
    detail: '2020 · Undergraduate research award and conference',
    url: 'https://news.vt.edu/articles/2020/06/undergradresearch-dennisdeanresearchconference2020.html'
  },
  {
    title: 'Recorded Dissertation Research Seminar',
    detail: 'Dissertation presentation for Wetland Seminar· YouTube',
    url: 'https://www.youtube.com/watch?v=8K9th4UXb8g'
  },
  {
    title: 'Undergraduate Research Video',
    detail: 'Virginia Tech research · YouTube',
    url: 'https://www.youtube.com/watch?v=0GBfu-drgz0'
  },
  {
    title: 'Florida Ecology Intern: AJ Jackson',
    detail: 'Archbold Biological Station · Video by Dustin Angell',
    url: 'https://www.youtube.com/watch?v=TirxJKPK08s'
  },
  {
    title: 'H.T. Odum Center for Wetlands: Magazine Feature',
    detail: '2021 · University of Florida · Conservation and research',
    url: 'https://cfw.essie.ufl.edu/2021/08/11/masters-student-alexis-aj-jackson-featured-in-latest-issue-of-heartland-living-magazine/'
  }
  ]
};
