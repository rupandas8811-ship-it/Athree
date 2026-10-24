import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// In-memory appointment store
interface AppointmentRecord {
  id: string;
  patientName: string;
  mobileNumber: string;
  preferredDate: string;
  preferredTime?: string;
  treatmentId: string;
  treatmentTitle: string;
  notes?: string;
  consent: boolean;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

const appointmentsStore: AppointmentRecord[] = [];

// API Route: Create Appointment Request
app.post('/api/appointments', (req, res) => {
  const { patientName, mobileNumber, preferredDate, preferredTime, treatmentId, treatmentTitle, notes, consent } = req.body;

  if (!patientName || !mobileNumber || !preferredDate) {
    return res.status(400).json({
      success: false,
      message: 'Patient name, mobile number, and preferred date are required.'
    });
  }

  const newAppointment: AppointmentRecord = {
    id: `ATH-${Math.floor(100000 + Math.random() * 900000)}`,
    patientName: String(patientName).trim(),
    mobileNumber: String(mobileNumber).trim(),
    preferredDate: String(preferredDate),
    preferredTime: preferredTime ? String(preferredTime) : 'Morning (10:00 AM - 1:00 PM)',
    treatmentId: treatmentId ? String(treatmentId) : 'general',
    treatmentTitle: treatmentTitle ? String(treatmentTitle) : 'General Consultation',
    notes: notes ? String(notes).trim() : '',
    consent: Boolean(consent),
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  appointmentsStore.unshift(newAppointment);

  console.log(`[Athree Hospital] New Appointment Booked: ${newAppointment.id} for ${newAppointment.patientName} (${newAppointment.treatmentTitle})`);

  return res.status(201).json({
    success: true,
    message: 'Appointment request submitted successfully. Our hospital coordinator will contact you shortly.',
    appointment: newAppointment
  });
});

// API Route: Fetch Appointments (for staff review)
app.get('/api/appointments', (req, res) => {
  return res.json({
    success: true,
    count: appointmentsStore.length,
    appointments: appointmentsStore
  });
});

// XML Sitemap Route
app.get('/sitemap.xml', (req, res) => {
  const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
  const slugList = [
    '',
    'about',
    'contact',
    'privacy',
    'treatments/hernia-repair',
    'treatments/gallstones',
    'treatments/piles',
    'treatments/anal-fissure',
    'treatments/anal-fistula',
    'treatments/uterine-fibroids',
    'treatments/ovarian-cysts',
    'treatments/endometriosis',
    'treatments/hysterectomy',
    'treatments/lumbar-disc-prolapse',
    'treatments/cervical-disc-disease',
    'treatments/vertebral-compression-fractures'
  ];

  const urlElements = slugList
    .map(
      (slug) => `
    <url>
      <loc>${appUrl}/${slug}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${slug === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${slug === '' ? '1.0' : slug.startsWith('treatments') ? '0.9' : '0.7'}</priority>
    </url>`
    )
    .join('');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlElements}
  </urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xmlContent);
});

// Robots.txt Route
app.get('/robots.txt', (req, res) => {
  const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
  const robotsText = `User-agent: *
Allow: /

Sitemap: ${appUrl}/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(robotsText);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Athree Hospital] Server running on http://localhost:${PORT}`);
  });
}

startServer();
