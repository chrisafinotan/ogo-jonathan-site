'use client';

import { createContext } from 'react';

export const ProjectContext = createContext({});

export default function ProjectsProviderClient({ value, children }) {
    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}
