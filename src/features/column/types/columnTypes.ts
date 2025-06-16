import type {Nullable} from '@/shared';

export type visualizerDataType = {
    id: number;
    year: number;
    region: Nullable<string>;
    country: Nullable<string>;
    category: string;
    withChildren: boolean;
    countTurist: number;
    countTuristBeforeYear: number;
};
