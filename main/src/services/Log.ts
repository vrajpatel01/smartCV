import { getCurrentLogTime } from '../utils';

class Log {
    static yellow: string = '\x1b[33m';
    static red: string = '\x1b[31m';
    static green: string = '\x1b[32m';
    static blue: string = '\x1b[34m';
    static dim: string = '\x1b[2m';

    static success(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.green}${message.join(' ')}${'\x1b[0m'}`);
    }
    static successFirstArgColor(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.green}${message[0]}${'\x1b[0m'}`, ...message.slice(1));
    }

    static error(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.red}${message.join(' ')}${'\x1b[0m'}`);
    }
    static errorFirstArgColor(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.red}${message[0]}${'\x1b[0m'}`, ...message.slice(1));
    }

    static info(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.blue}${message.join(' ')}${'\x1b[0m'}`);
    }
    static infoFirstArgColor(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.blue}${message[0]}${'\x1b[0m'}`, ...message.slice(1));
    }

    static warning(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.yellow}${message.join(' ')}${'\x1b[0m'}`);
    }
    static warningFirstArgColor(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${this.yellow}${message[0]}${'\x1b[0m'}`, ...message.slice(1));
    }

    static print(...message: Array<any>) {
        console.log(`${this.dim}[${getCurrentLogTime()}]${'\x1b[0m'} ${message.join(' ')}`);
    }
}

export default Log;