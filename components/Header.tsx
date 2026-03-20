'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-foreground">PrimeProtect AI</h1>
            <p className="text-xs text-muted-foreground">Insurance Platform</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              currentPage === 'dashboard'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/rides"
            className={`text-sm font-medium transition-colors ${
              currentPage === 'rides'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Rides
          </Link>
          <Link
            href="/subscription"
            className={`text-sm font-medium transition-colors ${
              currentPage === 'subscription'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Subscription
          </Link>
          <Link
            href="/calculator"
            className={`text-sm font-medium transition-colors ${
              currentPage === 'calculator'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Calculator
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
            {user ? getInitials(user.name) : 'U'}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-border text-foreground hover:bg-muted"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
