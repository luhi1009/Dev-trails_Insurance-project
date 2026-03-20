'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'bike',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    // Simulate signup delay
    setTimeout(() => {
      if (signup(formData.name, formData.email, formData.password, formData.phone, formData.vehicleType)) {
        router.push('/dashboard');
      } else {
        setError('Signup failed. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-12 h-12 bg-teal-600 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">PrimeProtect AI</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle>Join PrimeProtect AI</CardTitle>
            <CardDescription>Register as a delivery partner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4" autoComplete="off">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder=""
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  autoComplete="off"
                  placeholder=""
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="bike">Two-Wheeler (Bike)</option>
                  <option value="scooter">Scooter</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="car">Car</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-background"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-teal-700 text-white"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
