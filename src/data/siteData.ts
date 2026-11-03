import heroIndustrialRoof from '../assets/images/hero_industrial_roof_1793709638957.jpg';
import aboutSteelRoof from '../assets/images/about_steel_roof_1793709640739.jpg';
import factoryRoofingSystem from '../assets/images/factory_roofing_system_1793709642226.jpg';
import metalSeamPanels from '../assets/images/metal_seam_panels_1793709643846.jpg';
import warehouseLogisticsRoof from '../assets/images/warehouse_logistics_roof_1793709644984.jpg';
import roofFrameInstall from '../assets/images/roof_frame_install_1793709645944.jpg';
import commercialRoofStructure from '../assets/images/commercial_roof_structure_1793709647224.jpg';
import roofVentDrainage from '../assets/images/roof_vent_drainage_1793709648140.jpg';

import {
  CompanyConfig,
  IndustryItem,
  ProcessStep,
  ProjectItem,
  ServiceItem,
} from '../types/site';

export const SITE_IMAGES = {
  hero: heroIndustrialRoof,
  about: aboutSteelRoof,
  factory: factoryRoofingSystem,
  metalPanels: metalSeamPanels,
  warehouse: warehouseLogisticsRoof,
  installation: roofFrameInstall,
  commercial: commercialRoofStructure,
  maintenance: roofVentDrainage,
};

export const INITIAL_COMPANY_CONFIG: CompanyConfig = {
  companyName: 'Kaustubh Roofing Industries Pvt. Ltd.',
  verifiedAddress:
    'No. 55, Gat, Dehu Alandi Road, Tukaram Nagar, Talawade Gaon, Talwade, Pimpri-Chinchwad, Maharashtra 411062.',
  shortLocation: 'Talwade, Pimpri-Chinchwad, Maharashtra 411062',
  // Unverified contact channels kept empty by default — editable live in Demo Customizer
  phone: '',
  whatsappNumber: '',
  email: '',
  businessHours: '',
  linkedinUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  showVerificationNotes: true,
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'industrial-roofing',
    number: '01',
    title: 'Industrial Roofing',
    description:
      'Roofing solutions for factories, manufacturing units and industrial facilities.',
    image: factoryRoofingSystem,
    imageAlt:
      'Wide architectural view of an industrial manufacturing plant featuring durable profiled metal roofing systems',
    suitableSpaces: 'Manufacturing plants, production sheds, heavy engineering units',
    proposedScopePoints: [
      'Assessment of span layout, structural framing, and operational roof requirements',
      'Selection of suitable roofing sheet profiles and weather-protection detailing',
      'Integration planning for natural daylight strips and roof ventilation openings',
    ],
  },
  {
    id: 'metal-roofing',
    number: '02',
    title: 'Metal Roofing',
    description:
      'Metal roofing applications for industrial and commercial structures.',
    image: metalSeamPanels,
    imageAlt:
      'Close-up architectural perspective of precision-ribbed coated metal roofing panels and ridge flashing',
    suitableSpaces: 'Industrial sheds, commercial complexes, structural canopies',
    proposedScopePoints: [
      'Profiled and standing-seam metal sheet evaluation based on building pitch',
      'Ridge caps, gable trims, and perimeter flashing alignment',
      'Fastener detailing and corrosion-conscious material discussion',
    ],
  },
  {
    id: 'warehouse-roofing',
    number: '03',
    title: 'Warehouse Roofing',
    description:
      'Roofing solutions for warehouses and large storage facilities.',
    image: warehouseLogisticsRoof,
    imageAlt:
      'Long-span logistics warehouse steel roof structure with translucent daylight skylights',
    suitableSpaces: 'Logistics hubs, cold/dry storage sheds, distribution centers',
    proposedScopePoints: [
      'Wide-span roof coverage planning to protect stored inventory and equipment',
      'Translucent skylight bay layout for balanced daytime interior illumination',
      'Rainwater guttering and downpipe routing for large roof catchment areas',
    ],
  },
  {
    id: 'roof-installation',
    number: '04',
    title: 'Roof Installation',
    description:
      'Professional roofing installation services for suitable building requirements.',
    image: roofFrameInstall,
    imageAlt:
      'New profiled metal roof panels aligned onto structural steel purlins during industrial installation',
    suitableSpaces: 'New greenfield industrial sheds, plant expansions, commercial structures',
    proposedScopePoints: [
      'Coordination with site civil and structural steel teams prior to sheet laying',
      'Systematic alignment of roofing sheets, ridge closures, and rainwater trims',
      'Organized site workflow suited to active industrial construction schedules',
    ],
  },
  {
    id: 'roof-replacement',
    number: '05',
    title: 'Roof Replacement',
    description:
      'Roofing replacement solutions for existing structures.',
    image: commercialRoofStructure,
    imageAlt:
      'Upgraded modern commercial industrial building featuring architectural metal roof envelope',
    suitableSpaces: 'Aging factory sheds, weathered industrial roofs, facility upgrades',
    proposedScopePoints: [
      'Inspection of existing roof condition, purlin health, and drainage bottlenecks',
      'Phased removal and re-sheeting planning to minimize disruption to facility operations',
      'Upgraded flashing, ridge sealing, and rainwater discharge improvements',
    ],
  },
  {
    id: 'roof-maintenance',
    number: '06',
    title: 'Roof Maintenance',
    description:
      'Roofing inspection and maintenance support to help maintain roof performance.',
    image: roofVentDrainage,
    imageAlt:
      'Maintained industrial metal rooftop with wind-driven turbo ventilators, clean ridge caps, and drainage box gutters',
    suitableSpaces: 'Operational factories, warehouses, pre-monsoon industrial readiness',
    proposedScopePoints: [
      'Periodic visual inspection of joints, fasteners, flashings, and skylight seals',
      'Gutter and stormwater channel clearing ahead of seasonal heavy rainfall',
      'Targeted sheet repair, sealant renewal, and ventilator checkups',
    ],
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    index: '01',
    title: 'Quality-Focused Work',
    description:
      'Careful attention to panel alignment, flashing closures, and weather-conscious detailing across every stage of roofing execution.',
  },
  {
    index: '02',
    title: 'Practical Roofing Solutions',
    description:
      'Clear, functional recommendations matched to actual building geometry, operational conditions, and project budgets.',
  },
  {
    index: '03',
    title: 'Industrial Application Understanding',
    description:
      'Familiarity with the everyday structural and operational priorities of factories, warehouses, and commercial sheds.',
  },
  {
    index: '04',
    title: 'Customer-Focused Approach',
    description:
      'Transparent communication from initial requirement discussion and site visit through scope planning and project completion.',
  },
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'manufacturing-factories',
    index: '01',
    title: 'Manufacturing & Factories',
    subtitle: 'Production floors, assembly plants, and MIDC industrial units',
    image: factoryRoofingSystem,
    imageAlt: 'Manufacturing plant complex with metal roofing systems',
    featured: true,
  },
  {
    id: 'warehousing-logistics',
    index: '02',
    title: 'Warehousing & Logistics',
    subtitle: 'Large-span storage hubs, fulfillment centers, and freight bays',
    image: warehouseLogisticsRoof,
    imageAlt: 'Large logistics warehouse interior and steel roof trusses',
    featured: true,
  },
  {
    id: 'industrial-infrastructure',
    index: '03',
    title: 'Industrial Infrastructure',
    subtitle: 'Utility enclosures, processing sheds, and industrial park facilities',
    image: heroIndustrialRoof,
    imageAlt: 'Modern industrial infrastructure building at golden hour',
  },
  {
    id: 'commercial-buildings',
    index: '04',
    title: 'Commercial Buildings',
    subtitle: 'Showrooms, business complexes, and institutional structures',
    image: commercialRoofStructure,
    imageAlt: 'Contemporary commercial building with cantilevered metal roof',
  },
  {
    id: 'engineering-facilities',
    index: '05',
    title: 'Engineering Facilities',
    subtitle: 'Fabrication workshops, tool rooms, and heavy machinery bays',
    image: aboutSteelRoof,
    imageAlt: 'Engineering facility featuring galvanized steel roof framing',
  },
  {
    id: 'industrial-construction',
    index: '06',
    title: 'Industrial Construction',
    subtitle: 'Partnering with EPC contractors and infrastructure developers',
    image: roofFrameInstall,
    imageAlt: 'Structural steel purlins and metal roof sheet installation site',
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-warehouse',
    title: 'Industrial Warehouse Roofing',
    category: 'Warehouse',
    description:
      'Illustrative concept showcasing long-span metal roof sheeting, integrated daylight strips, and perimeter rainwater guttering for storage facilities.',
    image: warehouseLogisticsRoof,
    imageAlt: 'Illustrative sample of an industrial warehouse metal roofing structure',
    isIllustrative: true,
  },
  {
    id: 'proj-factory',
    title: 'Factory Roofing Structure',
    category: 'Manufacturing',
    description:
      'Illustrative concept highlighting multi-bay factory roof coverage, ridge ventilation layout, and weather-protected loading canopies.',
    image: factoryRoofingSystem,
    imageAlt: 'Illustrative sample of a multi-bay factory metal roof complex',
    isIllustrative: true,
  },
  {
    id: 'proj-commercial',
    title: 'Commercial Roofing Project',
    category: 'Commercial',
    description:
      'Illustrative concept demonstrating clean architectural metal roof lines, fascia detailing, and durable commercial building protection.',
    image: commercialRoofStructure,
    imageAlt: 'Illustrative sample of an architectural commercial metal roof building',
    isIllustrative: true,
  },
  {
    id: 'proj-metal-install',
    title: 'Metal Roofing Installation',
    category: 'Metal Installation',
    description:
      'Illustrative concept depicting precision standing-seam and ribbed metal panel installation with weather-sealed ridge flashing.',
    image: metalSeamPanels,
    imageAlt: 'Illustrative sample of precision ribbed metal roof panel installation',
    isIllustrative: true,
  },
];

export const WORK_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Requirement Discussion',
    description: "Understand the customer's roofing requirements.",
  },
  {
    number: '02',
    title: 'Site Assessment',
    description: 'Evaluate the site and project requirements.',
  },
  {
    number: '03',
    title: 'Solution Planning',
    description: 'Discuss suitable roofing options and project execution.',
  },
  {
    number: '04',
    title: 'Project Execution',
    description: 'Proceed with the agreed work scope.',
  },
];
