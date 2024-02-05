import Image from 'next/image';
import Link from 'next/link';
import { getShowcasePhotos, getProjectUrl } from '@/data/photo';
import { SocialsBar } from '@/components/SocialsBar';
import { CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return (
        <div className='m-2 ease-in-out duration-300 rounded-md'>
            <CardTitle className='flex w-full align-middle justify-center justify-items-center leading-none tracking-wide my-4'>
                OGO JONATHAN
            </CardTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2'>
                {showcasePhotos.map((photo) => {
                    const { id, url, title, projectId } = photo;
                    return (
                        <div
                            key={`showcase_${id}`}
                            className='group w-full rounded-md max-h-[80svh] lg:max-h-[100svh] relative aspect-[9/16] overflow-hidden'
                        >
                            {projectId && (
                                <Link
                                    href={getProjectUrl(projectId)}
                                    className=''
                                >
                                    <Image
                                        src={url}
                                        alt={`Showcase photo. Title: ${title}`}
                                        fill
                                        className='rounded-md object-cover bg-muted lg:ease-in-out lg:duration-500 lg:scale-[1.2] lg:group-hover:scale-[1]'
                                    />
                                    <div className='absolute bottom-0 font-light text-xs flex justify-center md:justify-start items-center m-2 bg-background align-middle'>
                                        <Icons.arrow className='lg:group-hover:-rotate-45 lg:ease-in-out lg:duration-300' />
                                        <div className='leading-none tracking-wide text-primary p-2 rounded-md'>
                                            {title}
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
            <SocialsBar className='justify-between mt-4' />
        </div>
    );
}
