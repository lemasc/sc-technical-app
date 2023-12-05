import { create } from "zustand";

type OverlayState = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  preventClose: boolean;
};

export const useOverlayState = create<OverlayState>((set, get) => ({
  open: false,
  setOpen: (open) => {
    const { preventClose } = get();
    if (!preventClose) {
      set({ open });
    }
  },
  preventClose: false,
}));
