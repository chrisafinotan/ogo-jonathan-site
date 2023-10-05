import { getProjectById } from '@/data/project';

type Props = {
    params: { projectId: string };
};

export default async function AdminProjectPage({
    params: { projectId },
}: Props) {
    const project = await getProjectById(projectId);
    console.log({ project });

    return (
        <div>
            Admin Project Page for {projectId}
            {Object.entries(project).map((el, index) => {
                return <div>{el[0]}: {String(el[1])}</div>;
            })}
        </div>
    );
}
