import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export const TagItem = ({
    tag = {},
    activeTags = [],
    addItem,
    readMode,
    withLine = true,
}) => {
    const { color, text, description } = tag;
    const isSelected = activeTags.findIndex((obj) => obj.id === tag.id) > -1;
    return (
        <div className='flex gap-1 items-center font-medium'>
            {addItem && (
                <Button
                    disabled={readMode || isSelected}
                    type='button'
                    variant='destructive'
                    onClick={() => addItem(tag)}
                    className={cn(
                        'self-end h-[32px] w-[32px] px-0 py-0 bg-green-500'
                    )}
                >
                    <Icons.plus className='h-[16px] w-[16px]' />
                </Button>
            )}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild={true}>
                        <span
                            className={cn(
                                withLine && 'underline underline-offset-4'
                            )}
                            style={{ color: color.toLowerCase() }}
                        >
                            #{text}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>{description}</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
