'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InsuranceCardProps {
  coverage: number;
  status: 'active' | 'inactive';
  tierName: string;
  monthlyPrice: number;
  nextPaymentDate: string;
}

export function InsuranceCard({
  coverage,
  status,
  tierName,
  monthlyPrice,
  nextPaymentDate,
}: InsuranceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">{tierName}</CardTitle>
            <CardDescription>Your current insurance plan</CardDescription>
          </div>
          <Badge
            variant={status === 'active' ? 'default' : 'secondary'}
            className={status === 'active' ? 'bg-green-500' : 'bg-gray-500'}
          >
            {status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Coverage Amount
            </p>
            <p className="text-3xl font-bold text-primary">{formatCurrency(coverage)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Monthly Premium
            </p>
            <p className="text-3xl font-bold text-accent">₹{monthlyPrice}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Next Payment Due</p>
          <p className="font-semibold text-foreground">{nextPaymentDate}</p>
        </div>

        <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2">How it works</p>
          <p className="text-sm text-foreground">
            Your ₹{monthlyPrice} monthly premium provides up to {formatCurrency(coverage)} in insurance
            coverage for accidental injuries and damage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
