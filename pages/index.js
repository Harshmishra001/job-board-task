import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the app directory's home page
    router.push('/');
  }, [router]);

  return null;
}
