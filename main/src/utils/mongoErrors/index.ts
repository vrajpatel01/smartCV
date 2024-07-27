import { errorData } from "../../types";

export default function (error: Error) {
    let errorData: errorData = {
        error: error.message
    }
    const err = error as any;

    if (err?.code === 11000) {
        const dupKey: Array<string> = [];
        for (const key in err.keyPattern) {
            dupKey.push(key)
        }

        errorData = {
            error: 'Duplicate key not allowed',
            dupFields: dupKey
        }
    }
    return errorData;
}