'use client';

import { useState, SubmitEvent } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { login } from '@/app/lib/auth';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState('');

  const onHandleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ email, password });
    console.log(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white"> Welcome back</h3>
          <p className="mt-2 text-sm text-slate-400">Log in to your account.</p>
        </div>

        <form onSubmit={onHandleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-300">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-300">
              Password
            </span>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>

            <span className="text-red-400 text-sm">{error}</span>
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-600 px-4 py-3 font-medium text-white transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            Sign in
          </button>

          <p className="pt-2 text-center text-sm text-slate-400">
            No account yet?{' '}
            <Link
              href={'/register'}
              className="text-sky-400 hover:text-sky-300"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
