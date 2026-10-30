import { HospitalConfig, TreatmentCategory, Treatment, Doctor, FAQ } from '../types/hospital';

export const ATHREE_HOSPITAL_CONFIG: HospitalConfig = {
  name: "Athree Hospital",
  tagline: "Experience The Excellence",
  parentCompany: "A Unit of SRI SRINIVASA THERAPEUTIC SERVICES PVT LTD.",
  phone: "+91 74835 20200",
  phoneFormatted: "+917483520200",
  whatsapp: "917483520200",
  email: "care@athreehospital.com",
  address: {
    street: "1367 29th Main, Poornaprajna Layout, Uttarahalli Hobli",
    landmark: "Poornaprajna Layout",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560061",
    full: "Athree Hospital, 1367 29th Main, Poornaprajna Layout, Uttarahalli Hobli, Bengaluru, Karnataka 560061"
  },
  googleMapsUrl: "https://maps.google.com/?q=Athree+Hospital+1367+29th+Main+Poornaprajna+Layout+Uttarahalli+Hobli+Bengaluru+Karnataka+560061",
  workingHours: {
    emergency: "24/7 Casualty & In-Patient Emergency Care",
    opd: "Monday to Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 2:00 PM (Prior Appointment)"
  }
};

export interface EnhancedTreatment extends Treatment {
  plainEnglishIntro: string;
  relatedSlugs: string[];
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  {
    id: 'general-surgery',
    name: 'General Surgery',
    description: 'Minimally invasive keyhole and laser procedures designed for minimal discomfort, smaller incisions, and faster return to daily activities.',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Modern sterile 3D keyhole laparoscopic surgical theatre at Athree Hospital',
    treatments: [
      { id: 'hernia-repair', slug: 'hernia-repair', title: 'Hernia Repair', shortDesc: 'Tension-free keyhole repair to fix weak muscle walls in the abdomen or groin.' },
      { id: 'gallstones', slug: 'gallstones', title: 'Gallstones Treatment', shortDesc: 'Gentle keyhole gallbladder removal to permanently stop severe upper stomach pain.' },
      { id: 'appendicitis', slug: 'appendicitis', title: 'Appendix Treatment', shortDesc: 'Emergency keyhole appendectomy to safely remove inflamed appendix.' },
      { id: 'piles', slug: 'piles', title: 'Piles Treatment', shortDesc: 'Painless laser therapy (LHP) to shrink swollen rectal veins without open cuts.' },
      { id: 'anal-fissure', slug: 'anal-fissure', title: 'Anal Fissure Treatment', shortDesc: 'Medical healing ointments and laser treatment to relieve sharp toilet pain.' },
      { id: 'anal-fistula', slug: 'anal-fistula', title: 'Anal Fistula Treatment', shortDesc: 'Sphincter-preserving laser closure (FiLaC) to seal infected perianal tunnels.' }
    ]
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    description: 'Empathetic, specialized care for women, including uterus-preserving procedures, fibroid care, and advanced keyhole surgeries.',
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Compassionate physician providing women\'s health consultation at Athree Hospital',
    treatments: [
      { id: 'uterine-fibroids', slug: 'uterine-fibroids', title: 'Uterine Fibroids Treatment', shortDesc: 'Uterus-preserving keyhole removal of benign uterine lumps to stop heavy bleeding.' },
      { id: 'ovarian-cysts', slug: 'ovarian-cysts', title: 'Ovarian Cysts Treatment', shortDesc: 'Precision removal of ovarian fluid sacs while protecting healthy egg reserve.' },
      { id: 'endometriosis', slug: 'endometriosis', title: 'Endometriosis Treatment', shortDesc: 'Comprehensive medical and keyhole excision care to relieve severe menstrual pain.' },
      { id: 'hysterectomy', slug: 'hysterectomy', title: 'Hysterectomy', shortDesc: 'Advanced keyhole uterus removal with minimal stay when other treatments fail.' }
    ]
  },
  {
    id: 'spine-orthopedics',
    name: 'Spine Care',
    description: 'Non-surgical physical rehabilitation, targeted pain injections, and keyhole procedures for slipped discs and back fractures.',
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Spine specialist reviewing vertebrae diagnostic scans and disc alignment',
    treatments: [
      { id: 'lumbar-disc-prolapse', slug: 'lumbar-disc-prolapse', title: 'Lumbar Disc Prolapse Treatment', shortDesc: 'Targeted nerve care and keyhole discectomy to stop shooting sciatica leg pain.' },
      { id: 'cervical-disc-disease', slug: 'cervical-disc-disease', title: 'Cervical Disc Disease Treatment', shortDesc: 'Comprehensive care to relieve neck stiffness, shoulder ache, and arm numbness.' },
      { id: 'vertebral-compression-fractures', slug: 'vertebral-compression-fractures', title: 'Vertebral Compression Fracture Treatment', shortDesc: '20-minute balloon kyphoplasty to stabilize weak spinal bone fractures.' }
    ]
  }
];

export const TREATMENTS: Record<string, EnhancedTreatment> = {
  'hernia-repair': {
    id: 'hernia-repair',
    slug: 'hernia-repair',
    title: 'Hernia Repair',
    heroHeadline: 'Hernia Treatment & Surgical Consultation',
    categoryId: 'general-surgery',
    categoryTitle: 'General Surgery',
    imageUrl: '/assets/treatments/hernia-repair.jpg',
    imageAlt: '3D Laparoscopic keyhole hernia repair and tension-free mesh placement at Athree Hospital Bengaluru',
    imageCaption: '3D Laparoscopic Keyhole Mesh Repair',
    shortDesc: 'A hernia occurs when tissue pushes through a gap in weak abdominal muscle. Keyhole mesh repair fixes the gap safely.',
    plainEnglishIntro: 'A hernia is a bulge or lump that forms when internal tissue pushes through a weak spot in your belly or groin muscles. It does not go away on its own, but can be safely repaired with a simple keyhole procedure.',
    overview: 'Hernias usually happen in the groin (inguinal hernia), belly button (umbilical hernia), or along a previous surgical scar (incisional hernia). When you strain, lift objects, or stand for long periods, internal pressure pushes tissue out through the muscle weakness, causing a soft bulge and aching discomfort. At Athree Hospital, our surgeons use 3D keyhole (laparoscopic) surgery to place a supportive mesh behind the weak wall, letting you heal quickly with minimal pain.',
    symptoms: [
      'A noticeable soft bump or swelling in your groin, lower belly, or near the belly button',
      'An aching, burning, or heavy sensation around the bulge',
      'Discomfort that feels worse when coughing, lifting, bending, or standing for long hours',
      'A bulge that becomes larger during physical activity but reduces when lying down flat',
      'A feeling of pressure or mild soreness in the lower abdomen'
    ],
    whenToConsult: [
      'You notice a new, expanding, or uncomfortable lump in your abdomen or groin',
      'The bulge causes aching pain during daily household work or exercise',
      'URGENT WARNING: The bulge turns red, suddenly becomes extremely painful, or is accompanied by severe vomiting (Requires immediate emergency evaluation)'
    ],
    diagnosisMethods: [
      'Physical Consultation: A gentle checkup by an experienced surgeon to assess bulge location and muscle wall strength.',
      'Abdominal Ultrasound (USG): A painless imaging scan to measure the gap size.',
      'CT Scan (if needed): Used only for complex hernias.'
    ],
    treatmentOptions: [
      {
        type: 'Observation & Guidance',
        title: 'Initial Evaluation',
        description: 'Small, painless hernias can be monitored under doctor guidance while adjusting heavy lifting habits.'
      },
      {
        type: 'Preferred Keyhole Option',
        title: '3D Laparoscopic Mesh Repair',
        description: 'Performed through 3 tiny 5mm keyhole entry points with minimal scarring and rapid healing.'
      },
      {
        type: 'Open Surgery',
        title: 'Open Repair',
        description: 'Recommended for selected complex hernias where previous surgeries prevent keyhole access.'
      }
    ],
    whyChooseAthree: [
      'Experienced Laparoscopic Surgical Team specializing in keyhole repairs',
      'Tension-free 3D mesh placement to lower recurrence chances',
      'Day-care or 24-hour stay options for suitable candidates',
      'Clear, transparent treatment guidance',
      'Post-operative physical recovery support'
    ],
    faqs: [
      {
        question: 'Does a hernia go away with exercise or medicine?',
        answer: 'No. Because a hernia is a physical gap in the muscle, surgery is the only permanent repair when symptoms occur.'
      },
      {
        question: 'How quickly can I return to work after keyhole hernia surgery?',
        answer: 'Most patients walk comfortably the same evening and return home within 24 hours. Light desk work can resume in 3 to 5 days.'
      },
      {
        question: 'Will I feel the mesh inside my body?',
        answer: 'No. Modern lightweight synthetic mesh integrates naturally with surrounding tissue and becomes imperceptible.'
      },
      {
        question: 'What is the advantage of keyhole surgery over open surgery?',
        answer: 'Keyhole surgery uses tiny punctures resulting in significantly less post-op pain, minimal scarring, and faster recovery.'
      }
    ],
    seoTitle: 'Hernia Treatment & Keyhole Mesh Surgery | Athree Hospital Bengaluru',
    seoDescription: 'Expert hernia treatment at Athree Hospital Bengaluru. Advanced 3D keyhole mesh repair for groin & belly hernias. Minimal pain & fast recovery. Book consultation.',
    keywords: ['Hernia treatment', 'Laparoscopic hernia surgery', 'Inguinal hernia', 'Keyhole mesh repair', 'Athree Hospital hernia Bengaluru'],
    relatedSlugs: ['gallstones', 'piles', 'anal-fissure']
  },

  'gallstones': {
    id: 'gallstones',
    slug: 'gallstones',
    title: 'Gallstones Treatment',
    heroHeadline: 'Gallstone Evaluation & Treatment',
    categoryId: 'general-surgery',
    categoryTitle: 'General Surgery',
    imageUrl: '/assets/treatments/gallstones.jpg',
    imageAlt: 'Laparoscopic cholecystectomy keyhole gallbladder removal surgery at Athree Hospital Bengaluru',
    imageCaption: 'Laparoscopic Cholecystectomy Suite',
    shortDesc: 'Gallstones are hard deposits that form in the gallbladder. Keyhole removal stops upper stomach pain permanently.',
    plainEnglishIntro: 'Gallstones are pebble-like hard deposits formed inside the gallbladder. They can block digestive bile flow and trigger sharp pain in the upper stomach, especially after eating fatty meals.',
    overview: 'The gallbladder holds bile that breaks down fats. When cholesterol hardens into stones, they block the bile duct causing intense stomach pain. At Athree Hospital, our specialists perform gentle keyhole surgery (laparoscopic cholecystectomy) to safely remove the stone-filled gallbladder.',
    symptoms: [
      'Sudden sharp pain in the upper right side or center of your stomach',
      'Pain spreading to your back or right shoulder blade after meals',
      'Feeling bloated, nauseous, or throwing up after eating',
      'Indigestion or gas that fails to respond to antacids',
      'Yellowish color in eyes or skin (jaundice) if bile duct is blocked'
    ],
    whenToConsult: [
      'You experience recurring stomach pain after meals',
      'Stomach pain is severe enough that you cannot sit comfortably',
      'You notice yellowing of your eyes or dark urine',
      'You develop upper stomach pain with fever and chills'
    ],
    diagnosisMethods: [
      'Abdominal Ultrasound (USG): A painless scan showing gallstones immediately.',
      'Liver Function Test (LFT): Blood check to confirm liver health.',
      'MRCP (MRI Scan): Recommended if a stone is in the main bile duct.'
    ],
    treatmentOptions: [
      {
        type: 'Medical Evaluation',
        title: 'Dietary Adjustments & Monitoring',
        description: 'For tiny silent stones found accidentally that cause no pain.'
      },
      {
        type: 'Gold Standard Treatment',
        title: 'Keyhole Gallbladder Removal (Laparoscopic Cholecystectomy)',
        description: 'Permanent fix removing the stone-filled gallbladder keyhole. Normal digestion continues smoothly.'
      },
      {
        type: 'Specialized Endoscopy',
        title: 'ERCP Procedure',
        description: 'Used if a stone is trapped in the main bile duct before keyhole surgery.'
      }
    ],
    whyChooseAthree: [
      'Experienced Keyhole Surgical Team',
      'Ultra-thin optics for minimal cosmetic marks',
      '24-hour hospital stay for keyhole gallbladder removal',
      'Pre-op and post-op dietary guidance',
      'Transparent packages and insurance assistance'
    ],
    faqs: [
      {
        question: 'Can gallstones be dissolved with medicines alone?',
        answer: 'Medicines rarely dissolve hard gallstones permanently. Keyhole removal is the established cure.'
      },
      {
        question: 'Can I live normally without a gallbladder?',
        answer: 'Yes! Bile flows directly from your liver into your digestion system, and digestion functions normally.'
      },
      {
        question: 'How long is the hospital stay?',
        answer: 'Most patients are discharged comfortably within 24 hours.'
      },
      {
        question: 'What foods can I eat after surgery?',
        answer: 'Start with soft light foods for a few days and transition back to your normal balanced diet.'
      }
    ],
    seoTitle: 'Gallstone Treatment & Keyhole Removal | Athree Hospital Bengaluru',
    seoDescription: 'Comprehensive gallstone treatment at Athree Hospital Bengaluru. Advanced keyhole gallbladder surgery, expert doctors, 24-hr discharge. Schedule consultation.',
    keywords: ['Gallstone treatment', 'Laparoscopic cholecystectomy', 'Gallbladder surgery', 'Gallstones doctor', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['hernia-repair', 'piles', 'anal-fissure']
  },

  'appendicitis': {
    id: 'appendicitis',
    slug: 'appendicitis',
    title: 'Appendix Treatment',
    heroHeadline: 'Emergency & Keyhole Appendix Treatment',
    categoryId: 'general-surgery',
    categoryTitle: 'General Surgery',
    imageUrl: '/assets/treatments/appendicitis.jpg',
    imageAlt: 'Specialist surgical team operating keyhole laparoscopic appendectomy in modern operating suite at Athree Hospital Bengaluru',
    imageCaption: 'Minimally Invasive Laparoscopic Surgical Team',
    shortDesc: 'Appendicitis is a sudden swelling of the appendix. Safe 3D keyhole surgery removes the inflamed organ before it bursts.',
    plainEnglishIntro: 'Appendicitis is an acute inflammation of the appendix, a small finger-shaped pouch connected to the large intestine. It causes sharp, worsening pain in the lower right side of the belly and requires prompt medical attention.',
    overview: 'An inflamed appendix can rapidly worsen and risk rupture or internal infection. At Athree Hospital, our 24/7 surgical team provides immediate diagnosis via high-resolution ultrasound and emergency 3D keyhole (laparoscopic) appendectomy. This gentle procedure removes the appendix through tiny keyhole punctures, allowing rapid relief and safe recovery.',
    symptoms: [
      'Sudden dull pain beginning near the navel and shifting sharp to the lower right abdomen',
      'Pain that intensifies quickly with coughing, walking, or sudden body movements',
      'Nausea, vomiting, and complete loss of appetite',
      'Low-grade fever that can rise as infection develops',
      'Abdominal swelling, tenderness, or muscle guarding on the right side'
    ],
    whenToConsult: [
      'EMERGENCY WARNING: Sudden severe pain in the lower right abdomen (Call our 24/7 emergency helpline immediately at +91 74835 20200)',
      'Abdominal pain accompanied by vomiting, high fever, or inability to stand upright',
      'Tenderness that worsens when pressure on the lower right belly is released',
      'Never take strong laxatives or pain relievers before a doctor checks your belly, as this can mask critical signs'
    ],
    diagnosisMethods: [
      'Emergency Clinical Evaluation: Gentle physical abdominal palpation and rebound tenderness assessment by our senior surgeon.',
      'Emergency Ultrasound Scan (USG): High-resolution sonography to directly visualize appendix swelling and surrounding fluid.',
      'Rapid Blood Tests (CBC & CRP): Evaluating infection counts and white blood cell levels.',
      'Abdominal CT Scan: Performed when ultrasound imaging requires additional anatomical detail.'
    ],
    treatmentOptions: [
      {
        type: 'Gold Standard',
        title: 'Laparoscopic Appendectomy (Keyhole Surgery)',
        description: 'Removal of the inflamed appendix through 3 tiny 5mm punctures using high-definition cameras, leaving minimal scars and ensuring rapid discharge.'
      },
      {
        type: 'Intensive Medical Care',
        title: 'Intravenous Antibiotic Therapy',
        description: 'Administered immediately upon hospital admission to control infection and safeguard patient stability prior to surgery.'
      },
      {
        type: 'Conventional Surgery',
        title: 'Open Appendectomy',
        description: 'Reserved for complicated cases with ruptured appendix or extensive peritonitis requiring full abdominal wash.'
      }
    ],
    whyChooseAthree: [
      '24/7 Emergency Surgical Ready Team & dedicated acute care',
      'Advanced 3D keyhole laparoscopic surgery with minimal pain and scars',
      'In-house high-resolution ultrasound and emergency pathology laboratory',
      'Rapid patient recovery with discharge typically within 24 to 36 hours',
      'Transparent treatment guidance and cashless insurance assistance'
    ],
    faqs: [
      {
        question: 'How quickly does laparoscopic appendectomy need to be done?',
        answer: 'Once acute appendicitis is diagnosed, surgery is ideally performed promptly within hours to prevent the appendix from bursting.'
      },
      {
        question: 'How long will I need to stay in the hospital?',
        answer: 'With keyhole laparoscopic surgery, most patients are discharged comfortably within 24 to 36 hours.'
      },
      {
        question: 'Can appendicitis be cured with antibiotics alone without surgery?',
        answer: 'While mild cases may temporarily settle with IV antibiotics, the recurrence risk is very high. Surgical removal remains the only definitive and safe cure.'
      },
      {
        question: 'How soon can I return to normal work after keyhole appendix surgery?',
        answer: 'Most patients walk comfortably the same evening and resume light office work within 5 to 7 days.'
      }
    ],
    seoTitle: 'Appendix Treatment & Laparoscopic Appendectomy | Athree Hospital Bengaluru',
    seoDescription: 'Emergency appendix treatment & keyhole laparoscopic appendectomy at Athree Hospital Bengaluru. 24/7 surgical care, minimal pain & rapid discharge. Call now.',
    keywords: ['Appendix treatment', 'Appendicitis surgery', 'Laparoscopic appendectomy', 'Appendix pain', 'Athree Hospital appendix Bengaluru'],
    relatedSlugs: ['gallstones', 'hernia-repair', 'piles']
  },

  'piles': {
    id: 'piles',
    slug: 'piles',
    title: 'Piles Treatment',
    heroHeadline: 'Piles Treatment & Specialist Consultation',
    categoryId: 'general-surgery',
    categoryTitle: 'General Surgery',
    imageUrl: '/assets/treatments/piles.jpg',
    imageAlt: 'Advanced German laser therapy system for painless laser hemorrhoidoplasty (LHP) at Athree Hospital Bengaluru',
    imageCaption: 'Painless Laser Hemorrhoidoplasty (LHP)',
    shortDesc: 'Piles (hemorrhoids) are swollen blood vessels near the anus. Painless laser treatment shrinks swollen veins without open cuts.',
    plainEnglishIntro: 'Piles are swollen, inflamed blood vessels in the lower rectum or anal area. They can cause bleeding during bowel movements, itching, or painful lumps.',
    overview: 'Straining during toilet visits causes rectal veins to swell and bleed. At Athree Hospital, our proctology specialists offer advanced German Laser Hemorrhoidoplasty (LHP) and stapler procedures that shrink swollen tissue without scalpels, cuts, or open wounds.',
    symptoms: [
      'Painless bright red blood drops during bowel movements',
      'Itching, irritation, or soreness around the anal area',
      'A painful swollen lump or soft tissue bulge near the anus',
      'Feeling like your bowel is not completely empty',
      'Discomfort when sitting for long periods'
    ],
    whenToConsult: [
      'You see blood drops in the toilet bowl',
      'You experience painful sitting or difficulty passing stool',
      'Soft bulges push out during straining',
      'Over-the-counter ointments provide no relief'
    ],
    diagnosisMethods: [
      'Gentle Physical Checkup: Quick, discreet evaluation in a private room.',
      'Anoscopy: Simple 2-minute check to identify the exact grade of piles.'
    ],
    treatmentOptions: [
      {
        type: 'Lifestyle & Dietary',
        title: 'High-Fiber & Stool Softener Care',
        description: 'High-fiber diet advice and warm sitz baths for mild early piles.'
      },
      {
        type: 'Modern Laser Solution',
        title: 'Painless Laser Hemorrhoidoplasty (LHP)',
        description: 'Advanced laser fiber shrinks swollen blood vessels from within without cuts or stitches.'
      },
      {
        type: 'Advanced Day-Care',
        title: 'MIPH Stapler Procedure',
        description: 'A 15-minute stapler procedure for larger prolapsed piles.'
      }
    ],
    whyChooseAthree: [
      'Dedicated Proctology & Laser Care Center',
      'Painless German laser technology for 15-minute procedures',
      'No open cuts, scalpels, or painful daily dressings',
      'Same-day discharge with return to work in 24 to 48 hours',
      'Complete patient privacy and compassionate care'
    ],
    faqs: [
      {
        question: 'Is laser treatment for piles painful?',
        answer: 'Laser treatment causes minimal pain compared to open surgery because no scalpels or cuts are used.'
      },
      {
        question: 'Do I need a long hospital stay?',
        answer: 'No, most patients are treated under day-care admission and return home the same evening.'
      },
      {
        question: 'How do I distinguish piles from a fissure?',
        answer: 'Piles usually cause painless bleeding or soft lumps, whereas a fissure causes sharp burning pain.'
      },
      {
        question: 'Will piles return after laser treatment?',
        answer: 'Recurrence is very low when combined with a fiber-rich diet and healthy bowel habits.'
      }
    ],
    seoTitle: 'Piles Treatment & Painless Laser Surgery | Athree Hospital Bengaluru',
    seoDescription: 'Advanced piles treatment at Athree Hospital Bengaluru. Painless laser hemorrhoidoplasty (LHP), no cuts, no stitches, same-day discharge. Schedule consultation.',
    keywords: ['Piles treatment', 'Laser hemorrhoidoplasty', 'Piles doctor', 'Painless piles surgery', 'Athree Hospital piles Bengaluru'],
    relatedSlugs: ['anal-fissure', 'anal-fistula', 'hernia-repair']
  },

  'anal-fissure': {
    id: 'anal-fissure',
    slug: 'anal-fissure',
    title: 'Anal Fissure Treatment',
    heroHeadline: 'Anal Fissure Evaluation & Treatment',
    categoryId: 'general-surgery',
    categoryTitle: 'General Surgery',
    imageUrl: '/assets/treatments/anal-fissure.jpg',
    imageAlt: 'Specialized proctology consultation and gentle non-surgical anal fissure evaluation at Athree Hospital',
    imageCaption: 'Proctology Clinic & Laser Care',
    shortDesc: 'An anal fissure is a small crack in the anal lining causing sharp pain during toilet visits. Medical ointments & laser cure it quickly.',
    plainEnglishIntro: 'An anal fissure is a small tear in the lining of the anus, usually triggered by passing hard stool. It causes sharp, cutting pain and burning during and after bowel movements.',
    overview: 'Because sphincter muscles go into spasm when a fissure occurs, blood flow drops, slowing healing. At Athree Hospital, we prioritize non-surgical healing ointments and laser treatments to release muscle spasm and promote rapid healing.',
    symptoms: [
      'Sharp cutting or burning pain during bowel movements',
      'Lingering burning pain that stays for hours after toilet visits',
      'Bright red blood streaks on toilet tissue',
      'A visible small crack near the anal opening',
      'Fear of pain causing you to delay passing stool'
    ],
    whenToConsult: [
      'Toilet pain persists for more than a few days',
      'Burning pain disrupts your daily work',
      'You notice repeated blood streaks on tissue',
      'Ointments fail to relieve burning'
    ],
    diagnosisMethods: [
      'Visual Checkup: Gentle external check by a proctologist.',
      'Anoscopy (if needed): Performed only if internal checks are required.'
    ],
    treatmentOptions: [
      {
        type: 'Medical Therapy',
        title: 'Specialized Healing Ointments & Sitz Baths',
        description: 'Muscle-relaxing ointments and warm sitz baths to ease spasm and promote natural healing.'
      },
      {
        type: 'Minimally Invasive Laser',
        title: 'Laser Fissure Treatment',
        description: 'Laser energy gently releases muscle spasm and cleans chronic fissure tissue without open cutting.'
      },
      {
        type: 'Minor Surgical Option',
        title: 'Lateral Internal Sphincterotomy (LIS)',
        description: 'A 10-minute minor procedure for chronic stubborn fissures.'
      }
    ],
    whyChooseAthree: [
      'Empathetic Proctology Clinic with privacy',
      'Focus on non-surgical healing whenever possible',
      'Laser options for immediate burning pain relief',
      'Personalized dietary fiber guidance',
      'High patient comfort with no hospital stay'
    ],
    faqs: [
      {
        question: 'Can an anal fissure heal without surgery?',
        answer: 'Yes! Acute fissures (under 6 weeks) frequently heal with prescribed ointments, soft stools, and warm sitz baths.'
      },
      {
        question: 'How quickly does pain go away after laser treatment?',
        answer: 'Most patients feel significant pain reduction within 24 to 48 hours.'
      },
      {
        question: 'Will treatment affect bowel control?',
        answer: 'No, procedures are performed with microscopic precision to protect muscle tone and continence.'
      },
      {
        question: 'What foods help healing?',
        answer: 'High-fiber foods (oats, fruits, vegetables) and 3 liters of water daily keep stool soft.'
      }
    ],
    seoTitle: 'Anal Fissure Treatment & Laser Surgery | Athree Hospital Bengaluru',
    seoDescription: 'Effective anal fissure treatment at Athree Hospital Bengaluru. Medical healing ointments & painless laser fissure surgery. Fast pain relief & proctology care.',
    keywords: ['Anal fissure treatment', 'Laser fissurectomy', 'Fissure doctor', 'Fissure pain relief', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['piles', 'anal-fistula', 'gallstones']
  },

  'anal-fistula': {
    id: 'anal-fistula',
    slug: 'anal-fistula',
    title: 'Anal Fistula Treatment',
    heroHeadline: 'Anal Fistula Treatment & Surgical Care',
    categoryId: 'general-surgery',
    categoryTitle: 'General Surgery',
    imageUrl: '/assets/treatments/anal-fistula.jpg',
    imageAlt: 'Video-assisted endoscopy and FiLaC laser procedure suite for anal fistula closure at Athree Hospital',
    imageCaption: 'Sphincter-Sparing FiLaC Laser Suite',
    shortDesc: 'An anal fistula is an infected tunnel under the skin near the anus. Sphincter-sparing laser (FiLaC) seals the tunnel safely.',
    plainEnglishIntro: 'An anal fistula is a small infected tunnel that connects an infected gland inside the anal canal to an opening on the skin near the anus.',
    overview: 'Anal fistulas cause recurring pus, fluid discharge, and throbbing pain. They do not heal with medicines alone. At Athree Hospital, we specialize in sphincter-sparing FiLaC (Fistula Laser Closure) and VAAFT procedures that seal the tunnel without cutting anal muscles.',
    symptoms: [
      'Recurring pus or watery fluid discharge near the anus',
      'Throbbing pain or swelling around the bottom when sitting',
      'Redness or itching around the outer skin opening',
      'Fever when pus builds up inside the tunnel',
      'Painful bowel movements'
    ],
    whenToConsult: [
      'You notice fluid staining your undergarments',
      'You develop a painful lump or boil near your anus',
      'An infection comes back repeatedly',
      'Antibiotics give temporary relief but fluid discharge continues'
    ],
    diagnosisMethods: [
      '3D Endo-Anal Ultrasound: Scan mapping the fistula track.',
      'MRI Fistulogram: 3D imaging showing all side branches and muscle involvement.'
    ],
    treatmentOptions: [
      {
        type: 'Sphincter-Sparing Laser',
        title: 'FiLaC (Fistula Laser Closure)',
        description: 'A flexible radial laser probe seals the tunnel internally without cutting sphincter muscles.'
      },
      {
        type: 'Video-Assisted',
        title: 'VAAFT Procedure',
        description: 'A micro-endoscope inspects and seals internal side branches under camera view.'
      },
      {
        type: 'Surgical Care',
        title: 'LIFT / Fistulotomy',
        description: 'Conventional procedures for simple superficial tunnels.'
      }
    ],
    whyChooseAthree: [
      'MRI-guided fistula mapping prior to procedure',
      'Muscle-sparing laser (FiLaC) technology',
      'Minimal post-op pain with no open wounds',
      'Lower recurrence rate than traditional cutting',
      'Proctology surgical specialists'
    ],
    faqs: [
      {
        question: 'Can a fistula be cured with antibiotics alone?',
        answer: 'No. Antibiotics control infection temporarily, but laser or surgical closure of the tunnel is required for permanent cure.'
      },
      {
        question: 'What is FiLaC laser treatment?',
        answer: 'FiLaC uses radial laser energy to seal the tunnel internally without cutting anal muscles.'
      },
      {
        question: 'How long is recovery?',
        answer: 'Most patients return home within 24 hours and resume daily light activities in 3 to 5 days.'
      },
      {
        question: 'How is recurrence prevented?',
        answer: 'Pre-op MRI mapping combined with endoscopic laser visualization ensures all side branches are treated.'
      }
    ],
    seoTitle: 'Anal Fistula Treatment & Laser Surgery | Athree Hospital Bengaluru',
    seoDescription: 'Advanced anal fistula treatment at Athree Hospital Bengaluru. FiLaC laser closure, VAAFT video surgery, sphincter muscle preservation & low recurrence.',
    keywords: ['Anal fistula treatment', 'FiLaC laser surgery', 'Fistula doctor', 'Anal fistula cure', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['piles', 'anal-fissure', 'hernia-repair']
  },

  'uterine-fibroids': {
    id: 'uterine-fibroids',
    slug: 'uterine-fibroids',
    title: 'Uterine Fibroids Treatment',
    heroHeadline: 'Uterine Fibroid Evaluation & Treatment',
    categoryId: 'womens-health',
    categoryTitle: "Women's Health",
    imageUrl: '/assets/treatments/uterine-fibroids.jpg',
    imageAlt: 'High-resolution pelvic ultrasound and uterus-preserving laparoscopic myomectomy evaluation at Athree Hospital',
    imageCaption: 'Pelvic Sonography & Myomectomy Care',
    shortDesc: 'Uterine fibroids are non-cancerous muscular lumps in the uterus. Uterus-preserving keyhole surgery removes fibroids while stopping heavy bleeding.',
    plainEnglishIntro: 'Uterine fibroids are non-cancerous (benign) muscle growths in the wall of the uterus. They can cause heavy period bleeding, severe cramps, and lower belly pressure.',
    overview: 'Fibroids vary from small nodules to large lumps. At Athree Hospital, our female gynecological specialists focus on uterus-sparing keyhole myomectomy. We remove only the fibroids, keeping your uterus intact for future health and pregnancy.',
    symptoms: [
      'Heavy period bleeding lasting more than 7 days',
      'Severe cramps and constant lower stomach pressure',
      'Frequent urge to pass urine due to pressure on the bladder',
      'Fullness or enlargement in lower abdomen',
      'Pain during intercourse or lower back ache'
    ],
    whenToConsult: [
      'Period bleeding is heavy enough that you feel exhausted (anemic)',
      'Lower belly pressure interferes with daily work',
      'You experience difficulty getting pregnant',
      'You notice sudden growth in your lower abdomen'
    ],
    diagnosisMethods: [
      'Pelvic Ultrasound (USG): Scan measuring fibroid size and location.',
      'Pelvic MRI Scan: Detailed 3D picture of deep fibroids before keyhole surgery.',
      'Hysteroscopy: Direct camera check inside the womb.'
    ],
    treatmentOptions: [
      {
        type: 'Medical Therapy',
        title: 'Hormonal Care & Bleeding Control',
        description: 'Medications or hormone devices to reduce heavy period flow and shrink fibroids.'
      },
      {
        type: 'Uterus-Preserving Keyhole',
        title: '3D Laparoscopic Myomectomy',
        description: 'Keyhole removal of fibroids through 3 tiny 5mm punctures, preserving the uterus and fertility.'
      },
      {
        type: 'Trans-Cervical Option',
        title: 'Hysteroscopic Myomectomy',
        description: 'Removal of fibroids bulging inside the womb cavity through natural pathways without stomach cuts.'
      }
    ],
    whyChooseAthree: [
      'Senior Female Gynecologists & Keyhole Specialists',
      'Uterus-sparing, fertility-focused approach',
      'Advanced 3D HD laparoscopic technology',
      'Confidential care in private suites',
      'Anemia recovery and wellness guidance'
    ],
    faqs: [
      {
        question: 'Are uterine fibroids cancerous?',
        answer: 'No. Fibroids are non-cancerous benign muscle growths.'
      },
      {
        question: 'Can I get pregnant after fibroid removal?',
        answer: 'Yes! Laparoscopic myomectomy removes only fibroids and carefully repairs the uterine wall for future pregnancy.'
      },
      {
        question: 'Do all fibroids require surgery?',
        answer: 'No. Small fibroids causing no pain or heavy bleeding can be monitored safely.'
      },
      {
        question: 'How long is recovery?',
        answer: 'Hospital stay is 24 to 48 hours, returning to light activities in 7 to 10 days.'
      }
    ],
    seoTitle: 'Uterine Fibroid Treatment & Myomectomy | Athree Hospital Bengaluru',
    seoDescription: 'Expert uterine fibroid treatment at Athree Hospital Bengaluru. Uterus-preserving keyhole myomectomy, experienced female gynecologists. Schedule consultation.',
    keywords: ['Uterine fibroid treatment', 'Laparoscopic myomectomy', 'Fibroids doctor', 'Fibroid surgery', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['ovarian-cysts', 'endometriosis', 'hysterectomy']
  },

  'ovarian-cysts': {
    id: 'ovarian-cysts',
    slug: 'ovarian-cysts',
    title: 'Ovarian Cysts Treatment',
    heroHeadline: 'Ovarian Cyst Assessment & Treatment',
    categoryId: 'womens-health',
    categoryTitle: "Women's Health",
    imageUrl: '/assets/treatments/ovarian-cysts.jpg',
    imageAlt: 'Pelvic ultrasound diagnostic workstation for egg-preserving ovarian cyst evaluation at Athree Hospital',
    imageCaption: 'Egg-Preserving Diagnostic Suite',
    shortDesc: 'Ovarian cysts are fluid sacs on the ovary. Keyhole cystectomy removes the cyst cleanly while preserving healthy egg reserve.',
    plainEnglishIntro: 'An ovarian cyst is a fluid-filled sac on or inside an ovary. While many functional cysts resolve naturally, complex or painful cysts require evaluation to protect ovarian health.',
    overview: 'At Athree Hospital, our gynecologists use precise ultrasound tracking and microsurgical keyhole removal (cystectomy) to shell out the cyst capsule while keeping healthy egg tissue intact.',
    symptoms: [
      'Aching or sharp pain in lower stomach on the side of cyst',
      'Bloating or heaviness in lower abdomen',
      'Irregular or unusually painful period cycles',
      'Pain during intercourse',
      'Sudden severe pelvic pain with nausea (Sign of cyst rupture or twisted ovary)'
    ],
    whenToConsult: [
      'You experience sudden or recurring lower belly pain',
      'Pelvic pain occurs alongside irregular period cycles',
      'An ultrasound shows a persistent or complex cyst',
      'You experience pain during intercourse'
    ],
    diagnosisMethods: [
      'High-Resolution Pelvic Ultrasound (USG): Evaluates cyst size and fluid nature.',
      'Blood Markers (CA-125): Routine blood check to confirm benign nature.',
      'Pelvic MRI: Used for complex bilateral cysts.'
    ],
    treatmentOptions: [
      {
        type: 'Observation',
        title: 'Regular Ultrasound Tracking',
        description: 'For small simple fluid cysts that often shrink naturally within 1-2 period cycles.'
      },
      {
        type: 'Egg-Preserving Keyhole',
        title: 'Laparoscopic Ovarian Cystectomy',
        description: 'Precise keyhole removal of cyst wall while preserving surrounding healthy egg tissue.'
      },
      {
        type: 'Hormonal Prevention',
        title: 'Contraceptive Care',
        description: 'Prescribed to prevent new ovulation cysts.'
      }
    ],
    whyChooseAthree: [
      'Female Gynecologists dedicated to preserving egg supply',
      'High-precision microsurgical tools',
      'In-house ultrasound and pathology lab',
      'Painless keyhole approach with fast recovery',
      'Confidential clinical environment'
    ],
    faqs: [
      {
        question: 'Will cyst removal affect my fertility?',
        answer: 'Our surgeons preserve your healthy ovary and egg supply, protecting your fertility.'
      },
      {
        question: 'Do all ovarian cysts need surgery?',
        answer: 'No. Many simple fluid cysts shrink naturally. Surgery is reserved for persistent or painful cysts.'
      },
      {
        question: 'What is a twisted ovary?',
        answer: 'A heavy cyst causes the ovary to twist on its blood supply. Prompt keyhole surgery unwinds it and saves the tissue.'
      },
      {
        question: 'How fast is recovery?',
        answer: 'Most patients return home in 24 hours and resume light activities in 4 to 7 days.'
      }
    ],
    seoTitle: 'Ovarian Cyst Treatment & Keyhole Removal | Athree Hospital Bengaluru',
    seoDescription: 'Specialized ovarian cyst evaluation & laparoscopic cystectomy at Athree Hospital Bengaluru. Protect egg reserve & fertility, expert female doctors.',
    keywords: ['Ovarian cyst treatment', 'Laparoscopic cystectomy', 'Ovarian cyst doctor', 'Ovary surgery', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['uterine-fibroids', 'endometriosis', 'hysterectomy']
  },

  'endometriosis': {
    id: 'endometriosis',
    slug: 'endometriosis',
    title: 'Endometriosis Treatment',
    heroHeadline: 'Endometriosis Care & Treatment Options',
    categoryId: 'womens-health',
    categoryTitle: "Women's Health",
    imageUrl: '/assets/treatments/endometriosis.jpg',
    imageAlt: 'Advanced laparoscopic keyhole excision theater for endometriosis care at Athree Hospital Bengaluru',
    imageCaption: '4K Laparoscopic Excision Theater',
    shortDesc: 'Endometriosis occurs when womb lining tissue grows outside the uterus, causing severe period pain. Keyhole excision gives lasting relief.',
    plainEnglishIntro: 'Endometriosis is a painful condition where tissue similar to womb lining grows outside the uterus (on ovaries, fallopian tubes, or pelvic lining), triggering severe monthly pain.',
    overview: 'At Athree Hospital, we offer complete hormonal therapies and gold-standard laparoscopic excision surgery. We cut out active endometriosis implants, freeing organs and restoring quality of life.',
    symptoms: [
      'Extremely painful period cramps that worsen over time',
      'Chronic lower stomach and back pain throughout the month',
      'Pain during or after intercourse',
      'Painful bowel movements during periods',
      'Difficulty conceiving'
    ],
    whenToConsult: [
      'Period pain causes missed work or routine activities',
      'You experience deep pain during intercourse',
      'You have been trying to conceive for 12+ months',
      'You experience painful digestion during periods'
    ],
    diagnosisMethods: [
      'Specialized Pelvic USG: Detects chocolate cysts and deep nodules.',
      'Pelvic MRI Scan: Maps deep deposits.',
      'Keyhole Diagnostic & Operative Surgery: Directly sees and treats deposits.'
    ],
    treatmentOptions: [
      {
        type: 'Hormonal Care',
        title: 'Hormonal Pain Suppression',
        description: 'Progesterone or hormone therapy to reduce swelling and ease pain.'
      },
      {
        type: 'Gold Standard Excision',
        title: 'Laparoscopic Excision of Endometriosis',
        description: 'Keyhole removal (cutting out) of active deposits and chocolate cysts.'
      },
      {
        type: 'Holistic Support',
        title: 'Pelvic Therapy Guidance',
        description: 'Pelvic physical rehabilitation and dietary guidance for long-term comfort.'
      }
    ],
    whyChooseAthree: [
      'Specialized Endometriosis & Pelvic Pain Team',
      'Excision-focused keyhole surgery for long relief',
      'Fertility-preserving approach',
      'Experienced female gynecologists',
      'Comprehensive post-op follow-up'
    ],
    faqs: [
      {
        question: 'What is the difference between burning and excision?',
        answer: 'Burning only treats the surface. Excision removes the complete lesion for lower recurrence and better pain relief.'
      },
      {
        question: 'Can endometriosis cause pregnancy delays?',
        answer: 'Yes, but keyhole excision surgery often restores pelvic anatomy and improves fertility.'
      },
      {
        question: 'Does menopause stop symptoms?',
        answer: 'Yes, symptoms usually ease after natural menopause when estrogen levels drop.'
      },
      {
        question: 'How is pain managed after surgery?',
        answer: 'We combine keyhole excision with hormonal support and physical therapy for long-term comfort.'
      }
    ],
    seoTitle: 'Endometriosis Care & Keyhole Excision | Athree Hospital Bengaluru',
    seoDescription: 'Comprehensive endometriosis treatment at Athree Hospital Bengaluru. Advanced keyhole excision surgery, hormonal therapy & fertility support. Book appointment.',
    keywords: ['Endometriosis treatment', 'Laparoscopic excision', 'Pelvic pain doctor', 'Chocolate cyst', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['ovarian-cysts', 'uterine-fibroids', 'hysterectomy']
  },

  'hysterectomy': {
    id: 'hysterectomy',
    slug: 'hysterectomy',
    title: 'Hysterectomy',
    heroHeadline: 'Hysterectomy Consultation & Surgical Care',
    categoryId: 'womens-health',
    categoryTitle: "Women's Health",
    imageUrl: '/assets/treatments/hysterectomy.jpg',
    imageAlt: 'Total Laparoscopic Hysterectomy (TLH) minimally invasive surgical suite at Athree Hospital Bengaluru',
    imageCaption: '3D HD Laparoscopic Hysterectomy Suite',
    shortDesc: 'A hysterectomy is the surgical removal of the uterus. Keyhole Total Laparoscopic Hysterectomy (TLH) offers minimal pain and 24-48 hr recovery.',
    plainEnglishIntro: 'A hysterectomy is a procedure to remove the womb (uterus), considered when other treatments fail to control heavy bleeding, extensive fibroids, or prolapse.',
    overview: 'At Athree Hospital, Total Laparoscopic Hysterectomy (TLH) is performed keyhole through tiny 5mm punctures. Healthy ovaries are preserved whenever possible so your body keeps producing natural female hormones.',
    symptoms: [
      'Uncontrollable heavy period bleeding causing anemia',
      'Severe pain from extensive adenomyosis or fibroids',
      'Pelvic heaviness from uterine prolapse',
      'Chronic pelvic pain unresponsive to non-surgical care'
    ],
    whenToConsult: [
      'Your doctor has advised evaluating hysterectomy for benign uterine health issues',
      'Heavy bleeding causes weakness despite medications',
      'You wish to discuss surgical vs non-surgical alternatives',
      'Prolapse causes difficulty walking or sitting'
    ],
    diagnosisMethods: [
      'Pre-Surgical Checkup: Routine Pap smear and safety check.',
      'Ultrasound & Biopsy: Evaluates womb lining health.',
      'Fitness Check (PAC): Complete health check before keyhole surgery.'
    ],
    treatmentOptions: [
      {
        type: 'Gold Standard Keyhole',
        title: 'Total Laparoscopic Hysterectomy (TLH)',
        description: 'Keyhole removal through 3-4 tiny 5mm punctures with minimal pain and rapid recovery.'
      },
      {
        type: 'Vaginal Approach',
        title: 'Non-Abdominal Vaginal Hysterectomy (NDVH)',
        description: 'Performed through natural pathways without abdominal cuts.'
      },
      {
        type: 'Hormone-Preserving',
        title: 'Ovarian Preservation Care',
        description: 'Healthy ovaries are kept intact so your body keeps producing natural hormones.'
      }
    ],
    whyChooseAthree: [
      'Senior Female Gynecologists with keyhole expertise',
      'Hormone-sparing philosophy (preserving healthy ovaries)',
      'Short 24 to 48-hour recovery stay',
      'Empathetic pre-op counseling',
      'Transparent packages and insurance help'
    ],
    faqs: [
      {
        question: 'Will a hysterectomy cause immediate menopause?',
        answer: 'Not if your ovaries are kept intact! Healthy ovaries continue producing natural hormones until natural menopause.'
      },
      {
        question: 'How long do I need to rest?',
        answer: 'Hospital stay is 1 to 2 days. Light office work can resume in 2 weeks.'
      },
      {
        question: 'Is keyhole hysterectomy better than open surgery?',
        answer: 'Yes, tiny punctures mean significantly less pain, minimal scarring, and faster recovery.'
      },
      {
        question: 'Are non-surgical options evaluated first?',
        answer: 'Always. Hysterectomy is advised only after evaluating all non-surgical medical choices.'
      }
    ],
    seoTitle: 'Laparoscopic Hysterectomy (TLH) | Athree Hospital Bengaluru',
    seoDescription: 'Safe & advanced Total Laparoscopic Hysterectomy at Athree Hospital Bengaluru. Minimal pain, 24-48 hr discharge, experienced female doctors. Book consultation.',
    keywords: ['Hysterectomy consultation', 'Laparoscopic hysterectomy', 'TLH surgery', 'Uterus removal', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['uterine-fibroids', 'endometriosis', 'ovarian-cysts']
  },

  'lumbar-disc-prolapse': {
    id: 'lumbar-disc-prolapse',
    slug: 'lumbar-disc-prolapse',
    title: 'Lumbar Disc Prolapse Treatment',
    heroHeadline: 'Lumbar Disc Prolapse & Sciatica Treatment',
    categoryId: 'spine-orthopedics',
    categoryTitle: 'Spine Care',
    imageUrl: '/assets/treatments/lumbar-disc-prolapse.jpg',
    imageAlt: 'High-definition lumbar spine MRI scan showing disc prolapse and nerve compression evaluation at Athree Hospital',
    imageCaption: 'High-Resolution Lumbar MRI Scan',
    shortDesc: 'A prolapsed disc (slipped disc) presses on spinal nerves causing leg pain (sciatica). Non-surgical physical care & keyhole discectomy provide relief.',
    plainEnglishIntro: 'A lumbar disc prolapse (slipped disc) happens when the cushion between lower back bones bulges or tears, pinching nerves and triggering severe back pain and shooting leg pain (sciatica).',
    overview: 'Over 85% of slipped disc cases recover with physical therapy and pain blocks. For persistent compressed nerves, our spine team performs keyhole endoscopic microdiscectomy through an 8mm puncture, removing only the loose piece pressing on the nerve.',
    symptoms: [
      'Sharp or burning pain traveling down buttock, thigh, calf, and foot (Sciatica)',
      'Lower back pain that feels worse when sitting or bending',
      'Numbness, tingling, or "pins and needles" in your leg',
      'Weakness in leg or difficulty lifting foot',
      'Difficulty standing straight'
    ],
    whenToConsult: [
      'Leg pain or numbness stays for more than a few days',
      'Back pain radiates below knee to toes',
      'You experience sudden weakness in foot',
      'URGENT WARNING: Sudden loss of bowel or bladder control (Requires immediate ER evaluation)'
    ],
    diagnosisMethods: [
      'Physical Checkup: Reflex checks and leg raise tests.',
      'Lumbar MRI Scan: High-definition picture showing pinched nerve.',
      'Digital X-rays: Checks spine alignment.'
    ],
    treatmentOptions: [
      {
        type: 'Non-Surgical Care',
        title: 'Spine Physiotherapy & Medication',
        description: 'Core strengthening, traction, and nerve medicines curing over 85% of cases.'
      },
      {
        type: 'Targeted Injection',
        title: 'Epidural Nerve Block',
        description: 'Precision injection delivering anti-inflammatory medicine directly around pinched nerve.'
      },
      {
        type: 'Keyhole Spine Care',
        title: 'Keyhole Endoscopic Microdiscectomy',
        description: '8mm puncture procedure removing only the bulging disc piece pressing on nerve.'
      }
    ],
    whyChooseAthree: [
      'Dedicated Spine & Orthopedic Care Center',
      'Non-surgical care first philosophy (>85% recover without surgery)',
      'C-arm suite for precise nerve injections',
      'Keyhole endoscopic discectomy for fast recovery',
      'Integrated spine physical therapy'
    ],
    faqs: [
      {
        question: 'Does every slipped disc require surgery?',
        answer: 'No! Over 85% recover with non-surgical care and physical therapy.'
      },
      {
        question: 'What is sciatica pain?',
        answer: 'Sciatica is pain caused by a pinched nerve in the lower back radiating down the leg.'
      },
      {
        question: 'How does an epidural block help?',
        answer: 'It delivers concentrated anti-inflammatory medicine directly around the nerve root, stopping severe pain.'
      },
      {
        question: 'What is recovery time after keyhole disc surgery?',
        answer: 'Patients walk the same day, return home in 24 hours, and resume light office work in 1-2 weeks.'
      }
    ],
    seoTitle: 'Lumbar Disc Prolapse & Sciatica Treatment | Athree Hospital Bengaluru',
    seoDescription: 'Expert slipped disc & sciatica treatment at Athree Hospital Bengaluru. Non-surgical therapy, nerve blocks & keyhole endoscopic discectomy. Schedule consultation.',
    keywords: ['Lumbar disc prolapse treatment', 'Slipped disc treatment', 'Sciatica pain relief', 'Endoscopic discectomy', 'Athree Hospital spine Bengaluru'],
    relatedSlugs: ['cervical-disc-disease', 'vertebral-compression-fractures', 'hernia-repair']
  },

  'cervical-disc-disease': {
    id: 'cervical-disc-disease',
    slug: 'cervical-disc-disease',
    title: 'Cervical Disc Disease Treatment',
    heroHeadline: 'Cervical Disc Disease Evaluation & Care',
    categoryId: 'spine-orthopedics',
    categoryTitle: 'Spine Care',
    imageUrl: '/assets/treatments/cervical-disc-disease.jpg',
    imageAlt: 'Cervical spine digital radiography displaying cervical vertebrae and disc space for neck pain care at Athree Hospital',
    imageCaption: 'Digital Cervical Spine Radiography',
    shortDesc: 'Cervical disc disease involves bulging neck cushions pressing on nerves. Non-surgical neck physical care & nerve blocks relieve stiffness and arm numbness.',
    plainEnglishIntro: 'Cervical disc disease occurs when spinal cushions in your neck wear down or slip, pressing on nearby nerves and causing neck stiffness, shoulder ache, shooting arm pain, and hand numbness.',
    overview: 'At Athree Hospital, our spine team provides non-surgical posture correction, gentle neck traction, image-guided nerve blocks, and specialized physical rehabilitation to restore neck movement and eliminate arm numbness.',
    symptoms: [
      'Stiff neck with sharp or burning pain radiating into shoulder or arm',
      'Numbness, tingling, or "pins and needles" in forearm or fingers',
      'Weakness when lifting arm or reduced hand grip strength',
      'Neck pain worsening when turning or looking down',
      'Headaches originating from skull base'
    ],
    whenToConsult: [
      'Neck pain radiates down into shoulder or hand',
      'You notice progressive weakness in hand grip',
      'Numbness stays in fingers',
      'URGENT WARNING: Balance loss or walking clumsiness (May indicate neck cord pressure)'
    ],
    diagnosisMethods: [
      'Cervical MRI Scan: Shows neck discs and nerve exits.',
      'Nerve Test (NCV): Checks nerve signals in arm.',
      'Digital X-rays: Checks bone wear.'
    ],
    treatmentOptions: [
      {
        type: 'Non-Surgical Care',
        title: 'Cervical Spine Physical Care & Posture Training',
        description: 'Neck support, traction, strengthening exercises, and nerve inflammation medicines.'
      },
      {
        type: 'Targeted Injection',
        title: 'Cervical Nerve Block',
        description: 'C-arm injection delivering medicine directly around inflamed neck nerve roots.'
      },
      {
        type: 'Surgical Decompression',
        title: 'Keyhole Disc Care / Artificial Disc Replacement',
        description: 'For severe weakness, surgical disc removal followed by motion-preserving artificial disc replacement.'
      }
    ],
    whyChooseAthree: [
      'Specialized Cervical Spine Unit',
      'Non-invasive posture correction programs',
      'C-arm fluoroscopy suite for precise nerve blocks',
      'Motion-preserving artificial disc options',
      'Dedicated physical therapy guidance'
    ],
    faqs: [
      {
        question: 'Can neck pain and arm numbness be cured without surgery?',
        answer: 'Yes! The vast majority resolve with physical therapy, collar support, and medical nerve care.'
      },
      {
        question: 'What causes cervical disc bulging?',
        answer: 'Age-related wear, long device hours ("text neck"), or repetitive neck strain.'
      },
      {
        question: 'What is cervical radiculopathy?',
        answer: 'Pain or numbness felt in your arm when a neck nerve root is pinched.'
      },
      {
        question: 'When is surgery needed?',
        answer: 'Only if there is progressive arm/hand weakness or spinal cord compression.'
      }
    ],
    seoTitle: 'Cervical Disc Disease & Neck Pain Care | Athree Hospital Bengaluru',
    seoDescription: 'Comprehensive cervical disc disease treatment at Athree Hospital Bengaluru. Relief from neck pain, shoulder ache & arm numbness. Expert spine doctors.',
    keywords: ['Cervical disc disease treatment', 'Neck pain doctor', 'Arm numbness treatment', 'Cervical spine care', 'Athree Hospital Bengaluru'],
    relatedSlugs: ['lumbar-disc-prolapse', 'vertebral-compression-fractures', 'hernia-repair']
  },

  'vertebral-compression-fractures': {
    id: 'vertebral-compression-fractures',
    slug: 'vertebral-compression-fractures',
    title: 'Vertebral Compression Fracture Treatment',
    heroHeadline: 'Vertebral Compression Fracture Treatment',
    categoryId: 'spine-orthopedics',
    categoryTitle: 'Spine Care',
    imageUrl: '/assets/treatments/vertebral-compression-fractures.jpg',
    imageAlt: 'C-arm fluoroscopy image-guided balloon kyphoplasty and vertebroplasty suite for vertebral fractures at Athree Hospital',
    imageCaption: 'C-Arm Image-Guided Kyphoplasty Suite',
    shortDesc: 'A compression fracture occurs when weak spinal bone collapses. 20-minute needle-hole balloon kyphoplasty restores bone height and stops pain immediately.',
    plainEnglishIntro: 'A vertebral compression fracture happens when a spinal bone collapses or cracks, often due to osteoporosis (thin weak bones) or a minor slip. It causes sudden severe back pain and height loss.',
    overview: 'At Athree Hospital, we specialize in image-guided Balloon Kyphoplasty and Vertebroplasty. Through a tiny needle puncture, a small balloon restores bone height before medical bone cement stabilizes the bone, giving dramatic pain relief within hours.',
    symptoms: [
      'Sudden severe back pain after a minor slip, fall, or lift',
      'Back pain feeling worse when standing or walking',
      'Pain relief when lying flat on back',
      'Height loss and gradual rounding of upper back (stooping)',
      'Sharp pain when coughing or turning in bed'
    ],
    whenToConsult: [
      'An elderly family member with osteoporosis experiences sudden severe back pain',
      'Back pain makes standing or walking difficult',
      'You notice progressive rounding of upper back with bone tenderness',
      'Pain fails to improve after rest and tablets'
    ],
    diagnosisMethods: [
      'Spinal MRI Scan (STIR): Shows active bone swelling to differentiate fresh fractures.',
      'DEXA Bone Scan: Measures bone mineral density for osteoporosis.',
      'Digital Spine X-rays: Checks bone height.'
    ],
    treatmentOptions: [
      {
        type: 'Medical & Bracing',
        title: 'Spine Bracing & Osteoporosis Care',
        description: 'For minor hairline cracks, rest, spinal brace, and bone-building medicines.'
      },
      {
        type: '20-Minute Solution',
        title: 'Balloon Kyphoplasty',
        description: 'Micro-balloon restores bone height through a needle hole, then filled with bone cement for immediate relief.'
      },
      {
        type: 'Image-Guided Care',
        title: 'Vertebroplasty',
        description: 'Direct injection of medical bone cement into cracked bone under C-arm guidance.'
      }
    ],
    whyChooseAthree: [
      'Specialized Geriatric Spine Care Unit',
      'Needle-hole balloon kyphoplasty (no open cuts)',
      'Immediate pain relief with same-day home return',
      'Integrated DEXA bone density and osteoporosis care',
      'Rehabilitative support to get elderly walking safely'
    ],
    faqs: [
      {
        question: 'How quickly does balloon kyphoplasty relieve back pain?',
        answer: 'Most patients experience dramatic relief within hours and can stand and walk the same evening.'
      },
      {
        question: 'Is kyphoplasty safe for elderly patients?',
        answer: 'Yes! Done through tiny needle punctures under mild sedation, it is extremely safe.'
      },
      {
        question: 'How is bone cement placed safely?',
        answer: 'Live C-arm X-ray guidance monitors every millimeter of cement placement.'
      },
      {
        question: 'How do we prevent future fractures?',
        answer: 'We provide complete osteoporosis care including bone density scans, bone-building injections, and fall prevention.'
      }
    ],
    seoTitle: 'Vertebral Compression Fracture & Kyphoplasty | Athree Hospital Bengaluru',
    seoDescription: 'Rapid pain relief for spinal compression fractures at Athree Hospital Bengaluru. Advanced Balloon Kyphoplasty & Vertebroplasty. Expert spine doctors.',
    keywords: ['Vertebral compression fracture treatment', 'Kyphoplasty', 'Vertebroplasty', 'Osteoporosis back pain', 'Athree Hospital spine Bengaluru'],
    relatedSlugs: ['lumbar-disc-prolapse', 'cervical-disc-disease', 'hernia-repair']
  }
};

// Convenient alias for URL routing and backwards compatibility
TREATMENTS['appendix'] = TREATMENTS['appendicitis'];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. S. K. Srinivasa Rao',
    qualifications: 'MBBS, MS (General Surgery), FIAGES, FMAS',
    specialty: 'Senior Consultant Laparoscopic & GI Surgeon',
    categoryId: 'general-surgery',
    experienceYears: 18,
    consultationFee: '₹700',
    timings: 'Mon - Sat: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM',
    bio: 'Pioneer in 3D laparoscopic keyhole surgery, laser proctology (piles, fissure, fistula), and abdominal hernia mesh repair. Dedicated to evidence-based patient-centered surgical care.',
    imageAlt: 'Senior Laparoscopic Surgeon Dr. S. K. Srinivasa Rao'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Reddy',
    qualifications: 'MBBS, MD (Obstetrics & Gynecology), DNB, Fellowship in Gynecological Endoscopy',
    specialty: 'Senior Consultant Gynecologist & Laparoscopic Surgeon',
    categoryId: 'womens-health',
    experienceYears: 15,
    consultationFee: '₹700',
    timings: 'Mon - Sat: 11:00 AM – 4:00 PM',
    bio: 'Specialist in uterus-preserving laparoscopic myomectomy, ovarian cystectomies, endometriosis excision, and Total Laparoscopic Hysterectomy (TLH) with compassionate care.',
    imageAlt: 'Senior Gynecologist Dr. Ananya Reddy'
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikramaditya Verma',
    qualifications: 'MBBS, MS (Orthopedics), MCh (Spine Surgery), FICS',
    specialty: 'Senior Consultant Spine & Orthopedic Surgeon',
    categoryId: 'spine-orthopedics',
    experienceYears: 16,
    consultationFee: '₹800',
    timings: 'Mon - Sat: 9:00 AM – 1:00 PM & 4:00 PM – 7:00 PM',
    bio: 'Renowned spine specialist focusing on keyhole endoscopic discectomy, pain-relieving epidural nerve blocks, and minimally invasive balloon kyphoplasty for vertebral fractures.',
    imageAlt: 'Senior Spine Surgeon Dr. Vikramaditya Verma'
  }
];

export const HOSPITAL_FACILITIES = [
  {
    id: 'fac-1',
    title: 'Advanced 3D HD Keyhole Surgery Theatres',
    description: 'Ultra-modern sterile modular operating rooms equipped with 4K 3D keyhole cameras, Harmonic energy tools, and surgical air filtration.',
    badge: '3D Surgical Suite',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Modern sterile modular operating room for 3D keyhole surgery'
  },
  {
    id: 'fac-2',
    title: 'German Laser Proctology Suite',
    description: 'Dedicated state-of-the-art German laser therapy units for painless day-care hemorrhoid, fistula, and fissure procedures.',
    badge: 'Day-Care Unit',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Laser surgical facility and patient treatment equipment'
  },
  {
    id: 'fac-3',
    title: 'High-Precision Diagnostic & Radiology Center',
    description: 'In-house high-resolution Ultrasound (USG) with Doppler, C-arm fluoroscopy, digital X-rays, and automated pathology laboratory.',
    badge: '24/7 Diagnostics',
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Ultrasound and diagnostic medical imaging center at Athree Hospital'
  },
  {
    id: 'fac-4',
    title: 'Deluxe Patient Rooms & Intensive Care',
    description: 'Spacious private rooms, deluxe suites, and a fully monitored High Dependency Unit (HDU/ICU) with round-the-clock nursing staff.',
    badge: 'Premium Comfort',
    imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Clean, comfortable patient recovery suite with 24/7 nursing monitor'
  }
];

export const GENERAL_FAQS: FAQ[] = [
  {
    question: 'How do I book a consultation at Athree Hospital?',
    answer: 'You can easily book an appointment by filling out the online appointment form on this website, calling our helpline at +91 74835 20200, or messaging us directly on WhatsApp at +91 74835 20200.'
  },
  {
    question: 'What information should I bring to my appointment?',
    answer: 'Please bring any previous medical records, government photo ID, list of current medications, prior doctor consultation notes, ultrasound, X-ray, or MRI reports.'
  },
  {
    question: 'Which specialist doctor should I consult?',
    answer: 'Our appointment coordinators can guide you based on your symptoms: select General Surgery for stomach/groin/proctology issues, Women’s Health for gynecological concerns, or Spine Care for back/neck pain.'
  },
  {
    question: 'How are treatment options decided at Athree Hospital?',
    answer: 'Treatment decisions are made after a thorough clinical checkup, reviewing diagnostic reports, and discussing options openly with you. We prioritize non-surgical or keyhole options first.'
  },
  {
    question: 'How can I contact Athree Hospital for emergency or queries?',
    answer: 'Our emergency service operates 24/7. You can call our direct helpline at +91 74835 20200 or visit our hospital at Poornaprajna Layout, Uttarahalli Hobli, Bengaluru.'
  }
];

export const WHY_CHOOSE_US_REASONS = [
  {
    title: "Personalized Treatment Planning",
    description: "Every patient receives a customized care plan tailored to their specific diagnosis, medical history, and personal health goals."
  },
  {
    title: "Specialist Consultation",
    description: "Direct consultations with senior board-certified surgeons and specialists with extensive surgical expertise."
  },
  {
    title: "Clear Explanation of Treatment Options",
    description: "We explain medical conditions in plain, easy-to-understand language so you can make confident healthcare choices."
  },
  {
    title: "Patient-Centered Care",
    description: "Empathy, privacy, and patient comfort are at the center of every clinical service we provide."
  }
];
