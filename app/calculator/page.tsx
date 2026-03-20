'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_TIERS } from '@/app/constants';
import { Subscription } from '@/app/types';

export default function CalculatorPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [monthlyRides, setMonthlyRides] = useState(20);
  const [averageDistance, setAverageDistance] = useState(8);
  const [riskFactors, setRiskFactors] = useState({
    traffic: false,
    weather: false,
    nightDeliveries: false,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const saved = localStorage.getItem('subscription');
    if (saved) {
      setSubscription(JSON.parse(saved));
    }
  }, [isLoggedIn, router]);

  if (!subscription) {
    return <div>Loading...</div>;
  }

  const currentTier = SUBSCRIPTION_TIERS.find((t) => t.id === subscription.tierId);

  // Calculate insurance payout
  const calculateInsurancePayout = () => {
    const baseCoverage = currentTier?.coverage || 10000;
    const medicalExpenses = baseCoverage * 0.4;
    const vehicleDamage = baseCoverage * 0.5;
    const lossOfEarnings =
      subscription.tierId !== 'tier_1' ? baseCoverage * 0.3 : 0;

    let riskAdjustment = 1;
    if (riskFactors.traffic) riskAdjustment *= 0.95;
    if (riskFactors.weather) riskAdjustment *= 0.9;
    if (riskFactors.nightDeliveries) riskAdjustment *= 0.85;

    return {
      baseCoverage: Math.round(baseCoverage * riskAdjustment),
      medicalExpenses: Math.round(medicalExpenses * riskAdjustment),
      vehicleDamage: Math.round(vehicleDamage * riskAdjustment),
      lossOfEarnings: Math.round(lossOfEarnings * riskAdjustment),
      totalCoverage: Math.round((baseCoverage + medicalExpenses + vehicleDamage + lossOfEarnings) * riskAdjustment),
      riskAdjustment: (riskAdjustment * 100).toFixed(1),
    };
  };

  const payout = calculateInsurancePayout();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const monthlyExpense = (currentTier?.monthlyPrice || 20) * 12;
  const avgMonthlyRiskReduction =
    payout.baseCoverage * 0.02; // Assuming 2% annual risk reduction

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="calculator" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Insurance Calculator</h1>
          <p className="text-muted-foreground">Calculate your potential insurance coverage and costs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Adjust parameters to calculate coverage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Monthly Rides: {monthlyRides}</label>
                  <Input
                    type="range"
                    min="5"
                    max="100"
                    value={monthlyRides}
                    onChange={(e) => setMonthlyRides(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">You typically make {monthlyRides} deliveries per month</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Avg Distance per Ride: {averageDistance}km
                  </label>
                  <Input
                    type="range"
                    min="2"
                    max="20"
                    value={averageDistance}
                    onChange={(e) => setAverageDistance(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Average distance covered per delivery
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Risk Factors</label>
                  <div className="space-y-2">
                    {[
                      {
                        key: 'traffic',
                        label: 'High Traffic Areas',
                        description: 'Delivery in congested areas',
                      },
                      {
                        key: 'weather',
                        label: 'Extreme Weather',
                        description: 'Rain, snow, or hot weather deliveries',
                      },
                      {
                        key: 'nightDeliveries',
                        label: 'Night Deliveries',
                        description: 'Deliveries after 8 PM',
                      },
                    ].map((factor) => (
                      <label key={factor.key} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={riskFactors[factor.key as keyof typeof riskFactors]}
                          onChange={(e) =>
                            setRiskFactors({
                              ...riskFactors,
                              [factor.key]: e.target.checked,
                            })
                          }
                          className="mt-1 w-4 h-4"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{factor.label}</p>
                          <p className="text-xs text-muted-foreground">{factor.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coverage Breakdown */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Your Coverage Breakdown</CardTitle>
                <CardDescription>Based on {currentTier?.name} plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold mb-1">
                      Medical Expenses
                    </p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {formatCurrency(payout.medicalExpenses)}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">40% of coverage</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-xs text-purple-600 dark:text-purple-400 uppercase font-semibold mb-1">
                      Vehicle Damage
                    </p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {formatCurrency(payout.vehicleDamage)}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">50% of coverage</p>
                  </div>

                  {subscription.tierId !== 'tier_1' && (
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-xs text-green-600 dark:text-green-400 uppercase font-semibold mb-1">
                        Loss of Earnings
                      </p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {formatCurrency(payout.lossOfEarnings)}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">30% of coverage</p>
                    </div>
                  )}

                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
                    <p className="text-xs text-orange-600 dark:text-orange-400 uppercase font-semibold mb-1">
                      Risk Adjustment
                    </p>
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {payout.riskAdjustment}%
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Based on your factors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Coverage */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl">Total Insurance Coverage</CardTitle>
                <CardDescription>Your potential payout in case of incident</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <p className="text-5xl font-bold text-primary">
                      {formatCurrency(payout.baseCoverage)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      With {payout.riskAdjustment}% risk adjustment applied
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-teal-600">
                        {(monthlyRides * 12).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Rides per year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {(averageDistance * monthlyRides * 12).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Total km/year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ₹{monthlyExpense.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Annual cost</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {monthlyRides > 50 && (
                  <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <span className="text-blue-600">💡</span>
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                        High delivery volume detected
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-200">
                        Consider upgrading to Premium plan for better coverage
                      </p>
                    </div>
                  </div>
                )}

                {Object.values(riskFactors).some((v) => v) && (
                  <div className="flex gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <span className="text-orange-600">⚠️</span>
                    <div>
                      <p className="font-medium text-orange-900 dark:text-orange-100 text-sm">
                        Risk factors identified
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-200">
                        Your coverage is reduced due to risk factors. Practice safety for better coverage
                      </p>
                    </div>
                  </div>
                )}

                {averageDistance > 15 && (
                  <div className="flex gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100 text-sm">
                        Long-distance routes
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-200">
                        Your coverage adequately protects long-distance deliveries
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
