'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_TIERS } from '@/app/constants';
import { Subscription, SubscriptionTier } from '@/app/types';

export default function SubscriptionPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const saved = localStorage.getItem('subscription');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSubscription(parsed);
      setSelectedTierId(parsed.tierId);
    }
  }, [isLoggedIn, router]);

  const handleUpgrade = (tierId: string) => {
    if (subscription && tierId !== subscription.tierId) {
      const updated: Subscription = {
        ...subscription,
        tierId,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lastPaymentDate: new Date().toISOString().split('T')[0],
        nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      setSubscription(updated);
      setSelectedTierId(tierId);
      localStorage.setItem('subscription', JSON.stringify(updated));
    }
  };

  const toggleAutoRenew = () => {
    if (subscription) {
      const updated = {
        ...subscription,
        isAutoRenew: !subscription.isAutoRenew,
      };
      setSubscription(updated);
      localStorage.setItem('subscription', JSON.stringify(updated));
    }
  };

  if (!subscription) {
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

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="subscription" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Subscription Management</h1>
          <p className="text-muted-foreground">Choose your insurance plan and manage your subscription</p>
        </div>

        {/* Current Subscription */}
        {currentTier && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{currentTier.name} Plan</CardTitle>
                  <CardDescription>Your current active subscription</CardDescription>
                </div>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Coverage</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(currentTier.coverage)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Monthly Cost</p>
                  <p className="text-2xl font-bold text-foreground">₹{currentTier.monthlyPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Valid Till</p>
                  <p className="text-2xl font-bold text-foreground">{subscription.endDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Status</p>
                  <p className="text-2xl font-bold text-green-500">Active</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-border">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-2">Auto Renewal</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {subscription.isAutoRenew
                      ? 'Your subscription will automatically renew on the next payment date.'
                      : 'Your subscription will expire on the end date.'}
                  </p>
                  <Button
                    variant={subscription.isAutoRenew ? 'default' : 'outline'}
                    size="sm"
                    onClick={toggleAutoRenew}
                    className={subscription.isAutoRenew ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {subscription.isAutoRenew ? 'Auto Renewal On' : 'Enable Auto Renewal'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Plans */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <Card
                key={tier.id}
                className={`border-0 shadow-md transition-all ${
                  selectedTierId === tier.id ? 'ring-2 ring-primary shadow-lg' : ''
                } hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Monthly Premium
                      </p>
                      <p className="text-3xl font-bold text-primary">₹{tier.monthlyPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Coverage Amount
                      </p>
                      <p className="text-2xl font-bold text-accent">{formatCurrency(tier.coverage)}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-foreground text-sm">Coverage includes:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Accidental injuries
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Vehicle damage
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Medical expenses
                      </li>
                      {tier.id !== 'tier_1' && (
                        <li className="flex items-center gap-2">
                          <span className="text-primary">✓</span> Loss of earnings
                        </li>
                      )}
                      {(tier.id === 'tier_3' || tier.id === 'tier_4') && (
                        <li className="flex items-center gap-2">
                          <span className="text-primary">✓</span> Premium support
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleUpgrade(tier.id)}
                    variant={selectedTierId === tier.id ? 'default' : 'outline'}
                    className={`w-full ${
                      selectedTierId === tier.id
                        ? 'bg-primary hover:bg-teal-700 text-white'
                        : 'border-primary text-primary hover:bg-primary/10'
                    }`}
                  >
                    {selectedTierId === tier.id ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your subscription payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: subscription.lastPaymentDate,
                  amount: currentTier?.monthlyPrice,
                  status: 'Completed',
                },
                {
                  date: '2024-02-18',
                  amount: currentTier?.monthlyPrice,
                  status: 'Completed',
                },
                {
                  date: '2024-01-18',
                  amount: currentTier?.monthlyPrice,
                  status: 'Completed',
                },
              ].map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">{payment.date}</p>
                    <p className="text-sm text-muted-foreground">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{payment.amount}</p>
                    <Badge variant="outline" className="text-green-600">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insurance Calculator */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Insurance Calculator</CardTitle>
            <CardDescription>Estimate your insurance coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Quick Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Your Plan</p>
                    <p className="font-semibold text-foreground">{currentTier?.name}</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Base Coverage</p>
                    <p className="font-semibold text-foreground">{formatCurrency(currentTier?.coverage || 0)}</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Monthly Cost</p>
                    <p className="font-semibold text-foreground">₹{currentTier?.monthlyPrice}</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="text-foreground font-medium">Your Coverage</p>
                    <p className="font-bold text-primary">{formatCurrency(currentTier?.coverage || 0)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">What's Covered</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <div>
                      <p className="font-medium text-foreground">Medical Expenses</p>
                      <p className="text-sm text-muted-foreground">Up to 40% of coverage amount</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <div>
                      <p className="font-medium text-foreground">Vehicle Damage</p>
                      <p className="text-sm text-muted-foreground">Up to 50% of coverage amount</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <div>
                      <p className="font-medium text-foreground">Loss of Earnings</p>
                      <p className="text-sm text-muted-foreground">
                        {tier.id !== 'tier_1' ? 'Up to 30% of coverage amount' : 'Not included'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
