//For client side validation
export const processError = (
    error: unknown,
    addAltMessage?: string
): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
        const errorMessage = (error.message as string) ?? 'Error desconocido';
        return errorMessage;
    }

    if (typeof error === 'object' && error !== null && 'error' in error) {
        const errorMessage = (error.error as string) ?? 'Error desconocido';
        return errorMessage;
    }

    // if (typeof error === 'object' && error !== null && 'data' in error) {
    //     const reduxError = error as ReduxError;
    //     const errorMessage =
    //         reduxError.data.message ??
    //         reduxError.data.error ??
    //         reduxError.data.statusCode.toString() ??
    //         '';
    //     if (reduxError.status && reduxError.data) {
    //         return errorMessage;
    //     }
    // }

    return 'Error desconocido' + (addAltMessage ? `: ${addAltMessage}` : '');
};
