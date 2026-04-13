import { create } from 'zustand';
import type { View } from '@/types';

interface NavigationState {
  currentView: View;
  selectedProductId: string | null;
  setView: (view: View) => void;
  setSelectedProduct: (productId: string | null) => void;
  goToHome: () => void;
  goToProduct: (productId: string) => void;
  goToCart: () => void;
  goToCheckout: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentView: 'home',
  selectedProductId: null,

  setView: (view) => set({ currentView: view }),

  setSelectedProduct: (productId) => set({ selectedProductId: productId }),

  goToHome: () => set({ currentView: 'home', selectedProductId: null }),

  goToProduct: (productId) =>
    set({ currentView: 'product', selectedProductId: productId }),

  goToCart: () => set({ currentView: 'cart', selectedProductId: null }),

  goToCheckout: () => set({ currentView: 'checkout', selectedProductId: null }),
}));
