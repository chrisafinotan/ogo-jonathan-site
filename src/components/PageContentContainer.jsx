export function PageContentContainer({ children }) {
    return <div className='min-h-[16rem] sm:min-h-[30rem] grid'>{children}</div>;
}

export function AdminPageContentContainer({ children }) {
    return <div className='min-h-[30rem] grid grid-cols-[150px_1fr] h-full relative'>{children}</div>;
}