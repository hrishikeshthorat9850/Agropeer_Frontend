"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PrefetchLink({ href, children, ...rest }) {
  const router = useRouter();

  const onEnter = useCallback(() => {
    try {
      router.prefetch(href);
    } catch (e) {
      // ignore
    }
  }, [href, router]);

  return (
    <Link href={href} onMouseEnter={onEnter} onFocus={onEnter} {...rest}>
      {children}
    </Link>
  );
}
