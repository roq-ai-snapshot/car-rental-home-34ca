interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Customer'],
  tenantRoles: ['Administrator', 'Vehicle Owner', 'End User', 'Reservation Manager', 'Performance Analyst'],
  tenantName: 'Administration',
  applicationName: 'Car Rental home',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View personal user information',
    'Make a reservation',
    'Use a vehicle',
    'View payment information',
  ],
  ownerAbilities: ['Manage payment', 'Manage users', 'Manage administration', 'Manage vehicles'],
  getQuoteUrl: 'https://app.roq.ai/proposal/985d2be2-f539-436f-92b8-85e9b1bfaab4',
};
