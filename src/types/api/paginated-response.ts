//import { components } from "../api";
// export type PaginatedResponsePrototype = components["schemas"]["PaginatedResponse"];

export type PaginationMetadadata = {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};
export type PaginatedResponsePrototype = {
    data: unknown[][];
    meta: PaginationMetadadata;
};
export type PaginatedResponse<T> = {
    data: T[];
    meta: PaginationMetadadata;
};

export type PaginationParams = { page?: number; pageSize?: number };
