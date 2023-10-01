import ProjectUploadForm from '@/data/ProjectUploadForm';

export default function AdminHomepage() {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-8'>
            Admin Home
            <ProjectUploadForm />
        </div>
    );
}
