import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { clamp } from '@/utility/helper';
import { cn } from '@/lib/utils';

export const ItemMover = ({
    swapItem,
    deleteItem,
    addItem,
    index,
    max,
    readMode,
    className,
}) => {
    return (
        <div className={cn('w-full flex justify-between', className)}>
            {swapItem && (
                <div className='flex gap-1'>
                    <Button
                        type='button'
                        onClick={() =>
                            swapItem(index, clamp(index - 1, 0, index))
                        }
                        className='h-[32px] w-[32px] px-0 py-0'
                        disabled={readMode || index === 0}
                    >
                        <Icons.chevronLeft className='h-[16px] w-[16px]' />
                    </Button>
                    <Button
                        type='button'
                        onClick={() =>
                            swapItem(index, clamp(index + 1, index, max - 1))
                        }
                        className='h-[32px] w-[32px] px-0 py-0'
                        disabled={readMode || index === max - 1}
                    >
                        <Icons.chevronRight className='h-[16px] w-[16px]' />
                    </Button>
                </div>
            )}
            {addItem && (
                <div className='flex gap-1'>
                    <Button
                        disabled={readMode}
                        type='button'
                        variant='destructive'
                        onClick={() => addItem(index)}
                        className='self-end h-[32px] w-[32px] px-0 py-0'
                    >
                        <Icons.plus className='h-[16px] w-[16px]' />
                    </Button>
                </div>
            )}
            {deleteItem && (
                <div className='flex gap-1'>
                    <Button
                        disabled={readMode}
                        type='button'
                        variant='destructive'
                        onClick={() => deleteItem(index)}
                        className='self-end h-[32px] w-[32px] px-0 py-0'
                    >
                        <Icons.cancel className='h-[16px] w-[16px]' />
                    </Button>
                </div>
            )}
        </div>
    );
};
