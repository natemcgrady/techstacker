"use client";

import React from "react";
import Frame from "./components/Frame";
import Controls from "./components/Controls";
import TechStackSelector from "./components/TechStackSelector";
import FrameContextStore from "./store/FrameContextStore";

import styles from "./code.module.css";
import NoSSR from "./components/NoSSR";

import ExportButton from "./components/ExportButton";
import { NavigationActions } from "@/components/navigation";

/**
 * Main TechStacker component that renders the application layout.
 * Provides frame context and handles client-side only rendering.
 */
export function TechStacker(): React.ReactElement {
  return (
    <FrameContextStore>
      {/* Fixed header with export actions */}
      <NavigationActions>
        <ExportButton />
      </NavigationActions>

      {/* Main application content */}
      <div className={styles.app}>
        <NoSSR>
          {/* Main content area with frame and controls */}
          <div className={styles.mainContent}>
            <Frame />
            <Controls />
          </div>

          {/* Sidebar with tech stack selector */}
          <TechStackSelector />
        </NoSSR>
      </div>
    </FrameContextStore>
  );
}
