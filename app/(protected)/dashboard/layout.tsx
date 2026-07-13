import { LogoutButton } from '@/app/components/LogoutButton';
import { getSession } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function getInitials() {
    const session = await getSession();
    if (!session?.name) return '';
    if (!session) redirect('/login');
    const parts = session.name.trim().split(/\s+/).filter(Boolean);
    return parts.map((part) => part[0]?.toUpperCase() ?? '').join(' ');
  }

  const initials = await getInitials();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="w-full border-b border-slate-800 bg-[#181818] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-md font-medium tracking-[0.04em] text-slate-100">
              Boardspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111b5f] text-xs font-semibold text-slate-100">
              {initials}
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
