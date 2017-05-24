/**
 * Global interface defined.
 */
export interface paginationOptions {
    page: number;   // current page number
    pageSize: number;   // the item number in one page
}

export interface filterOptions {
    [key: string]: any;
}

export interface sorterOptions {
    field: string;
    order: 'ascend' | 'descend' | 'none';
}

export interface GridQueryOptions {
    keyword?: string;   // the keyword
    pagination?: paginationOptions;   // the pagination pageParams
    filters?: filterOptions;   // the filter params
    sorter?: sorterOptions;    // the sorter params
}
