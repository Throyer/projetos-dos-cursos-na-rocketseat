import React, { FC } from 'react';
import { SessionProvider } from './session';
import { ToastProvider } from './toast';

const Providers: FC = ({ children }) => (
    <SessionProvider>
        <ToastProvider>
            {children}
        </ToastProvider>
    </SessionProvider>
)

export default Providers;