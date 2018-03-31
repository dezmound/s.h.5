import {CustomMessage, Observable} from "../observable";

export default class Logger extends Observable {
    private static instance: Logger;
    private messages: string[] = [];
    protected constructor() {
        super();
    }
    public static get Instance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }
    public log(message: string): void {
        this.messages.push(message);
        // tslint:disable-next-line:no-console
        console.log(message + " --> 🙀");
        this.notify(new CustomMessage("", ""));
    }
    public get(): string[] {
        return this.messages;
    }
    public flush(): string[] {
        const result = this.messages;
        this.messages = [];
        return result;
    }
}
