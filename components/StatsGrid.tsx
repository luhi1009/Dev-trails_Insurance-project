'use client';

import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color || 'text-primary'}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color || 'bg-primary'}/10`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
