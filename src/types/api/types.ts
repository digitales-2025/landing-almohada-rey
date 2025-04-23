// export type BaseApiResponse<T = any> = Omit<components["schemas"]["BaseApiResponse"], "data"> & {
//   data: T;
// };

export type BaseApiResponse<T = any> = Omit<
    {
        success: boolean;
        message: string;
        data: Record<string, never> | null;
    },
    'data'
> & {
    data: T;
};
