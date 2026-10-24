import React, { useEffect } from 'react';
import { ATHREE_HOSPITAL_CONFIG } from '../data/hospitalData';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: string;
  breadcrumbs?: { name: string; item: string }[];
  schemaData?: object;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = "Athree Hospital – Expert Care. Personal Attention. Better Health.",
  description = "Athree Hospital provides specialized care in Laparoscopic Surgery, Women's Health, and Spine Care. Book consultations online or via WhatsApp.",
  canonicalUrl,
  type = "website",
  breadcrumbs,
  schemaData
}) => {
  useEffect(() => {
    // Update Page Title
    document.title = title;

    // Helper function to update or create meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', ATHREE_HOSPITAL_CONFIG.name, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // Canonical Link
    const currentOrigin = window.location.origin;
    const currentPath = window.location.pathname;
    const canonical = canonicalUrl || `${currentOrigin}${currentPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // Dynamic JSON-LD Structured Data
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';

    const baseOrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": ATHREE_HOSPITAL_CONFIG.name,
      "legalName": ATHREE_HOSPITAL_CONFIG.parentCompany,
      "url": currentOrigin,
      "logo": `${currentOrigin}/assets/aistudio/ChatGPT_Image_Oct_22__2026__03_52_56_PM_bde6a733.jpg`,
      "description": ATHREE_HOSPITAL_CONFIG.tagline,
      "telephone": ATHREE_HOSPITAL_CONFIG.phone,
      "email": ATHREE_HOSPITAL_CONFIG.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ATHREE_HOSPITAL_CONFIG.address.street,
        "addressLocality": ATHREE_HOSPITAL_CONFIG.address.city,
        "addressRegion": ATHREE_HOSPITAL_CONFIG.address.state,
        "postalCode": ATHREE_HOSPITAL_CONFIG.address.pincode,
        "addressCountry": "IN"
      },
      "medicalSpecialty": [
        "GeneralSurgery",
        "Gynecology",
        "Orthopedic",
        "Gastroenterology"
      ]
    };

    let schemasToInject: any[] = [baseOrganizationSchema];

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": b.name,
          "item": b.item.startsWith('http') ? b.item : `${currentOrigin}${b.item}`
        }))
      };
      schemasToInject.push(breadcrumbSchema);
    }

    if (schemaData) {
      schemasToInject.push(schemaData);
    }

    script.text = JSON.stringify(schemasToInject);
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const s = document.getElementById('json-ld-schema');
      if (s) s.remove();
    };
  }, [title, description, canonicalUrl, type, breadcrumbs, schemaData]);

  return null;
};
