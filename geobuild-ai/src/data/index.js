// ============================================================
// Shared Demo Data Export
// ============================================================
export { DEMO_PROJECTS, DEMO_DETECTIONS, DEMO_SAMPLE_IMAGES, DEMO_ACTIVITY_LOG, DEMO_STATS, DEMO_CONFIDENCE_DISTRIBUTION, DEMO_BUILDING_AREA, DEMO_BUILDING_POLYGONS } from './demoData.js';

// Re-export as default bundle
export const demoData = {
  projects: [],
  detections: [],
  sampleImages: [],
  activityLog: [],
  stats: {},
  confidenceDistribution: [],
  buildingArea: [],
  buildingPolygons: []
};
