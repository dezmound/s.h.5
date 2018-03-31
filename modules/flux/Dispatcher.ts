import {FluxMessage} from ".";
import FluxMessageViewDispatcherUpdate from "./flux-messages/FluxMessageViewDispatcherUpdate";
import FluxMessageHandler from "./FluxMessageHandler";

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
