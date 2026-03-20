export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  monthlyPrice: number;
  coverage: number;
  description: string;
}

export interface Subscription {
  tierId: string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  isAutoRenew: boolean;
  lastPaymentDate: string;
  nextPaymentDate: string;
}

export interface Ride {
  id: string;
  date: string;
  distance: number;
  duration: number;
  earnings: number;
  restaurantName: string;
  rating: number;
  deliveryAddress: string;
}

export interface RideStats {
  totalRides: number;
  totalDistance: number;
  totalEarnings: number;
  averageRating: number;
}
