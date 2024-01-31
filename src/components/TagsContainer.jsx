import { TagCard } from '@/components/TagCard';
import { getAllTags } from '@/data/tag';

export const TagsContainer = async () => {
    const tags = await getAllTags();
    return (
        <>
            <TagCard showAsButton={true} />
            <div className='grid grid-cols-3 gap-2 max-w-7xl w-full border-2 justify-items-center'>
                {tags.map((tag) => (
                    <TagCard tag={tag} key={`${tag.id}_tagCard`} />
                ))}
            </div>
        </>
    );
};
