// ─── Shared Data Store (localStorage with Initial Seed Data) ────────────────
// Public pages read live data from here; the Admin Dashboard manages it.

import imgEmpower from "@/assets/story/empowering-youth.webp";
import imgRebuild from "@/assets/story/rebuilding-families.webp";
import imgClassroom from "@/assets/story/children-learning.webp";
import imgCommunity from "@/assets/story/changing-communities.webp";
import imgChildren from "@/assets/story/children-community.webp";
import imgCentre1 from "@/assets/20230725_153032.webp";
import imgCentre2 from "@/assets/IMG_20240925_171410_201.webp";
import imgCentre3 from "@/assets/IMG_20251015_124252_441.webp";
import imgCentre4 from "@/assets/IMG_20251028_130558_922.webp";
import imgCentre5 from "@/assets/IMG_20250822_113410_394.webp";

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  author?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: string;
  date: string;
  featured?: boolean;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  type: string;         // "Full-time" | "Part-time" | "Volunteer" | "Paid Volunteer" | "Internship"
  department: string;
  location: string;
  deadline: string;
  description: string;
  responsibilities: string; // Newline separated
  requirements: string;     // Newline separated
  howToApply: string;
  status: "active" | "closed";
  postedDate: string;
}

// ─── Default Seed Data ───────────────────────────────────────────────────────

export const DEFAULT_STORIES: Story[] = [
  {
    id: "empowering-youth",
    title: "Empowering Youth Through Education and Skills",
    category: "Rehabilitation",
    excerpt:
      "James arrived at NLMRC at 15, addicted to glue and with no schooling. Two years later he completed his Kenya Certificate and started a tailoring apprenticeship.",
    content: `When James first walked through the gates of the Katani Rehabilitation Centre in 2022, his eyes were guarded and his hands shook with withdrawal. He had spent three years living on the streets of Nairobi, surviving day by day through rag-picking and numbed by industrial glue.

At NLMRC, our interdisciplinary team of social workers, addiction counsellors, and nurses developed an individualised six-month rehabilitation plan. Through structured group therapy, nutritional rehabilitation, and unconditional spiritual mentorship, James began to rediscover hope.

In month three, James entered our accelerated literacy and numeracy classes. He showed an exceptional aptitude for precision and patterns. When introduced to our vocational tailoring and garment making workshop, he blossomed.

Today, James has completed his primary certification and has begun an advanced tailoring apprenticeship in Machakos. 'Before Mwangaza, I thought the street was my only destiny,' James shares. 'Now I know I have hands that can build a real future.'`,
    image: imgEmpower,
    readTime: "4 min read",
    date: "October 2024",
    author: "NLMRC Social Work Team",
    featured: true,
  },
  {
    id: "rebuilding-families",
    title: "Rebuilding Families, One Reunion at a Time",
    category: "Reintegration",
    excerpt:
      "After three years on the streets, David was reintegrated with his mother in Machakos. Our aftercare team still visits monthly to ensure the family stays strong.",
    content: `Street life fractures families in ways that often seem impossible to repair. When David was rescued from Nairobi's central business district during an outreach patrol, his file showed that severe domestic discord had driven him away from home at age 12.

Reintegration at NLMRC is not a single event; it is a meticulous journey. While David underwent trauma counselling and substance detox at Katani, our field social workers conducted home tracing across Machakos County to locate his mother, Mama Mwende.

We facilitated mediated reconciliation sessions, addressing the root causes of David's departure. We also supported Mama Mwende with livelihood empowerment training. Today, David has been reunited with his family for over fourteen months, attending a local secondary school and thriving under the watchful care of our aftercare monitoring program.`,
    image: imgRebuild,
    readTime: "3 min read",
    date: "September 2024",
    author: "Reintegration Department",
    featured: true,
  },
  {
    id: "children-learning",
    title: "Community Classrooms That Keep Kids Off the Streets",
    category: "Prevention",
    excerpt:
      "Our prevention programme in Kajiado and informal settlements sets up safe after-school hubs serving over 120 children, keeping vulnerable youth engaged and safe.",
    content: `The most humane response to child homelessness is prevention. At NLMRC, we know that poverty, school dropout, and lack of safe spaces are the principal catalysts driving children onto urban streets.

Through our community empowerment pillar, we partnered with local Nyumba Kumi elders, churches, and school administrations to establish after-school learning and feeding hubs. Children at risk of dropout receive remedial tuition, homework assistance, hot nutritious meals, and holistic mentorship.

By tackling early vulnerabilities before children take to the streets, we have seen school attendance rates rise by 85% in target informal settlements, proving that prevention is both transformative and sustainable.`,
    image: imgClassroom,
    readTime: "5 min read",
    date: "August 2024",
    author: "Prevention & Outreach Team",
    featured: false,
  },
  {
    id: "changing-communities",
    title: "From Street Stigma to Community Champions",
    category: "Community",
    excerpt:
      "How community barazas and Nyumba Kumi partnerships are shifting mindsets from hostility toward compassionate protection for street-connected children.",
    content: `For decades, street-connected youth were viewed through the lens of criminality rather than vulnerability. NLMRC has been at the forefront of changing this narrative across Nairobi, Machakos, and Kajiado.

Through community dialogues, police sensitization workshops, and local barazas, we educate traders and law enforcement officers on trauma-informed care and child rights. Former beneficiaries who once faced arrest and eviction now return as peer educators, speaking candidly about recovery and the power of giving young people a second chance.`,
    image: imgCommunity,
    readTime: "4 min read",
    date: "July 2024",
    author: "Advocacy & Community Desk",
    featured: false,
  },
];

export const DEFAULT_JOBS: Job[] = [
  {
    id: "child-protection-social-worker",
    slug: "child-protection-social-worker",
    title: "Child Protection & Rehabilitation Social Worker",
    type: "Full-time",
    department: "Social Work & Rehabilitation",
    location: "Katani Centre, Machakos County",
    deadline: "November 30, 2024",
    postedDate: "October 10, 2024",
    status: "active",
    description: `New Life Mwangaza Rehabilitation Centre (NLMRC) is seeking a passionate, qualified Child Protection & Rehabilitation Social Worker to join our residential team at Katani Centre. The successful candidate will conduct intake assessments, develop individual rehabilitation plans, provide case management, and spearhead family tracing and reintegration.`,
    responsibilities: `Conduct comprehensive bio-psychosocial intake assessments for rescued street-connected boys (aged 14-17).
Develop, execute, and review 6-month Individual Care & Rehabilitation Plans.
Facilitate individual and group psychosocial support sessions and life skills development.
Liaise with the Department of Children Services (DCS), courts, and local administration.
Conduct field home tracing, family mediation, and post-reunification aftercare monitoring.
Maintain meticulous, confidential case records adhering to child protection guidelines.`,
    requirements: `Bachelor's Degree or Diploma in Social Work, Community Development, or Counseling Psychology.
Minimum 2-3 years proven experience working with vulnerable children, street-connected youth, or rehabilitation centres.
Registered with the Kenya National Association of Social Workers (KNASW) or equivalent body.
Deep understanding of the Children Act 2022 and national child protection frameworks.
Valid Certificate of Good Conduct.
Excellent communication skills in English and Kiswahili.`,
    howToApply: `Send your updated CV and cover letter addressed to the Human Resource Committee at office@newlifemwangaza.org with the subject line 'Application: Child Protection Social Worker'. Include 3 professional referees.`,
  },
  {
    id: "vocational-carpentry-instructor",
    slug: "vocational-carpentry-instructor",
    title: "Vocational Instructor - Carpentry & Joinery",
    type: "Full-time",
    department: "Vocational & Skills Training",
    location: "Katani Centre, Machakos County",
    deadline: "December 15, 2024",
    postedDate: "October 12, 2024",
    status: "active",
    description: `We are looking for a hands-on, empathetic Vocational Instructor to lead our Carpentry, Joinery, and Woodwork workshop. You will equip recovering youth with practical trade skills, workplace discipline, and enterprise fundamentals to prepare them for independent livelihoods.`,
    responsibilities: `Instruct boys in basic, intermediate, and advanced woodwork, joinery, and furniture construction.
Maintain workshop safety protocols, inventory of tools, materials, and machinery.
Instill professional work ethics, teamwork, and project completion standards.
Assess student progress and prepare trainees for NITA (National Industrial Training Authority) Grade III trade tests.
Collaborate with social work staff to monitor students' emotional and behavioural growth.`,
    requirements: `Government Trade Test Grade I or Diploma in Carpentry & Joinery from a recognised TVET institution.
Minimum 2 years of instruction experience or hands-on workshop supervisory experience.
Patience, empathy, and ability to mentor adolescent boys recovering from substance abuse.
Valid Certificate of Good Conduct.`,
    howToApply: `Submit your credentials and letter of interest to office@newlifemwangaza.org with the subject 'Application: Vocational Carpentry Instructor'.`,
  },
  {
    id: "volunteer-literacy-tutor",
    slug: "volunteer-literacy-tutor",
    title: "Volunteer Remedial Literacy & Numeracy Tutor",
    type: "Volunteer",
    department: "Education & Life Skills",
    location: "Katani Centre / Nairobi Outreach Hub",
    deadline: "Ongoing Application",
    postedDate: "October 01, 2024",
    status: "active",
    description: `Make an immediate difference in a young person's life! NLMRC welcomes enthusiastic volunteers to deliver remedial English, Kiswahili, basic mathematics, and computer literacy classes to boys catching up on missed schooling.`,
    responsibilities: `Provide 1-on-1 and small group remedial instruction to adolescent learners.
Create fun, engaging learning materials adapted for accelerated learning.
Assist learners with basic digital literacy, typing, and safe internet research.
Provide positive role modelling and encouragement.`,
    requirements: `Passionate about teaching and youth mentorship.
Background in education, linguistics, mathematics, or related field is an added advantage.
Commitment of at least 4 hours per week for a minimum period of 3 months.
Clean background check / police clearance.`,
    howToApply: `Apply via our Volunteer portal or email office@newlifemwangaza.org with your availability and areas of teaching interest.`,
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "katani-life-1",
    url: imgCentre1,
    caption: "Morning devotion and community assembly at Katani Rehabilitation Centre",
    category: "Centre Life",
    date: "2024",
    featured: true,
  },
  {
    id: "skills-workshop-2",
    url: imgCentre2,
    caption: "Practical vocational training session equipping boys with sustainable trade skills",
    category: "Vocational Training",
    date: "2024",
    featured: true,
  },
  {
    id: "classroom-learning-3",
    url: imgCentre3,
    caption: "Accelerated numeracy and literacy class providing boys a second chance at education",
    category: "Education",
    date: "2024",
    featured: true,
  },
  {
    id: "sports-recreation-4",
    url: imgCentre4,
    caption: "Recreational football and team building as part of therapeutic healing",
    category: "Sports & Recreation",
    date: "2024",
    featured: false,
  },
  {
    id: "community-outreach-5",
    url: imgChildren,
    caption: "Community child protection baraza and outreach program in Mavoko",
    category: "Community Outreach",
    date: "2024",
    featured: true,
  },
  {
    id: "reintegration-family-6",
    url: imgCentre5,
    caption: "Successful family reunification ceremony and blessing of reintegrated boys",
    category: "Reintegration",
    date: "2024",
    featured: false,
  },
];

// ─── Storage Helpers ────────────────────────────────────────────────────────

const STORIES_KEY = "nlmrc_stories";
const JOBS_KEY = "nlmrc_jobs";
const GALLERY_KEY = "nlmrc_gallery";
const AUTH_KEY = "nlmrc_admin_auth";
const PASSWORD_KEY = "nlmrc_admin_password";
const DEFAULT_PASSWORD = "nlmrc2024admin";

function loadData<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      // First time initialization: write fallback to localStorage
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as T[];
    }
    return fallback;
  } catch {
    return fallback;
  }
}

function saveData<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save to ${key}:`, err);
  }
}

export function uid(): string {
  return "nlmrc_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}

// ─── Stories CRUD ────────────────────────────────────────────────────────────

export const getStories = (): Story[] => loadData<Story>(STORIES_KEY, DEFAULT_STORIES);

export const getStoryById = (id: string): Story | undefined => {
  return getStories().find((s) => s.id === id);
};

export const saveStories = (data: Story[]): void => saveData(STORIES_KEY, data);

export const addStory = (story: Omit<Story, "id">): Story => {
  const item: Story = {
    ...story,
    id: uid(),
  };
  const list = [item, ...getStories()];
  saveStories(list);
  return item;
};

export const updateStory = (id: string, updates: Partial<Story>): Story | null => {
  const list = getStories();
  const index = list.findIndex((s) => s.id === id);
  if (index === -1) return null;
  const updated = { ...list[index], ...updates };
  list[index] = updated;
  saveStories(list);
  return updated;
};

export const deleteStory = (id: string): boolean => {
  const list = getStories();
  const filtered = list.filter((s) => String(s.id) !== String(id));
  saveStories(filtered);
  return filtered.length !== list.length;
};

// ─── Jobs CRUD ───────────────────────────────────────────────────────────────

export const getJobs = (): Job[] => loadData<Job>(JOBS_KEY, DEFAULT_JOBS);

export const getJobBySlug = (slug: string): Job | undefined => {
  return getJobs().find((j) => j.slug === slug || j.id === slug);
};

export const saveJobs = (data: Job[]): void => saveData(JOBS_KEY, data);

export const addJob = (job: Omit<Job, "id">): Job => {
  const item: Job = {
    ...job,
    id: uid(),
  };
  const list = [item, ...getJobs()];
  saveJobs(list);
  return item;
};

export const updateJob = (id: string, updates: Partial<Job>): Job | null => {
  const list = getJobs();
  const index = list.findIndex((j) => String(j.id) === String(id));
  if (index === -1) return null;
  const updated = { ...list[index], ...updates };
  list[index] = updated;
  saveJobs(list);
  return updated;
};

export const deleteJob = (id: string): boolean => {
  const list = getJobs();
  const filtered = list.filter((j) => String(j.id) !== String(id));
  saveJobs(filtered);
  return filtered.length !== list.length;
};

// ─── Gallery CRUD ────────────────────────────────────────────────────────────

export const getGallery = (): GalleryItem[] => loadData<GalleryItem>(GALLERY_KEY, DEFAULT_GALLERY);

export const saveGallery = (data: GalleryItem[]): void => saveData(GALLERY_KEY, data);

export const addGalleryItem = (item: Omit<GalleryItem, "id">): GalleryItem => {
  const newItem: GalleryItem = {
    ...item,
    id: uid(),
  };
  const list = [newItem, ...getGallery()];
  saveGallery(list);
  return newItem;
};

export const updateGalleryItem = (id: string, updates: Partial<GalleryItem>): GalleryItem | null => {
  const list = getGallery();
  const index = list.findIndex((g) => String(g.id) === String(id));
  if (index === -1) return null;
  const updated = { ...list[index], ...updates };
  list[index] = updated;
  saveGallery(list);
  return updated;
};

export const deleteGalleryItem = (id: string): boolean => {
  const list = getGallery();
  const filtered = list.filter((g) => String(g.id) !== String(id));
  saveGallery(filtered);
  return filtered.length !== list.length;
};

// ─── Authentication ──────────────────────────────────────────────────────────

export const getAdminPassword = (): string => {
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
};

export const setAdminPassword = (newPassword: string): void => {
  localStorage.setItem(PASSWORD_KEY, newPassword);
};

export const login = (password: string): boolean => {
  const currentPassword = getAdminPassword();
  if (password === currentPassword) {
    localStorage.setItem(AUTH_KEY, "authenticated");
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === "authenticated";
};

// ─── System Utilities (Backup, Restore, Reset) ───────────────────────────────

export const resetToDefaults = (): void => {
  saveStories(DEFAULT_STORIES);
  saveJobs(DEFAULT_JOBS);
  saveGallery(DEFAULT_GALLERY);
  localStorage.removeItem(PASSWORD_KEY);
};

export const exportAllData = (): string => {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    stories: getStories(),
    jobs: getJobs(),
    gallery: getGallery(),
  };
  return JSON.stringify(payload, null, 2);
};

export const importAllData = (jsonStr: string): boolean => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed.stories)) saveStories(parsed.stories);
    if (Array.isArray(parsed.jobs)) saveJobs(parsed.jobs);
    if (Array.isArray(parsed.gallery)) saveGallery(parsed.gallery);
    return true;
  } catch {
    return false;
  }
};

// Helper: Convert uploaded file to Base64 Data URL for offline/local storage
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
