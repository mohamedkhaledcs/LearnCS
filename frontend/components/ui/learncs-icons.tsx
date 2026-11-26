import React from "react";

export function LearnCSLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 80L50 95L80 80V50L50 35L20 50V80Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 35V65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 50L50 65L80 50" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="50" cy="35" r="6" fill="currentColor" />
      <circle cx="20" cy="50" r="4" fill="currentColor" />
      <circle cx="80" cy="50" r="4" fill="currentColor" />
      <circle cx="50" cy="95" r="4" fill="currentColor" />
      <circle cx="20" cy="80" r="4" fill="currentColor" />
      <circle cx="80" cy="80" r="4" fill="currentColor" />
      {/* Dynamic connection lines indicating "learning path" */}
      <path d="M50 65L50 95" stroke="currentColor" strokeWidth="4" strokeDasharray="4 4" strokeLinecap="round" />
    </svg>
  );
}

export function AssessmentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeOpacity="0.3" />
      <path d="M12 18V12" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 12L16 8" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <path d="M12 12L8 10" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" />
      <path d="M22 12H20" />
      <path d="M4 12H2" />
      <path d="M12 4V2" />
    </svg>
  );
}

export function KnowledgeGraphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="5" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="5" cy="14" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="19" cy="14" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="20" r="2" fill="currentColor" />
      <path d="M10.5 7.5L6.5 11.5" strokeOpacity="0.5" />
      <path d="M13.5 7.5L17.5 11.5" strokeOpacity="0.5" />
      <path d="M12 8V18" strokeDasharray="2 2" strokeOpacity="0.5" />
      <path d="M7.5 15.5L10.5 18.5" strokeOpacity="0.5" />
      <path d="M16.5 15.5L13.5 18.5" strokeOpacity="0.5" />
    </svg>
  );
}

export function AdaptiveEngineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16" strokeOpacity="0.3" />
      <path d="M12 16C9.79086 16 8 17.7909 8 20C8 22.2091 9.79086 24 12 24" strokeOpacity="0.3" />
      <path d="M12 8C9.79086 8 8 6.20914 8 4C8 1.79086 9.79086 0 12 0" strokeOpacity="0.3" />
      <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21" strokeDasharray="4 4" strokeOpacity="0.5" />
      <path d="M12 3V6" />
      <path d="M12 18V21" />
      <path d="M21 12H18" />
      <path d="M6 12H3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function PracticeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" strokeOpacity="0.3" />
      <path d="M8 10L5 13L8 16" />
      <path d="M16 10L19 13L16 16" />
      <path d="M13 8L11 18" strokeOpacity="0.5" />
      <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CareerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21H21" strokeOpacity="0.3" />
      <path d="M3 17L9 11L13 15L21 6" />
      <path d="M21 6V12" strokeOpacity="0.3" />
      <path d="M21 6H15" strokeOpacity="0.3" />
      <circle cx="21" cy="6" r="2" fill="currentColor" />
      <circle cx="13" cy="15" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="3" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AIHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2V6" strokeOpacity="0.5" />
      <path d="M12 18V22" strokeOpacity="0.5" />
      <path d="M4.93 4.93L7.76 7.76" strokeOpacity="0.5" />
      <path d="M16.24 16.24L19.07 19.07" strokeOpacity="0.5" />
      <path d="M2 12H6" strokeOpacity="0.5" />
      <path d="M18 12H22" strokeOpacity="0.5" />
      <path d="M4.93 19.07L7.76 16.24" strokeOpacity="0.5" />
      <path d="M16.24 7.76L19.07 4.93" strokeOpacity="0.5" />
      <rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
