import {FluxMessage} from ".";
import FluxMessageHandler from "./FluxMessageHandler";
import FluxMessageViewDispatcherUpdate from "./FluxMessageViewDispatcherUpdate";

export default class Dispatcher extends FluxMessageHandler {
    private static instance: Dispatcher;
    private constructor() {
        super();
    }
    public static get Instance() {
        if (!this.instance) {
            this.instance = new Dispatcher();
        }
        return this.instance;
    }
    protected checkMessage(message: FluxMessage): boolean {
        return message instanceof FluxMessageViewDispatcherUpdate;
    }
}
