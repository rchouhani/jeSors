import { KeyboardTypeOptions } from 'react-native';

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

export interface InputCompProps {
    label: string | React.ReactNode;
    placeholder: string;
    value?: string;
    onChangeText: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    icon?: string | React.ReactNode;
    style?: string;
    labelStyle?: string;
    placeholderStyle?: string;
    }

export interface ButtonCompProps {
    label: string;
    style?: string;
    onPress?: string;
    icon?: string;
    redirectionRoute?: string;
    }