import { PageTransition } from "@/components/motion/page-transition";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
