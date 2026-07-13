import { getSession } from '@/app/actions/auth';
// import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getSession();
  console.log('dashboard session', session);
  // if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4">
        <section>
          <h1 className="text-2xl font-semibold text-white">
            Welcome, <span className="text-sky-400">{session?.name}</span>!
          </h1>
        </section>
      </main>
    </div>
  );
}
