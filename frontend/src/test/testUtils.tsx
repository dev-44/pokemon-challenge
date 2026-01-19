/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/**
 * Wrapper with providers for testing
 */
function Wrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

/**
 * Custom render with providers
 */
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything else from testing library
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
