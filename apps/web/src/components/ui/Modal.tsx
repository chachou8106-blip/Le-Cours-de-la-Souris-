import React, { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[var(--light)] p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-2xl font-bold text-[var(--primary)] mb-4">
              {title}
            </Dialog.Title>
            {children}
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-[var(--secondary)] hover:text-[var(--primary)]"
                onClick={onClose}
              >
                ✕
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Transition.Child>
      </Transition.Root>
    </Dialog>
  );
};