import type { ComponentType, SVGProps } from 'react';
import {
  TopoIcon,
  ConstructionIcon,
  VolumeIcon,
  InspectIcon,
} from './components/Icons';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Central place to edit company details; keeps copy out of components.
export const COMPANY = {
  name: 'JDHoffman Aerial Solutions',
  tagline: 'Your trusted partner in aerial data',
  email: 'divviej1@gmail.com',
  phone: '+27 82 466 4967',
  phoneHref: 'tel:+27824664967',
  serviceArea: 'Pretoria, Krugersdorp & greater Gauteng · SACAA-certified, BVLOS-compliant',
  // WhatsApp click-to-chat: digits only, full international format (no +, spaces).
  whatsapp: '27824664967',
  whatsappMessage:
    "Hi JDHoffman Aerial Solutions, I'd like a quote for a drone survey or inspection. My site is located at:",
  facebook: 'https://www.facebook.com/profile.php?id=61586920223701',
};

// Single source of truth for the pre-filled WhatsApp click-to-chat URL.
export const WHATSAPP_LINK = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
  COMPANY.whatsappMessage,
)}`;

// Local lead-gen: regions we cover. Edit these to match your actual coverage.
export const SERVICE_AREA = {
  hub: 'Krugersdorp and Pretoria',
  radius: 'service radius across greater Gauteng',
  regions: [
    'Krugersdorp',
    'Tarlton',
    'Roodepoort',
    'Randburg',
    'Johannesburg',
    'Pretoria',
    'Centurion',
    'Midrand',
  ],
};

export interface Service {
  icon: Icon;
  title: string;
  blurb: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    icon: TopoIcon,
    title: 'Field & Topographic Surveys',
    blurb:
      'Survey-grade field data and contour maps from the air, delivered in the CAD and GIS formats your team already uses.',
    points: ['RTK/PPK accuracy', 'Contours, DTM & DSM', 'DWG, DXF, LAS, GeoTIFF'],
  },
  {
    icon: InspectIcon,
    title: 'Building & Tower Inspections',
    blurb:
      'High-resolution inspections of rooftops, towers, and remote structures. Find defects early and keep crews safely on the ground.',
    points: ['4K & thermal capture', 'Geo-tagged defects', 'No scaffolding or rope access'],
  },
  {
    icon: VolumeIcon,
    title: 'Aerial Mapping & Orthomosaics',
    blurb:
      'Precision orthomosaics, point clouds, and 3D models that turn a single flight into accurate, shareable site intelligence.',
    points: ['High-res orthomosaics', 'Point clouds & 3D models', 'Interactive web maps'],
  },
  {
    icon: ConstructionIcon,
    title: 'Construction & Site Monitoring',
    blurb:
      'Repeatable flights capture verifiable progress over time, keeping stakeholders aligned and projects on schedule.',
    points: ['Scheduled progress flights', 'Volumetric stockpiles', 'Design-vs-built overlays'],
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export const PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Plan & Permit',
    body: 'We scope deliverables, confirm airspace authorization, and lock ground control points before wheels up.',
  },
  {
    step: '02',
    title: 'Capture',
    body: 'Automated flight lines collect overlapping imagery and RTK/PPK positioning for repeatable, verifiable data.',
  },
  {
    step: '03',
    title: 'Process',
    body: 'Photogrammetry pipelines build point clouds, orthomosaics, and surface models with documented QA.',
  },
  {
    step: '04',
    title: 'Deliver',
    body: 'You receive ready-to-use CAD/GIS files and an interactive web map, typically within 48–72 hours.',
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: '1 cm', label: 'Survey-grade RTK accuracy' },
  { value: '4K', label: 'Thermal & visual capture' },
  { value: '48 hr', label: 'Typical turnaround' },
  { value: '100%', label: 'SACAA-compliant & BVLOS' },
];
