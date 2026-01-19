import { create } from "zustand";

/**
 * Toast notification type
 */
export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

/**
 * UI Store State
 */
interface UIState {
  // Loading states
  isLoading: boolean;
  loadingMessage: string | null;

  // Toasts
  toasts: Toast[];

  // Modals
  shareModalOpen: boolean;

  // Actions
  setLoading: (isLoading: boolean, message?: string) => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  openShareModal: () => void;
  closeShareModal: () => void;
}

/**
 * UI Store
 *
 * Manages global UI state like loading indicators, toasts, and modals
 */
export const useUIStore = create<UIState>((set) => ({
  // Initial State
  isLoading: false,
  loadingMessage: null,
  toasts: [],
  shareModalOpen: false,

  /**
   * Set loading state
   */
  setLoading: (isLoading, message) => {
    set({ isLoading, loadingMessage: message ?? null });
  },

  /**
   * Add a toast notification
   */
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Note: Auto-removal is handled by the Toast component
    // to allow for slide-out animation
  },

  /**
   * Remove a toast notification
   */
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  /**
   * Open share modal
   */
  openShareModal: () => {
    set({ shareModalOpen: true });
  },

  /**
   * Close share modal
   */
  closeShareModal: () => {
    set({ shareModalOpen: false });
  },
}));
