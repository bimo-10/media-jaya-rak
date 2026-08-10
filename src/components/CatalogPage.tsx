import { forwardRef, type ReactNode } from "react";

interface CatalogPageProps {
  children: ReactNode;
  className?: string;
}

// react-pageflip clones each child and injects a ref to its root DOM node
const CatalogPage = forwardRef<HTMLDivElement, CatalogPageProps>(
  ({ children, className = "bg-white" }, ref) => (
    <div
      ref={ref}
      className={`flex h-full w-full flex-col overflow-hidden p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  ),
);

CatalogPage.displayName = "CatalogPage";

export default CatalogPage;
