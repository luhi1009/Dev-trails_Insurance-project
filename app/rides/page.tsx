'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_RIDES } from '@/app/constants';
import { Ride } from '@/app/types';

export default function RidesPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [rides, setRides] = useState<Ride[]>([]);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setRides(MOCK_RIDES);
  }, [isLoggedIn, router]);

  const calculateStats = () => {
    return {
      totalRides: rides.length,
      totalDistance: rides.reduce((sum, ride) => sum + ride.distance, 0),
      totalEarnings: rides.reduce((sum, ride) => sum + ride.earnings, 0),
      avgRating: rides.length > 0 ? (rides.reduce((sum, ride) => sum + ride.rating, 0) / rides.length).toFixed(2) : 0,
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="rides" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Your Rides</h1>
          <p className="text-muted-foreground">Track all your deliveries and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Rides</p>
              <p className="text-3xl font-bold text-primary">{stats.totalRides}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Total Distance
              </p>
              <p className="text-3xl font-bold text-blue-500">{stats.totalDistance.toFixed(1)} km</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Total Earnings
              </p>
              <p className="text-3xl font-bold text-green-500">{formatCurrency(stats.totalEarnings)}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-500">{stats.avgRating}⭐</p>
            </CardContent>
          </Card>
        </div>

        {/* Rides Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>All your completed deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rides.map((ride) => (
                    <div
                      key={ride.id}
                      onClick={() => setSelectedRide(ride)}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{ride.restaurantName}</h3>
                          <p className="text-sm text-muted-foreground">{ride.date}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          +₹{ride.earnings}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Distance</p>
                          <p className="font-semibold text-foreground">{ride.distance}km</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-semibold text-foreground">{ride.duration}min</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Destination</p>
                          <p className="font-semibold text-foreground text-xs line-clamp-1">
                            {ride.deliveryAddress}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Rating</p>
                          <p className="font-semibold text-yellow-500">⭐{ride.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div>
            {selectedRide ? (
              <Card className="border-0 shadow-md sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Ride Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-b border-border pb-4">
                      <h3 className="font-bold text-lg text-foreground mb-2">
                        {selectedRide.restaurantName}
                      </h3>
                      <p className="text-sm text-muted-foreground">{selectedRide.date}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Destination</p>
                        <p className="text-sm font-medium text-foreground">{selectedRide.deliveryAddress}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Distance
                          </p>
                          <p className="text-lg font-bold text-primary">{selectedRide.distance}km</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Duration
                          </p>
                          <p className="text-lg font-bold text-blue-500">{selectedRide.duration}min</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Rating</p>
                        <p className="text-lg font-bold text-yellow-500">⭐ {selectedRide.rating}/5</p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Earnings</p>
                        <p className="text-2xl font-bold text-green-500">₹{selectedRide.earnings}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  Select a ride to view details
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
