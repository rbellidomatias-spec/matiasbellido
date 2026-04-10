"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  setModalOpen: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
