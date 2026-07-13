'use client';

import { logout } from '@/app/actions/auth';

export function LogoutButton() {
  return (
    <button
      className="rounded-full border border-slate-500/70 px-4 py-1.5 text-sm font-medium text-slate-100 transition hover:border-slate-300 hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-slate-400/50"
      onClick={() => logout()}
    >
      Log out
    </button>
  );
}
