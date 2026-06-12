// src/types/components.ts
// On définit les Props pour rendre la pop-up personnalisable

export interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle?: string; // Optionnel
  details?: string; // Optionnel
  confirmText?: string; // Optionnel
  cancelText?: string; // Optionnel
}
