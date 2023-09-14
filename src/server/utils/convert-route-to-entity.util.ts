const mapping: Record<string, string> = {
  administrations: 'administration',
  payments: 'payment',
  'performance-assessments': 'performance_assessment',
  reservations: 'reservation',
  users: 'user',
  vehicles: 'vehicle',
  'vehicle-usages': 'vehicle_usage',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
