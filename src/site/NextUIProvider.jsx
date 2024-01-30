'use client';

import { NextUIProvider } from '@nextui-org/react';

export default function NextUIProviderClient({ children }) {
    return <NextUIProvider>{children}</NextUIProvider>;
}
