/**
 * Composant de chargement réutilisable avec animation de rotation
 * Utilise le même style que LoadingProvider
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  showText = false,
  text = 'Chargement en cours...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
  };

  const iconSizes = {
    sm: { width: 16, height: 16 },
    md: { width: 24, height: 24 },
    lg: { width: 40, height: 40 },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        {/* Rotating ring */}
        <div
          className={`absolute ${sizeClasses[size]} rounded-full border-4 border-transparent border-t-primary border-r-primary`}
          style={{
            animation: 'spin 2s linear infinite',
          }}
        />
        
        {/* Lightning icon */}
        <img
          src="/ilstr/eclair_01.svg"
          alt="Loading"
          width={iconSizes[size].width}
          height={iconSizes[size].height}
          className="z-10"
        />
      </div>
      
      {/* Text */}
      {showText && (
        <p className="text-sm font-futura text-secondary">
          {text}
        </p>
      )}
    </div>
  );
}
