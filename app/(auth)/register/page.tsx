'use client';

import { useState, SubmitEvent } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { register } from '@/app/lib/auth';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState('');

  const onHandleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      console.log(error);
    } else {
      await register({ email, password });
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white">
            Create an account
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Start managing your projects today.
          </p>
        </div>

        <form onSubmit={onHandleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-300">
              Full name
            </span>
            <input
              type="text"
              name="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-300">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
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
                placeholder="At least 8 characters"
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
            Create account
          </button>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-400">Already have an account?</span>
            <Link href={'/login'} className="text-sky-400 hover:text-sky-300">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
