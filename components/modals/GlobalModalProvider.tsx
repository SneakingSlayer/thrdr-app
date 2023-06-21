"use client";

import React from "react";

interface GlobalContextProps {
  modalId: string;
  setModalId: (modalId: string) => void;
}

export const GlobalModalContext = React.createContext<GlobalContextProps>({
  modalId: "",
  setModalId: () => {},
});

const GlobalModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalId, setModalId] = React.useState("");
  return (
    <GlobalModalContext.Provider value={{ modalId, setModalId }}>
      {children}
    </GlobalModalContext.Provider>
  );
};

export default GlobalModalProvider;
