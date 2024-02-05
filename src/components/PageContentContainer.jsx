export function PageContentContainer({ children }) {
    return (
        <div className='h-full'>{children}</div>
    );
}

export function AdminPageContentContainer({ children }) {
    return (
        <div className='min-h-[30rem] grid grid-cols-[150px_1fr] h-full relative'>
            {children}
        </div>
    );
}
