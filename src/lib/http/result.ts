/**
 * Represents a computation that may fail.
 *
 * If the computation is successful, the first item will contain
 * the result, and the second will be null.
 * If the computation is an error, the first item will be null,
 * and the second item will contain the error.
 *
 * Even though the type says the first item is not null,
 * it will be null if there is an error. This is done so
 * the result can be used more comfortably.
 *
 * @example
 * const [value, err] = computation()
 * if (err !== null) {
 *     // handle error
 * }
 */
export type Result<Success, Error> = [Success, Error | null];

/**
 * Creates a Result.Success from its value.
 */
export function ok<Success, Error>(t: Success): Result<Success, Error> {
    return [t, null];
}

/**
 * Creates a Result.Error from its error value.
 */
export function err<Success, Error>(t: Error): Result<Success, Error> {
    return [
        // @ts-expect-error allowing null
        null,
        t,
    ];
}
