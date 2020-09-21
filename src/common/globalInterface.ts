/**
 * Global interface defined.
 */
export interface PaginationOptions {
    page: number;   // current page number
    pageSize: number;   // the item number in one page
}

export interface FilterOptions {
    [key: string]: any;
}

export interface SorterOptions {
    field: string;
    order: 'ascend' | 'descend' | 'none';
}

export interface GridQueryOptions {
    category?: string | string[];  // the id of selected category
    keyword?: string;   // the keyword
    pagination?: PaginationOptions;   // the pagination pageParams
    filters?: FilterOptions;   // the filter params
    sorter?: SorterOptions;    // the sorter params
}

export interface UserInfo {
    id: number;                         // 用户id
    name: string;                       // 用户名
    profile: string;                    // 用户画像
}
