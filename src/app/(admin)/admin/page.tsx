import { ProjectUploadForm } from '@/components/forms/ProjectUploadForm';
import { TagUploadForm } from '@/components/forms/TagUploadForm';
import { ProjectsContainer } from '@/components/ProjectsContainer';

export default async function AdminHomepage() {
    return (
        <div className='top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-8'>
            Admin Home
            <ProjectsContainer />
            <div className='flex w-full'>
                <ProjectUploadForm />
            </div>
            <div className='flex w-full'>
                <TagUploadForm />
            </div>
        </div>
    );
}
