import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

// Pure-CSS page transition - no framer-motion dependency
const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <div className="animate-page-in">
            {children}
        </div>
    );
};

export default PageTransition;
