import { useSearchParams, useRouter } from 'next/navigation';

export default function RealisationsSearchParamsWrapper({ children }: { children: React.ReactNode }) {
  // This component is only for context if needed, but you can use useSearchParams here
  useSearchParams(); // This ensures the hook is called inside Suspense
  return <>{children}</>;
}
