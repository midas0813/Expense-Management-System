export const users = [
  { id: 1, name: 'Tanaka Taro', role: 'employee', email: 'tanaka@company.com', password: 'pass123', status: 'active' },
  { id: 2, name: 'Suzuki Hanako', role: 'supervisor', email: 'suzuki@company.com', password: 'pass123', status: 'active' },
  { id: 3, name: 'Yamada Ichiro', role: 'president', email: 'yamada@company.com', password: 'admin123', status: 'active' },
  { id: 4, name: 'Sato Yuki', role: 'employee', email: 'sato@company.com', password: 'pass123', status: 'active' },
];

export const signupRequests = [
  { id: 1, name: 'Kobayashi Ken', email: 'kobayashi@company.com', password: 'pass123', requestedRole: 'employee', status: 'pending', date: '2026-04-15' },
];

export const expenses = [
  {
    id: 1,
    userId: 1,
    amount: 15000,
    reason: 'Client meeting lunch',
    status: 'approved',
    date: '2026-04-10',
    approvedBy: [2, 3],
    photoUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23f0f0f0" width="200" height="150"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3EReceipt Sample%3C/text%3E%3C/svg%3E',
  },
  {
    id: 2,
    userId: 4,
    amount: 50000,
    reason: 'New laptop for development',
    status: 'pending_president',
    date: '2026-04-12',
    approvedBy: [2],
    photoUrl: null,
  },
  {
    id: 3,
    userId: 1,
    amount: 8000,
    reason: 'Office supplies',
    status: 'pending_supervisor',
    date: '2026-04-14',
    approvedBy: [],
    photoUrl: null,
  },
];

export const suggestions = [
  {
    id: 1,
    userId: 1,
    title: 'Digital receipt system',
    description: 'Implement a system to automatically capture receipts via mobile app',
    category: 'efficiency',
    likes: 5,
    likedBy: [2, 3, 4],
    comments: [
      { id: 1, userId: 2, text: 'Great idea! This would save a lot of time.', date: '2026-04-11' }
    ],
    status: 'open',
    date: '2026-04-08',
  },
  {
    id: 2,
    userId: 4,
    title: 'Monthly expense limit alerts',
    description: 'Send notifications when approaching monthly budget limits',
    category: 'budget',
    likes: 3,
    likedBy: [1, 2],
    comments: [],
    status: 'open',
    date: '2026-04-12',
  },
];

export const supervisorRequests = [
  {
    id: 1,
    supervisorId: 2,
    topic: 'Remote work equipment',
    question: 'What equipment would improve your remote work productivity?',
    responses: [
      { id: 1, userId: 1, text: 'Better webcam and microphone', date: '2026-04-13' },
      { id: 2, userId: 4, text: 'Ergonomic chair', date: '2026-04-13' },
    ],
    date: '2026-04-12',
    status: 'open',
  },
];
