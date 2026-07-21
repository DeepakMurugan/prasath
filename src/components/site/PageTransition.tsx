import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useRouterState } from "@tanstack/react-router";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * PageTransition — sophisticated full-page fade + subtle rise on route change.
 * Wrap <Outlet /> once in the root component for fluid site-wide continuity.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
