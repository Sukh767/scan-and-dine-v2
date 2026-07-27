// ─── Mock Data — Scan & Dine Restaurant Admin ─────────────────

export const mockRestaurant = {
  id: '1',
  name: 'Ember & Oak',
  tagline: 'Where fire meets flavour',
  logo: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=200',
  phone: '+1 (415) 555-0142',
  email: 'hello@emberandoak.com',
  address: '42 Harbour Street, San Francisco, CA 94105',
  timezone: 'Pacific Time',
  currency: 'USD',
  isOpen: true,
  owner: { name: 'Marcus Webb', email: 'marcus@emberandoak.com', avatar: null },
};

// ─── Dashboard Stats ──────────────────────────────────────────
export const mockDashboardStats = {
  totalRevenue: 48300,
  revenueChange: 12.4,
  totalOrders: 1842,
  ordersChange: 8.2,
  avgOrderValue: 26.2,
  avgOrderChange: 4.1,
  totalCustomers: 1204,
  customersChange: 16.7,
};

export const mockRevenueData = [
  { date: 'Jan', revenue: 28400, orders: 1120 },
  { date: 'Feb', revenue: 31200, orders: 1240 },
  { date: 'Mar', revenue: 29800, orders: 1180 },
  { date: 'Apr', revenue: 35600, orders: 1420 },
  { date: 'May', revenue: 38200, orders: 1560 },
  { date: 'Jun', revenue: 42100, orders: 1680 },
  { date: 'Jul', revenue: 48300, orders: 1842 },
];

export const mockCategorySales = [
  { category: 'Mains', revenue: 24800, percentage: 51, color: '#f97316' },
  { category: 'Beverages', revenue: 11200, percentage: 23, color: '#eab308' },
  { category: 'Starters', revenue: 6800, percentage: 14, color: '#22c55e' },
  { category: 'Desserts', revenue: 3600, percentage: 8, color: '#3b82f6' },
  { category: 'Sides', revenue: 1850, percentage: 4, color: '#f53939' },
];

// ─── Tables ───────────────────────────────────────────────────
export const mockTables = [
  { id: 't1', tableNumber: 'T-01', capacity: 2, status: 'available', floor: 'Ground Floor', section: 'Window' },
  { id: 't2', tableNumber: 'T-02', capacity: 4, status: 'occupied', floor: 'Ground Floor', section: 'Main', activeSessionId: 's1' },
  { id: 't3', tableNumber: 'T-03', capacity: 4, status: 'available', floor: 'Ground Floor', section: 'Main' },
  { id: 't4', tableNumber: 'T-04', capacity: 6, status: 'reserved', floor: 'Ground Floor', section: 'Bar' },
  { id: 't5', tableNumber: 'T-05', capacity: 2, status: 'available', floor: 'Terrace Floor', section: 'Outdoor' },
  { id: 't6', tableNumber: 'T-06', capacity: 8, status: 'occupied', floor: 'Ground Floor', section: 'Private', activeSessionId: 's2' },
  { id: 't7', tableNumber: 'T-07', capacity: 2, status: 'out_of_service', floor: 'Ground Floor', section: 'Main' },
  { id: 't8', tableNumber: 'T-08', capacity: 4, status: 'available', floor: 'Terrace Floor', section: 'Outdoor' },
  { id: 't9', tableNumber: 'T-09', capacity: 4, status: 'occupied', floor: 'Upper Floor', section: 'Mezzanine', activeSessionId: 's3' },
  { id: 't10', tableNumber: 'T-10', capacity: 6, status: 'available', floor: 'Upper Floor', section: 'Mezzanine' },
];

// ─── Sessions ─────────────────────────────────────────────────
export const mockSessions = [
  {
    id: 's1', tableId: 't2', tableNumber: 'T-02',
    customerName: 'James Hartley', guestCount: 3,
    status: 'active', startedAt: new Date(Date.now() - 45 * 60000).toISOString(),
    totalAmount: 142.50,
  },
  {
    id: 's2', tableId: 't6', tableNumber: 'T-06',
    customerName: 'Sophie Chen', guestCount: 7,
    status: 'bill_requested', startedAt: new Date(Date.now() - 90 * 60000).toISOString(),
    totalAmount: 389.00,
  },
  {
    id: 's3', tableId: 't9', tableNumber: 'T-09',
    customerName: 'Guest', guestCount: 2,
    status: 'active', startedAt: new Date(Date.now() - 20 * 60000).toISOString(),
    totalAmount: 76.00,
  },
];

// ─── Live Notifications ───────────────────────────────────────
export const mockNotifications = [
  { id: 'n1', title: 'New Order', message: 'Table T-02 placed a new order — 3 items', type: 'info', isRead: false, createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'n2', title: 'Bill Requested', message: 'Table T-06 has requested the bill', type: 'warning', isRead: false, createdAt: new Date(Date.now() - 8 * 60000).toISOString() },
  { id: 'n3', title: 'Order Ready', message: 'Order #1842 is ready for service', type: 'success', isRead: false, createdAt: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'n4', title: 'New Review', message: 'Alexandra Reed left a 5-star review', type: 'success', isRead: true, createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: 'n5', title: 'Low Stock Alert', message: 'Bone marrow stock running low', type: 'warning', isRead: true, createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
];

// ─── Menu ─────────────────────────────────────────────────────
export const mockCategories = [
  { id: 'c1', name: 'Starters', itemCount: 8, isActive: true },
  { id: 'c2', name: 'Mains', itemCount: 14, isActive: true },
  { id: 'c3', name: 'Sides', itemCount: 6, isActive: true },
  { id: 'c4', name: 'Desserts', itemCount: 5, isActive: true },
  { id: 'c5', name: 'Beverages', itemCount: 12, isActive: true },
];

export const mockMenuItems = [
  { id: 'm1', categoryId: 'c1', categoryName: 'Starters', name: 'Charred Bone Marrow', description: 'Roasted bone marrow with sourdough crostini, capers, and gremolata', price: 18, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', isAvailable: true, isFeatured: true, isBestSeller: true, isVegetarian: false, isGlutenFree: false, spiceLevel: 0 },
  { id: 'm2', categoryId: 'c2', categoryName: 'Mains', name: 'Dry-Aged Ribeye 12oz', description: '28-day dry-aged prime ribeye with herb butter, roasted garlic, and seasonal vegetables', price: 58, image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400', isAvailable: true, isFeatured: true, isBestSeller: true, isVegetarian: false, isGlutenFree: true, spiceLevel: 1 },
  { id: 'm3', categoryId: 'c2', categoryName: 'Mains', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon-caper butter, asparagus, and fingerling potatoes', price: 36, image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400', isAvailable: true, isFeatured: false, isBestSeller: false, isVegetarian: false, isGlutenFree: true, spiceLevel: 0 },
  { id: 'm4', categoryId: 'c4', categoryName: 'Desserts', name: 'Burnt Caramel Crème Brûlée', description: 'Classic French custard with a perfectly torched caramelised sugar crust', price: 14, image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400', isAvailable: true, isFeatured: true, isBestSeller: false, isVegetarian: true, isGlutenFree: true, spiceLevel: 0 },
  { id: 'm5', categoryId: 'c5', categoryName: 'Beverages', name: 'Smoked Negroni', description: 'Gin, sweet vermouth, Campari, smoked with applewood chips', price: 16, image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=400', isAvailable: true, isFeatured: true, isBestSeller: true, isVegetarian: true, isGlutenFree: true, spiceLevel: 0 },
  { id: 'm6', categoryId: 'c3', categoryName: 'Sides', name: 'Truffle Fries', description: 'Hand-cut fries tossed in truffle oil with parmesan and herbs', price: 12, image: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&w=400', isAvailable: false, isFeatured: false, isBestSeller: false, isVegetarian: true, isGlutenFree: false, spiceLevel: 0 },
];

// ─── Orders ───────────────────────────────────────────────────
export const mockOrders = [
  { id: 'o1', tableNumber: 'T-02', items: ['Ribeye 12oz', 'Truffle Fries', 'Smoked Negroni'], status: 'preparing', time: '3 min ago', amount: 86 },
  { id: 'o2', tableNumber: 'T-05', items: ['Grilled Salmon', 'Bone Marrow'], status: 'pending', time: '1 min ago', amount: 54 },
  { id: 'o3', tableNumber: 'T-06', items: ['Crème Brûlée x2', 'Negroni x3'], status: 'ready', time: '12 min ago', amount: 76 },
  { id: 'o4', tableNumber: 'T-09', items: ['Ribeye x2', 'Truffle Fries x2'], status: 'pending', time: 'just now', amount: 140 },
  { id: 'o5', tableNumber: 'T-01', items: ['Salmon', 'Negroni'], status: 'served', time: '20 min ago', amount: 52 },
  { id: 'o6', tableNumber: 'T-03', items: ['Bone Marrow x2', 'Ribeye'], status: 'preparing', time: '8 min ago', amount: 94 },
];

// ─── QR Codes ─────────────────────────────────────────────────
export const mockQRCodes = mockTables.map((t, i) => ({
  id: `q${i + 1}`,
  tableId: t.id,
  tableNumber: t.tableNumber,
  tableStatus: t.status,
  scanCount: [47, 89, 63, 0, 34, 112, 5, 28, 76, 41][i] || 0,
  lastScannedAt: i < 3 ? new Date(Date.now() - (i + 1) * 3600000).toISOString() : null,
  isActive: t.status !== 'out_of_service',
}));

// ─── Analytics ────────────────────────────────────────────────
export const mockWeeklyOrders = [
  { day: 'Mon', orders: 98, revenue: 2450 },
  { day: 'Tue', orders: 134, revenue: 3360 },
  { day: 'Wed', orders: 156, revenue: 3900 },
  { day: 'Thu', orders: 178, revenue: 4450 },
  { day: 'Fri', orders: 245, revenue: 6125 },
  { day: 'Sat', orders: 312, revenue: 7800 },
  { day: 'Sun', orders: 189, revenue: 4725 },
];

export const mockTopItems = [
  { name: 'Dry-Aged Ribeye', orders: 284, revenue: 16472, category: 'Mains' },
  { name: 'Smoked Negroni', orders: 421, revenue: 6736, category: 'Beverages' },
  { name: 'Grilled Salmon', orders: 198, revenue: 7128, category: 'Mains' },
  { name: 'Charred Bone Marrow', orders: 165, revenue: 2970, category: 'Starters' },
  { name: 'Truffle Fries', orders: 312, revenue: 3744, category: 'Sides' },
];

export const mockHourlyTraffic = [
  { hour: '11am', covers: 12 }, { hour: '12pm', covers: 48 }, { hour: '1pm', covers: 62 },
  { hour: '2pm', covers: 38 }, { hour: '3pm', covers: 18 }, { hour: '4pm', covers: 14 },
  { hour: '5pm', covers: 29 }, { hour: '6pm', covers: 74 }, { hour: '7pm', covers: 98 },
  { hour: '8pm', covers: 86 }, { hour: '9pm', covers: 54 }, { hour: '10pm', covers: 22 },
];
