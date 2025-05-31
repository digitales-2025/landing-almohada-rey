import { cookies } from 'next/headers';

import { envs } from '@/config/envs';
import { Result } from './result';

// Configuración extendida para las peticiones
export interface ServerFetchConfig extends RequestInit {
    body?: BodyInit;
    params?: Record<string, string | number>;
    headers?: Record<string, string>;
    /** Número máximo de reintentos para errores temporales */
    maxRetries?: number;
    /** Tiempo base entre reintentos (ms) */
    retryDelay?: number;
}

export type ServerFetchError = {
    statusCode: number;
    message: string;
    error: string;
};

/**
 * Permite utilizar un objeto plano como body
 */
function processBody(
    body: BodyInit | object | undefined
): BodyInit | undefined {
    if (
        body instanceof Blob ||
        body instanceof ArrayBuffer ||
        body instanceof FormData ||
        body instanceof URLSearchParams ||
        body instanceof ReadableStream
    ) {
        return body;
    } else {
        return JSON.stringify(body);
    }
}

/**
 * Realiza una petición al backend y devuelve un Result.
 *
 * Un Result es una tupla que contiene uno de dos casos:
 * - Si la petición es exitosa (codigo 2xx) la tupla contiene `[datos, null]`
 * - Si la petición falla la tupla contiene `[null, ServerFetchError]`
 *
 * `ServerFetchError` es un objeto que contiene {statusCode, message, error}
 *
 * @example
 * ```ts
 * const [user, err] = await serverFetch<User>("/users/123")
 * if (err !== null) {
 *     // Manejar error
 *     return not_found();
 * }
 * // Utilizar `user`
 * return <p>Hola {user.name}</p>
 * ```
 *
 * IMPORTANTE: Si la API no responde, o hubo algun otro error, esta funcion devuelve `{statusCode: 503}`
 *
 * IMPORTANTE: Esta funcion no refresca cookies de sesion. Esta función asume
 * que la cookie `access_token` existe y es válida. El refresco de
 * tokens se realiza en el middleware.
 *
 * @type Success El tipo de dato que el API devuelve
 * @param url La URL a hacer la petición
 * @param options Opciones enviadas a fetch
 * @returns Una tupla con los datos, o un error
 *
 */
export async function serverFetch<Success>(
    url: string,
    options?: ServerFetchConfig,
    publicRequest: boolean = false
): Promise<Result<Success, ServerFetchError>> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    console.log("fetching debug ===============================")
    console.log(envs.BACKEND_URL)
    console.log(url)
    console.log("fetching debug ===============================\n\n")

    if (!accessToken && !publicRequest) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                'DEBUG: Intentando user serverFetch sin una cookie `access_token valida`'
            );
        }
    }

    try {
        let fullUrl = `${envs.BACKEND_URL}${url}`;

        if (options?.params) {
            const queryParams = new URLSearchParams();
            Object.entries(options.params).forEach(([key, value]) => {
                queryParams.append(key, String(value));
            });

            // Agregar los parámetros a la URL
            const queryString = queryParams.toString();
            if (queryString) {
                fullUrl += (url.includes('?') ? '&' : '?') + queryString;
            }
        }

        const response = await fetch(fullUrl, {
            ...options,
            headers: {
                ...options?.headers,
                Cookie: `access_token=${accessToken}`,
            },
        });

        if (!response.ok) {
            const data = (await response.json()) as Partial<ServerFetchError>;
            return [
                // @ts-expect-error allowing null
                null,
                {
                    statusCode: response.status,
                    message: data.message ?? 'API no disponible',
                    error: data.error ?? 'Error desconocido',
                },
            ];
        }

        try {
            const data = await response.json();
            return [data, null];
        } catch (e) {
            console.error("Error while fetching:") 
            console.error(e)
            return [
                // @ts-expect-error allowing null
                null,
                null,
            ];
        }
    } catch (e) {
            console.error("Error while fetching (fetch error):") 
            console.error(e)
        return [
            // @ts-expect-error allowing null
            null,
            {
                statusCode: 503,
                message: 'Error de backend',
                error: 'Error de backend',
            },
        ];
    }
}

/**
 * Objeto que proporciona métodos para realizar peticiones HTTP
 */
export const http = {
    /**
     * Realiza una petición GET
     * @param url - La URL a la que se realizará la petición
     * @param config - Configuración opcional para la petición fetch
     * @returns Una promesa que resuelve con los datos de tipo T, o un error
     * @example
     * ```ts
     * const [data, err] = await http.get<User>("/users/");
     * ```
     */
    get<T>(
        url: string,
        config?: Omit<ServerFetchConfig, 'body'>,
        publicRequest?: boolean
    ) {
        if (publicRequest) {
            return serverFetch<T>(url, { ...config }, true);
        }
        return serverFetch<T>(url, { ...config });
    },

    /**
     * Perform a complex HTTP GET operation by sending a POST request with a body
     *
     * @template T - The expected return type from the server
     * @param {string} url - The endpoint URL
     * @param {BodyInit | object} [body] - Optional request body
     * @param {RequestInit} [config] - Optional fetch configuration
     * @returns {Promise<Result<T, ServerFetchError>>} A Result containing either the successful response data or an error
     */
    getComplex<T>(
        url: string,
        body?: BodyInit | object,
        config?: RequestInit
    ): Promise<Result<T, ServerFetchError>> {
        return serverFetch<T>(url, {
            ...config,
            method: 'POST',
            body: processBody(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    /**
     * Realiza una petición POST
     * @param url - La URL a la que se realizará la petición
     * @param body - El cuerpo de la petición, puede ser un objeto o BodyInit
     * @param config - Configuración opcional para la petición fetch
     * @returns Una promesa que resuelve con los datos de tipo T, o un error
     * @example
     * ```ts
     * const [newUser, err] = await http.post<User>("/users", { name: "Linus" });
     * ```
     */
    post<T>(url: string, body?: BodyInit | object, config?: RequestInit) {
        return serverFetch<T>(url, {
            ...config,
            method: 'POST',
            body: processBody(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    /**
     * Realiza una petición PUT
     * @param url - La URL a la que se realizará la petición
     * @param body - El cuerpo de la petición, puede ser un objeto o BodyInit
     * @param config - Configuración opcional para la petición fetch
     * @returns Una promesa que resuelve con los datos de tipo T, o un error
     * @example
     * ```ts
     * const [updatedUser, err] = await http.put<User>("/users/1f0c-3fca" { name: "Torvalds" });
     * ```
     */
    put<T>(url: string, body?: BodyInit | object, config?: RequestInit) {
        return serverFetch<T>(url, {
            ...config,
            method: 'PUT',
            body: processBody(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    /**
     * Realiza una petición DELETE
     * @param url - La URL a la que se realizará la petición
     * @param config - Configuración opcional para la petición fetch
     * @returns Una promesa que resuelve con los datos de tipo T, o un error
     * @example
     * ```ts
     * const [result, err] = await http.delete<void>("/users/1ca0-0aa3");
     * ```
     */
    delete<T>(url: string, config?: ServerFetchConfig) {
        return serverFetch<T>(url, {
            ...config,
            method: 'DELETE',
        });
    },

    /**
     * Realiza una petición DELETE
     * @param url - La URL a la que se realizará la petición
     * @param body - El cuerpo de la petición, puede ser un objeto o BodyInit, por lo general solo estan los ids de los registros a eliminar
     * @param config - Configuración opcional para la petición fetch
     * @returns Una promesa que resuelve con los datos de tipo T, o un error
     * @example
     * ```ts
     * const [result, err] = await http.delete<void>("/users/1ca0-0aa3");
     * ```
     */
    deleteMany<T>(
        url: string,
        body?: BodyInit | object,
        config?: ServerFetchConfig
    ) {
        return serverFetch<T>(url, {
            ...config,
            method: 'DELETE',
            body: processBody(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    /**
     * Realiza una petición PATCH
     * @param url - La URL a la que se realizará la petición
     * @param body - El cuerpo de la petición, puede ser un objeto o BodyInit
     * @param config - Configuración opcional para la petición fetch
     * @returns Una promesa que resuelve con los datos de tipo T, o un error
     * @example
     * ```ts
     * const [patchedUser, err] = await http.patch<User>("/users/1010-1a0b", { name: "Linux" });
     * ```
     */
    patch<T>(
        url: string,
        body?: BodyInit | object,
        config?: Omit<ServerFetchConfig, 'body'>
    ) {
        return serverFetch<T>(url, {
            ...config,
            method: 'PATCH',
            body: processBody(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
};
