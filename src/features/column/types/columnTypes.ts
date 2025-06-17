import type {Nullable} from '@/shared';

export type categoryType = 'Граждане РФ' | 'Граждане стран ближнего зарубежья' | 'Граждане стран дальнего зарубежья';

export type visualizerDataType = {
    id: number;
    year: number;
    region: Nullable<string>;
    country: Nullable<string>;
    category: categoryType;
    withChildren: boolean;
    countTurist: number;
    countTuristBeforeYear: number;
};
