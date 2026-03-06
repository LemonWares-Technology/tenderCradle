"use client";

import React from "react";

interface DoodleProps {
  className?: string;
  style?: React.CSSProperties;
}

export const StarDoodle = ({ className = "", style }: DoodleProps) => (
  <svg style={style} className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L18.5 12.5L28 16L18.5 19.5L16 30L13.5 19.5L4 16L13.5 12.5L16 2Z" fill="currentColor" opacity="0.6" />
  </svg>
);

export const CircleDoodle = ({ className = "", style }: DoodleProps) => (
  <svg style={style} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
  </svg>
);

export const SquiggleDoodle = ({ className = "", style }: DoodleProps) => (
  <svg style={style} className={className} width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10C10 2 20 18 30 10C40 2 50 18 60 10C70 2 78 18 78 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const DotsDoodle = ({ className = "", style }: DoodleProps) => (
  <svg style={style} className={className} width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 20, 40].map((x) =>
      [0, 20, 40].map((y) => (
        <circle key={`${x}-${y}`} cx={x + 10} cy={y + 10} r="3" fill="currentColor" opacity="0.25" />
      ))
    )}
  </svg>
);

export const HeartDoodle = ({ className = "", style }: DoodleProps) => (
  <svg style={style} className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 24C14 24 3 17 3 9.5C3 5 6 2.5 9.5 2.5C12 2.5 13.5 4 14 5C14.5 4 16 2.5 18.5 2.5C22 2.5 25 5 25 9.5C25 17 14 24 14 24Z" fill="currentColor" opacity="0.5" />
  </svg>
);

export const PlusDoodle = ({ className = "", style }: DoodleProps) => (
  <svg style={style} className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);
