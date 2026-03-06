export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract Cradle / Leaf Shape */}
      <path 
        d="M20 50 C20 80 80 80 80 50 C60 50 40 50 20 50 Z" 
        fill="currentColor" 
      />
      
      {/* Nurturing Dot / Sun / Child figure head */}
      <circle 
        cx="50" 
        cy="35" 
        r="12" 
        fill="currentColor" 
        opacity="0.8"
      />

      {/* Wrapping protective leaf / arm */}
      <path 
        d="M10 50 C10 90 90 90 90 50" 
        stroke="currentColor" 
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};
