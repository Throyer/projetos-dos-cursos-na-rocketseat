import { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: PrimaryButtonProps) => (
  <button className="primary-button" {...props}>
    {children}
  </button>
)