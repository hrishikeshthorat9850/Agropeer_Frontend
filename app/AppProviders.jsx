"use client";

import { LoginProvider } from "@/Context/logincontext";
import CoreProviders from "@/components/providers/CoreProviders";
import FeatureProviders from "@/components/providers/FeatureProviders";

export default function AppProviders({ children }) {
  return (
    <LoginProvider>
      <CoreProviders>
        <FeatureProviders>{children}</FeatureProviders>
      </CoreProviders>
    </LoginProvider>
  );
}
