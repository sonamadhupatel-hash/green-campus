import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, UserPlus, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { register, login, user, logout, navigateTo } = useApp();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!name.trim() || !email.trim() || !password) return setError('Please enter your name, email and password.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Please enter a valid email address.');
      if (password.length < 8) return setError('Password must be at least 8 characters.');
      if (password !== confirm) return setError('Passwords do not match.');
    } else if (!email.trim() || !password) {
      return setError('Please enter your email and password.');
    }

    setBusy(true);
    const res =
      mode === 'register' ? await register(name.trim(), email.trim(), password) : await login(email.trim(), password);
    setBusy(false);

    if (res.success) {
      setPassword('');
      setConfirm('');
      navigateTo('home');
    } else {
      setError(res.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
          <Leaf className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">You're signed in</h1>
        <p className="text-sm text-neutral-600">
          {user.name} · {user.email}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigateTo('home')} className="px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer">
            Go to Home
          </button>
          <button onClick={logout} className="px-4 py-2 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg cursor-pointer">
            Log out
          </button>
        </div>
      </div>
    );
  }

  const input =
    'w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500';

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-xs space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            {mode === 'register' ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {mode === 'register' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-xs text-neutral-500">
            {mode === 'register'
              ? 'Join Green Campus to track activities, ideas, quiz scores and Eco Points.'
              : 'Log in to see your activities, votes and Eco Points.'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {mode === 'register' && (
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="e.g. Priya Venkatesh" value={name} onChange={(e) => setName(e.target.value)} className={input} autoComplete="name" />
            </div>
          )}

          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input type="email" placeholder="priya.v@campus.edu" value={email} onChange={(e) => setEmail(e.target.value)} className={input} autoComplete="email" />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={input + ' pr-10'}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 cursor-pointer" aria-label={showPw ? 'Hide password' : 'Show password'}>
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input type={showPw ? 'text' : 'password'} placeholder="Re-enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} autoComplete="new-password" />
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {busy ? 'Please wait…' : mode === 'register' ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-600">
          {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setMode(mode === 'register' ? 'login' : 'register');
              setError('');
            }}
            className="font-semibold text-emerald-700 hover:underline cursor-pointer"
          >
            {mode === 'register' ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};
