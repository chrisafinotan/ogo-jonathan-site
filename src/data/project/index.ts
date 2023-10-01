// Core EXIF data
enum CoverTypes {
    PHOTO,
    VIDEO,
}

enum ProjectCategory {
    REGULAR,
    BRANDED,
}

type ProjectDescription = {
    value: string;
}
export type ProjectInfo = {
    published: boolean;
    date: number;
    title: string;
    cover: string;
    order?: number;
    tags?: string[];
    photos?: string[];
    description: ProjectDescription[];
    covertype: CoverTypes;
    category: ProjectCategory;
};
