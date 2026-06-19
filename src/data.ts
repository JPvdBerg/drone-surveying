import type { ComponentType, SVGProps } from 'react';
import {
  TopoIcon,
  ConstructionIcon,
  VolumeIcon,
  InspectIcon,
} from './components/Icons';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Central place to edit company details — keeps copy out of components.
export const COMPANY = {
  name: 'Apex Aerial Survey',
  tagline: 'Survey-grade aerial intelligence',
  email: 'surveys@apexaerial.example',
  phone: '+1 (555) 014-2280',
  phoneHref: 'tel:+15550142280',
  serviceArea: 'Nationwide · FAA Part 107 certified',
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
    title: 'Topographic Mapping',
    blurb:
      'High-density point clouds and contour maps with survey-grade accuracy, delivered in the CAD and GIS formats your team already uses.',
    points: ['1–2 cm RTK accuracy', 'Contours, DTM & DSM', 'DWG, DXF, LAS, GeoTIFF'],
  },
  {
    icon: ConstructionIcon,
    title: 'Construction Site Monitoring',
    blurb:
      'Repeatable flight paths capture verifiable progress over time, keeping stakeholders aligned and projects on schedule.',
    points: ['Scheduled progress flights', 'Design-vs-built overlays', 'Shareable web maps'],
  },
  {
    icon: VolumeIcon,
    title: 'Volumetric Calculations',
    blurb:
      'Accurate stockpile and earthwork volumes from a single flight — reconcile inventory and cut/fill without closing the site.',
    points: ['Stockpile inventory', 'Cut & fill analysis', 'Auditable reports'],
  },
  {
    icon: InspectIcon,
    title: 'Asset & Infrastructure Inspection',
    blurb:
      'Centimeter-resolution imagery of roofs, towers, and corridors — find defects early and keep crews off ladders.',
    points: ['4K & thermal capture', 'Geo-tagged defects', 'No-disruption access'],
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
  { value: '1 cm', label: 'Positional accuracy (RTK)' },
  { value: '500+', label: 'Sites surveyed' },
  { value: '48 hr', label: 'Typical turnaround' },
  { value: '100%', label: 'FAA Part 107 compliant' },
];
