

export default function ErrorProcessor(error: any): string {
    console.dir(error);

    const err = error as {
        response?: {
            data?: {
                error?: {
                    message?: string;
                };
                message?: string;
            };
            message?: string;
        };
        message?: string;
    };



    const message =
        err.response?.data?.error?.message ??
        err.response?.data?.message ??
        err.response?.message ??
        err.message ??
        "Untracked error";


    return message;
}