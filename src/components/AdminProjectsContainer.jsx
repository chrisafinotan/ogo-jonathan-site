import { AdminProjectCard } from '@/components/AdminProjectCard';

export const AdminProjectsContainer = async ({ projects = [] }) => {
    return (
        <>
            <AdminProjectCard showAsButton={true} />
            <div className='grid grid-cols-3 gap-2 max-w-7xl w-full border-2 justify-items-center'>
                {projects.map((project) => {
                    return (
                        <AdminProjectCard
                            key={`${project.id}_adminProjectCard`}
                            project={project}
                        />
                    );
                })}
            </div>
        </>
    );
};
