// Demo data for GeoBuild AI - Clearly labeled as DEMO/sample data
export const DEMO_PROJECTS = [
  {
    id: 'proj-001',
    name: 'Ahmedabad Urban Area',
    description: 'Building detection analysis for urban expansion study in Ahmedabad, Gujarat.',
    createdAt: '2026-09-01T10:30:00Z',
    updatedAt: '2026-09-20T14:15:00Z',
    status: 'active',
    imageCount: 5,
    detectionCount: 5,
    totalBuildings: 847,
    coverageArea: '12.4 km²',
    tags: ['urban', 'residential', 'commercial']
  },
  {
    id: 'proj-002',
    name: 'Mumbai Suburban Zone',
    description: 'Residential building density analysis for infrastructure planning.',
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-09-10T11:30:00Z',
    status: 'completed',
    imageCount: 3,
    detectionCount: 3,
    totalBuildings: 1243,
    coverageArea: '8.7 km²',
    tags: ['suburban', 'residential', 'high-density']
  },
  {
    id: 'proj-003',
    name: 'Delhi NCR Industrial Belt',
    description: 'Industrial facility mapping and built-up area assessment.',
    createdAt: '2026-07-20T14:00:00Z',
    updatedAt: '2026-08-05T16:45:00Z',
    status: 'active',
    imageCount: 7,
    detectionCount: 6,
    totalBuildings: 312,
    coverageArea: '22.1 km²',
    tags: ['industrial', 'commercial']
  },
  {
    id: 'proj-004',
    name: 'Bangalore Tech Corridor',
    description: 'Commercial and IT park building footprint extraction.',
    createdAt: '2026-09-10T08:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z',
    status: 'processing',
    imageCount: 2,
    detectionCount: 1,
    totalBuildings: 421,
    coverageArea: '5.3 km²',
    tags: ['commercial', 'tech-park']
  }
];

export const DEMO_DETECTIONS = [
  {
    id: 'det-001',
    projectId: 'proj-001',
    projectName: 'Ahmedabad Urban Area',
    imageName: 'ahmedabad_sector_7_sentinel2.jpg',
    date: '2026-09-20T14:15:00Z',
    status: 'completed',
    buildingCount: 247,
    confidence: 0.87,
    processingTime: 34.2,
    area: 3.2,
    mode: 'High Accuracy',
    model: 'Building Segmentation',
    isDemoData: true
  },
  {
    id: 'det-002',
    projectId: 'proj-001',
    projectName: 'Ahmedabad Urban Area',
    imageName: 'ahmedabad_residential_zone.png',
    date: '2026-09-15T11:00:00Z',
    status: 'completed',
    buildingCount: 189,
    confidence: 0.82,
    processingTime: 28.7,
    area: 2.8,
    mode: 'Balanced',
    model: 'Building Segmentation',
    isDemoData: true
  },
  {
    id: 'det-003',
    projectId: 'proj-002',
    projectName: 'Mumbai Suburban Zone',
    imageName: 'mumbai_dharavi_composite.jpg',
    date: '2026-09-10T11:30:00Z',
    status: 'completed',
    buildingCount: 643,
    confidence: 0.79,
    processingTime: 51.3,
    area: 4.1,
    mode: 'Balanced',
    model: 'Building Detection',
    isDemoData: true
  },
  {
    id: 'det-004',
    projectId: 'proj-003',
    projectName: 'Delhi NCR Industrial Belt',
    imageName: 'delhi_industrial_zone_A.tif',
    date: '2026-08-05T16:45:00Z',
    status: 'completed',
    buildingCount: 87,
    confidence: 0.91,
    processingTime: 42.8,
    area: 7.6,
    mode: 'High Accuracy',
    model: 'Building Segmentation',
    isDemoData: true
  },
  {
    id: 'det-005',
    projectId: 'proj-004',
    projectName: 'Bangalore Tech Corridor',
    imageName: 'blr_whitefield_north.jpg',
    date: '2026-09-25T10:00:00Z',
    status: 'processing',
    buildingCount: null,
    confidence: null,
    processingTime: null,
    area: null,
    mode: 'Fast',
    model: 'Building Detection',
    isDemoData: true
  },
  {
    id: 'det-006',
    projectId: 'proj-001',
    projectName: 'Ahmedabad Urban Area',
    imageName: 'ahmedabad_commercial_central.jpg',
    date: '2026-09-05T09:15:00Z',
    status: 'failed',
    buildingCount: null,
    confidence: null,
    processingTime: null,
    area: null,
    mode: 'Fast',
    model: 'Building Detection',
    isDemoData: true,
    errorMessage: 'Image resolution too low for reliable detection.'
  }
];

export const DEMO_SAMPLE_IMAGES = [
  {
    id: 'sample-urban',
    label: 'Urban Area (Dense)',
    description: 'High-density urban environment with mixed residential and commercial buildings.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Top_of_Haiku_Stairs.jpg/320px-Top_of_Haiku_Stairs.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Top_of_Haiku_Stairs.jpg/640px-Top_of_Haiku_Stairs.jpg',
    buildingCount: 247,
    confidence: 0.87,
    area: 3.2,
    processingTime: 34.2
  },
  {
    id: 'sample-residential',
    label: 'Residential Area',
    description: 'Suburban residential neighborhood with organized grid layout.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Biharwe-aerial.jpg/320px-Biharwe-aerial.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Biharwe-aerial.jpg/640px-Biharwe-aerial.jpg',
    buildingCount: 189,
    confidence: 0.82,
    area: 2.8,
    processingTime: 28.7
  },
  {
    id: 'sample-commercial',
    label: 'Commercial Zone',
    description: 'Commercial district with large building footprints and parking areas.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Adobe_Systems_HQ.jpg/320px-Adobe_Systems_HQ.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Adobe_Systems_HQ.jpg/640px-Adobe_Systems_HQ.jpg',
    buildingCount: 43,
    confidence: 0.93,
    area: 5.1,
    processingTime: 19.4
  },
  {
    id: 'sample-mixed',
    label: 'Mixed Use Area',
    description: 'Mixed land-use area with diverse building types and sizes.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Istanbul_panorama_1.jpg/320px-Istanbul_panorama_1.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Istanbul_panorama_1.jpg/640px-Istanbul_panorama_1.jpg',
    buildingCount: 312,
    confidence: 0.78,
    area: 6.4,
    processingTime: 45.1
  }
];

export const DEMO_ACTIVITY_LOG = [
  { id: 1, type: 'detection', message: 'Detection completed: ahmedabad_sector_7_sentinel2.jpg', time: '2026-09-20T14:15:00Z', status: 'success' },
  { id: 2, type: 'upload', message: 'Image uploaded: ahmedabad_residential_zone.png', time: '2026-09-15T10:50:00Z', status: 'info' },
  { id: 3, type: 'detection', message: 'Detection completed: mumbai_dharavi_composite.jpg', time: '2026-09-10T11:30:00Z', status: 'success' },
  { id: 4, type: 'project', message: 'New project created: Bangalore Tech Corridor', time: '2026-09-10T08:00:00Z', status: 'info' },
  { id: 5, type: 'detection', message: 'Detection failed: ahmedabad_commercial_central.jpg — Low resolution', time: '2026-09-05T09:20:00Z', status: 'error' },
  { id: 6, type: 'export', message: 'Results exported: delhi_industrial_zone_A analysis', time: '2026-08-05T17:10:00Z', status: 'success' },
  { id: 7, type: 'project', message: 'New project created: Delhi NCR Industrial Belt', time: '2026-07-20T14:00:00Z', status: 'info' }
];

export const DEMO_STATS = {
  totalImagesAnalyzed: 23,
  totalBuildingsDetected: 3067,
  projectsCreated: 4,
  detectionJobs: 18,
  avgConfidence: 0.84,
  avgProcessingTime: 36.5,
  successRate: 0.89
};

export const DEMO_CONFIDENCE_DISTRIBUTION = [
  { label: 'High (>90%)', value: 34, color: '#22c55e' },
  { label: 'Medium (70-90%)', value: 48, color: '#3b82f6' },
  { label: 'Low (<70%)', value: 18, color: '#f59e0b' }
];

export const DEMO_BUILDING_AREA = [
  { range: '<50 m²', count: 87 },
  { range: '50-100 m²', count: 142 },
  { range: '100-250 m²', count: 98 },
  { range: '250-500 m²', count: 43 },
  { range: '>500 m²', count: 21 }
];

// Demo GeoJSON polygons (NOT real coordinates — image coordinate mode)
export const DEMO_BUILDING_POLYGONS = [
  { id: 1, confidence: 0.94, area: 245, type: 'residential', bounds: [[23.02, 72.57], [23.025, 72.578]] },
  { id: 2, confidence: 0.87, area: 312, type: 'commercial', bounds: [[23.03, 72.58], [23.036, 72.589]] },
  { id: 3, confidence: 0.71, area: 189, type: 'residential', bounds: [[23.015, 72.565], [23.020, 72.572]] },
  { id: 4, confidence: 0.89, area: 421, type: 'commercial', bounds: [[23.04, 72.59], [23.047, 72.600]] }
];

export const demoData = {
  projects: DEMO_PROJECTS,
  detections: DEMO_DETECTIONS,
  sampleImages: DEMO_SAMPLE_IMAGES,
  activityLog: DEMO_ACTIVITY_LOG,
  stats: DEMO_STATS,
  confidenceDistribution: DEMO_CONFIDENCE_DISTRIBUTION,
  buildingArea: DEMO_BUILDING_AREA,
  buildingPolygons: DEMO_BUILDING_POLYGONS
};

