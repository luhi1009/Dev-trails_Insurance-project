'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { InsuranceCard } from '@/components/InsuranceCard';
import { StatsGrid } from '@/components/StatsGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SUBSCRIPTION_TIERS, MOCK_RIDES } from '@/app/constants';
import { Subscription, RideStats } from '@/app/types';
import Link from 'next/link';

const ICONS = {
  ride: '🚗',
  earnings: '💰',
  rating: '⭐',
  coverage: '🛡️',
};

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [rideStats, setRideStats] = useState<RideStats | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Load subscription from localStorage or create default
    const savedSubscription = localStorage.getItem('subscription');
    if (savedSubscription) {
      setSubscription(JSON.parse(savedSubscription));
    } else {
      const defaultSubscription: Subscription = {
        tierId: 'tier_1',
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isAutoRenew: true,
        lastPaymentDate: new Date().toISOString().split('T')[0],
        nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      setSubscription(defaultSubscription);
      localStorage.setItem('subscription', JSON.stringify(defaultSubscription));
    }

    // Calculate ride stats
    const stats: RideStats = {
      totalRides: MOCK_RIDES.length,
      totalDistance: MOCK_RIDES.reduce((sum, ride) => sum + ride.distance, 0),
      totalEarnings: MOCK_RIDES.reduce((sum, ride) => sum + ride.earnings, 0),
      averageRating: MOCK_RIDES.reduce((sum, ride) => sum + ride.rating, 0) / MOCK_RIDES.length,
    };
    setRideStats(stats);
  }, [isLoggedIn, router]);

  if (!subscription || !rideStats || !user) {
    return <div>Loading...</div>;
  }

  const currentTier = SUBSCRIPTION_TIERS.find((t) => t.id === subscription.tierId);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      label: 'Total Rides',
      value: rideStats.totalRides,
      icon: ICONS.ride,
      color: 'text-blue-500',
    },
    {
      label: 'Total Earnings',
      value: formatCurrency(rideStats.totalEarnings),
      icon: ICONS.earnings,
      color: 'text-green-500',
    },
    {
      label: 'Distance Covered',
      value: rideStats.totalDistance.toFixed(1) + ' km',
      icon: ICONS.coverage,
      color: 'text-purple-500',
    },
    {
      label: 'Avg Rating',
      value: rideStats.averageRating.toFixed(1),
      icon: ICONS.rating,
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            Here's your insurance and delivery overview for today.
          </p>
        </div>

        {/* Insurance Card */}
        {currentTier && (
          <InsuranceCard
            coverage={currentTier.coverage}
            status={subscription.status}
            tierName={currentTier.name}
            monthlyPrice={currentTier.monthlyPrice}
            nextPaymentDate={subscription.nextPaymentDate}
          />
        )}

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Quick Actions & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Insurance Details */}
          <Card className="lg:col-span-2 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Insurance Details</CardTitle>
              <CardDescription>Your current coverage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Plan Type</p>
                  <p className="text-lg font-semibold text-foreground">{currentTier?.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${subscription.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <p className="text-lg font-semibold text-foreground capitalize">
                      {subscription.status}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Coverage Amount</p>
                  <p className="text-lg font-semibold text-primary">{formatCurrency(currentTier?.coverage || 0)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Auto Renewal</p>
                  <p className="text-lg font-semibold text-foreground">
                    {subscription.isAutoRenew ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Next Payment Due</p>
                    <p className="font-semibold text-foreground">{subscription.nextPaymentDate}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs text-muted-foreground">Monthly Cost</p>
                    <p className="font-semibold text-foreground">₹{currentTier?.monthlyPrice}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/rides" className="w-full">
                <Button className="w-full bg-primary hover:bg-teal-700 text-white justify-start" variant="default">
                  View All Rides
                </Button>
              </Link>
              <Link href="/subscription" className="w-full">
                <Button className="w-full bg-accent hover:bg-cyan-600 text-white justify-start" variant="default">
                  Manage Subscription
                </Button>
              </Link>
              <Button className="w-full border-primary text-primary hover:bg-primary/10" variant="outline">
                Download Certificate
              </Button>
              <Button className="w-full border-primary text-primary hover:bg-primary/10" variant="outline">
                Claim Insurance
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Rides Preview */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Rides</CardTitle>
              <CardDescription>Your last 5 deliveries</CardDescription>
            </div>
            <Link href="/rides">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {MOCK_RIDES.slice(0, 3).map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{ride.restaurantName}</p>
                    <p className="text-xs text-muted-foreground">{ride.date} • {ride.distance}km • ₹{ride.earnings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-500">+₹{ride.earnings}</p>
                    <p className="text-xs text-muted-foreground">⭐ {ride.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
