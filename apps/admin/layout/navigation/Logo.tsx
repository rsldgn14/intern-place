import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Logo() {
  const router = useRouter();

  return (
    <Image
      style={{ cursor: 'pointer' }}
      onClick={() => router.push('/dashboard')}
      src={'/logo.png'}
      alt={'logo'}
      height={40}
      width={120}
    />
  );
}
