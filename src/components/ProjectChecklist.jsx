import { isEmpty, isPlainObject, startCase } from 'lodash';
import { useState, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';
import { FinalProjectFormSchema } from '@/lib/validation';
import { cn } from '@/lib/utils';

const ProjectChecklistFields = {
    title: { required: true },
    description: { required: true },
    photos: { required: true },
    cover: { required: true },
    projectDate: { required: true, validator: (v) => !isNaN(v) },
    additionalInfo: {
        required: false,
        getValue: (list) => {
            if (!isEmpty(list['additionalInfo'])) return list['additionalInfo'];
            return list['additionalInfoFields'];
        },
        validator: (v) => {
            if (isPlainObject(v)) return true;
            const res = v.filter((e) => e.value.length > 0);
            return !isEmpty(res);
        },
    },
    tags: { required: false },
};

export const ProjectChecklist = ({ readMode, onPublish }) => {
    const values = useWatch();
    const [canPublish, setCanPublish] = useState(!readMode);
    const [publishChecklist, setPublishChecklist] = useState({});

    useEffect(() => {
        const result = FinalProjectFormSchema.safeParse(values);
        if (!result.success) {
            setPublishChecklist(
                _.keyBy(result.error.issues, (el) => el.path[0])
            );
            setCanPublish(false);
        } else {
            setPublishChecklist({});
            setCanPublish(true);
        }
    }, [values, readMode]);

    const CheckboxDisabled = ({ field, projectChecklistItem }) => {
        const data = publishChecklist[field];
        const { required, validator, getValue } = projectChecklistItem;
        const fieldValue = getValue ? getValue(values) : values[field];
        const hasValue = validator
            ? validator(fieldValue)
            : !isEmpty(fieldValue);
        const checked = !data && hasValue;
        return (
            <div className='grid grid-cols-[16px_1fr] w-full items-center align-middle gap-2'>
                <Icons.dot
                    color={hasValue ? 'green' : 'red'}
                    fill={hasValue ? 'green' : 'red'}
                    size={12}
                    className='self-center justify-self-center'
                />
                <div className='flex items-center align-middle gap-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger
                                asChild={true}
                                className={cn(
                                    'font-light rounded-full w-6 h-6 !border-primary',
                                    data && 'bg-red-600'
                                )}
                            >
                                {required ? (
                                    <Icons.required />
                                ) : (
                                    <Icons.optional />
                                )}
                            </TooltipTrigger>
                            <TooltipContent>
                                {required ? 'Required' : 'Optional'}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Label className='text-lg'>{startCase(field)}</Label>
                    {data && (
                        <Label className='text-lg'>
                            {startCase(data.message)}
                        </Label>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col gap-4 justify-between'>
            {!readMode && (
                <>
                    <div>
                        Publish Checklist
                        {(Object.entries(ProjectChecklistFields) || [])?.map(
                            ([field, projectChecklistItem], index) => {
                                return (
                                    <CheckboxDisabled
                                        key={`${index}_projectChecklist`}
                                        field={field}
                                        projectChecklistItem={
                                            projectChecklistItem
                                        }
                                    />
                                );
                            }
                        )}
                    </div>
                    <Button
                        type='button'
                        variant='default'
                        onClick={(e) => onPublish(e)}
                        disabled={!canPublish}
                    >
                        Publish &nbsp;
                        <Icons.publish />
                    </Button>
                </>
            )}
        </div>
    );
};
