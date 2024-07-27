import { LOG_SHOW_DATE } from "../config";

const getCurrentLogTime = (): string => {
    if (LOG_SHOW_DATE?.toLowerCase() === 'true') {
        return new Date().toLocaleString()
    }
    return new Date().toLocaleString().substring(11)
}

export default getCurrentLogTime;