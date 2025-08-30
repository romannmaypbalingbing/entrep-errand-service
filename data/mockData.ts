import { User, Customer, Runner, Errand, PaymentMethod, Message, Review } from '@/types';

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    email: 'john@example.com',
    phone: '+639123456789',
    name: 'John Doe',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    verified: true,
    rating: 4.8,
    totalRatings: 24,
    createdAt: '2024-01-15T10:00:00Z',
    paymentMethods: [
      { id: 'pm-1', type: 'gcash', last4: '1234', isDefault: true },
      { id: 'pm-2', type: 'credit', last4: '5678', isDefault: false }
    ],
    address: '123 Makati Ave, Makati City'
  }
];

export const mockRunners: Runner[] = [
  {
    id: 'runner-1',
    email: 'maria@example.com',
    phone: '+639987654321',
    name: 'Maria Santos',
    role: 'runner',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    verified: true,
    rating: 4.9,
    totalRatings: 156,
    createdAt: '2024-01-10T08:00:00Z',
    vehicle: 'Motorcycle',
    availability: true,
    earnings: 25680.50,
    completedJobs: 89,
    location: {
      latitude: 14.5995,
      longitude: 120.9842
    }
  },
  {
    id: 'runner-2',
    email: 'carlos@example.com',
    phone: '+639876543210',
    name: 'Carlos Rodriguez',
    role: 'runner',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    verified: true,
    rating: 4.7,
    totalRatings: 98,
    createdAt: '2024-01-05T14:30:00Z',
    vehicle: 'Bicycle',
    availability: false,
    earnings: 18450.75,
    completedJobs: 67,
    location: {
      latitude: 14.6091,
      longitude: 121.0223
    }
  }
];

export const mockErrands: Errand[] = [
  {
    id: 'err-1',
    customerId: 'cust-1',
    runnerId: 'runner-1',
    title: 'Grocery Shopping',
    category: 'shopping-delivery',
    description: 'Need groceries from SM Supermarket',
    pickupAddress: 'SM Supermarket, Makati',
    dropoffAddress: '123 Makati Ave, Makati City',
    scheduledFor: '2024-01-20T15:00:00Z',
    status: 'in-progress',
    fee: 150,
    tip: 50,
    photos: ['https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=400'],
    instructions: 'Please buy organic vegetables if available',
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-01-20T14:15:00Z'
  },
  {
    id: 'err-2',
    customerId: 'cust-1',
    title: 'Pay Electricity Bill',
    category: 'bills-payment',
    description: 'Meralco bill payment at SM Business Center',
    pickupAddress: 'SM Business Center, BGC',
    dropoffAddress: 'SM Business Center, BGC',
    scheduledFor: '2024-01-21T10:00:00Z',
    status: 'posted',
    fee: 80,
    instructions: 'Account number: 1234567890',
    createdAt: '2024-01-20T16:30:00Z',
    updatedAt: '2024-01-20T16:30:00Z'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    errandId: 'err-1',
    senderId: 'cust-1',
    senderRole: 'customer',
    content: 'Hi! I\'m at the pickup location now.',
    timestamp: '2024-01-20T14:00:00Z',
    type: 'text'
  },
  {
    id: 'msg-2',
    errandId: 'err-1',
    senderId: 'runner-1',
    senderRole: 'runner',
    content: 'Great! I\'ll be there in 5 minutes.',
    timestamp: '2024-01-20T14:02:00Z',
    type: 'text'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    errandId: 'err-1',
    reviewerId: 'cust-1',
    revieweeId: 'runner-1',
    rating: 5,
    comment: 'Excellent service! Very professional and quick.',
    createdAt: '2024-01-20T17:00:00Z'
  }
];

export const categories = [
  { id: 'daily-essentials', name: 'Daily Essentials', icon: 'shopping-cart', color: '#3B82F6' },
  { id: 'bills-payment', name: 'Bills & Payment', icon: 'credit-card', color: '#10B981' },
  { id: 'home-chores', name: 'Home & Chores', icon: 'home', color: '#F59E0B' },
  { id: 'shopping-delivery', name: 'Shopping & Delivery', icon: 'package', color: '#EF4444' },
  { id: 'health-wellness', name: 'Health & Wellness', icon: 'heart', color: '#8B5CF6' },
  { id: 'personal-assistance', name: 'Personal Assistance', icon: 'user', color: '#06B6D4' },
  { id: 'quick-fix', name: 'Quick Fix', icon: 'wrench', color: '#F97316' },
  { id: 'custom', name: 'Custom Tasks', icon: 'plus', color: '#6B7280' }
];

export const paymentMethods = [
  { id: 'gcash', name: 'GCash', icon: 'smartphone', color: '#0066CC' },
  { id: 'maya', name: 'Maya', icon: 'credit-card', color: '#00D632' },
  { id: 'credit', name: 'Credit/Debit Card', icon: 'credit-card', color: '#6B7280' },
  { id: 'bank', name: 'Bank Transfer', icon: 'building', color: '#059669' }
];