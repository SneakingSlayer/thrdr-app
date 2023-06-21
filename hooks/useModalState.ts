import React from "react";
import { GlobalModalContext } from "@/components/modals/GlobalModalProvider";

const useModalState = () => {
  const { setModalId, modalId } = React.useContext(GlobalModalContext);
  const isOpen = (id: string): boolean => id === modalId;
  return { isOpen, setModalId, modalId };
};
export default useModalState;
