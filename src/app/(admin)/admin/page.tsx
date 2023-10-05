import { NewProjectForm } from '@/components/forms/NewProjectForm';
import { NewTagForm } from '@/components/forms/NewTagForm';

export default async function AdminHomepage() {
    return (
        <div className='w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-8'>
            Admin Home
            <NewProjectForm />
            <NewTagForm />
        </div>
    );
}
