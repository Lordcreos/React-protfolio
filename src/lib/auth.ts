import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const adminEmails = (process.env.ADMIN_EMAILS || 'lordcreos@gmail.com')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const resolveEmail = (value?: string | null) => (value || '').trim().toLowerCase();

export const requireAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const primaryEmail = user.emailAddresses.find(
    (email: { id: string; emailAddress: string }) => email.id === user.primaryEmailAddressId
  )?.emailAddress;
  const fallbackEmail = user.emailAddresses[0]?.emailAddress;
  const email = resolveEmail(primaryEmail || fallbackEmail);

  if (!email || !adminEmails.includes(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
};
