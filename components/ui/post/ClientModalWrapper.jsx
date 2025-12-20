"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import EditPostModal from "./EditPostModal";

export default function ClientModalWrapper({ post, onUpdated }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const wasOpenedByNavigation = useRef(false);

  // Check if edit=true is in URL
  useEffect(() => {
    const editParam = searchParams.get("edit");
    const shouldBeOpen = editParam === "true";
    setIsOpen(shouldBeOpen);
    
    // Track if modal was opened via navigation (not direct URL)
    if (shouldBeOpen && !wasOpenedByNavigation.current) {
      // Check if we came from another page (history length > 1)
      if (typeof window !== "undefined" && window.history.length > 1) {
        wasOpenedByNavigation.current = true;
      }
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    
    // Remove edit param from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("edit");
    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}` 
      : pathname;
    
    // Use replace to avoid adding to history stack
    router.replace(newUrl);
    wasOpenedByNavigation.current = false;
  };

  if (!post) return null;

  return (
    <EditPostModal
      isOpen={isOpen}
      onOpenChange={handleClose}
      post={post}
      onUpdated={onUpdated}
    />
  );
}

