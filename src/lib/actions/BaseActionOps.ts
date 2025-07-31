import {
    GetOneResponse,
    GetResponse,
    MutationListResponse,
    MutationResponse,
    SearchByField,
} from '@/types/api/actions-crud';
import { http, ServerFetchConfig } from '../http/serverFetch';
import { RequestUri, ServerActionOperation } from './actionOperations';

export abstract class BaseActionOps<T> implements ServerActionOperation<T> {
    async get<V = T>(
        uri: RequestUri,
        config?: ServerFetchConfig
    ): Promise<GetResponse<V>> {
        try {
            const [data, error] = await http.get<GetResponse<V>>(
                uri,
                config,
                true
            ); //configured as a public request
            if (error) {
                return {
                    error:
                        typeof error === 'object' &&
                        error !== null &&
                        'message' in error
                            ? String(error.message)
                            : 'Error al obtener registros',
                };
            }
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async getOne<V = T>(
        uri: RequestUri,
        config?: ServerFetchConfig
    ): Promise<GetOneResponse<V>> {
        try {
            const [data, error] = await http.get<GetOneResponse<V>>(
                uri,
                config,
                true
            );
            if (error) {
                return {
                    error:
                        typeof error === 'object' &&
                        error !== null &&
                        'message' in error
                            ? String(error.message)
                            : 'Error al obtener el registro',
                };
            }
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async searchByFieldCoincidence<V = T>(
        uri: RequestUri,
        field: keyof V,
        value: string
    ): Promise<SearchByField<V>> {
        try {
            const [data, error] = await http.get<SearchByField<V>>(
                `${uri}?${String(field)}=${value}`
            );
            if (error) {
                return {
                    error: `Error al buscar registros: ${error.message}`,
                };
            }
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async getComplex<V = T>(
        uri: RequestUri,
        dto?: BodyInit | object
    ): Promise<GetResponse<V>> {
        try {
            const [data, error] = await http.getComplex<GetResponse<V>>(
                uri,
                dto
            );

            if (error) {
                return {
                    error: `Error al traer registros: ${error.message}`,
                };
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async create<V = T>(
        uri: RequestUri,
        dto?: BodyInit | object
    ): Promise<MutationResponse<V>> {
        try {
            const [data, error] = await http.post<MutationResponse<V>>(
                uri,
                dto
            );

            if (error) {
                return {
                    error: `Error al crear el registro: ${error.message}`,
                };
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async update<V = T>(
        uri: RequestUri,
        id: string,
        dto?: BodyInit | object
    ): Promise<MutationResponse<V>> {
        const localUri = `${uri}/${id}`;
        try {
            const [data, error] = await http.patch<MutationResponse<V>>(
                localUri,
                dto
            );

            if (error) {
                return {
                    error: `Error al actualizar el registro: ${error.message}`,
                };
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async delete<V = T>(
        uri: RequestUri,
        ids: string[]
    ): Promise<MutationListResponse<V>> {
        try {
            const deleteDto = {
                ids,
            };
            const [data, error] = await http.deleteMany<
                MutationListResponse<V>
            >(uri, deleteDto);

            if (error) {
                return {
                    error: `Error al eliminar el registro: ${error.message}`,
                };
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }

    async restore<V = T>(
        uri: RequestUri,
        ids: string[]
    ): Promise<MutationListResponse<V>> {
        try {
            const restoreDto = {
                ids,
            };
            const [data, error] = await http.patch<MutationListResponse<V>>(
                uri,
                restoreDto
            );

            if (error) {
                return {
                    error: `Error al restaurar el registro: ${error.message}`,
                };
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return {
                    error: error.message,
                };
            }
            return {
                error: 'Error desconocido',
            };
        }
    }
}

export function wrapUriWithParams<
    T extends Record<string, string | number | boolean>,
>({ uri, params }: { uri: string; params: T }) {
    const entries = Object.entries(params);
    const queryString = entries
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
    return `${uri}?${queryString}`;
}
