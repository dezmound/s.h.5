import {FluxMessageType} from ".";
import Dispatcher from "./Dispatcher";
import FluxMessage from "./FluxMessage";
import {FluxMessageDispatcherStoreChange} from "./FluxMessageDispatcherStoreChange";
import View from "./View";
export default class FluxMessageViewDispatcherUpdate extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.UPDATE_VIEW_DISPATCHER, data);
    }
    public handle(dispathcer: Dispatcher) {
        dispathcer.notify(new FluxMessageDispatcherStoreChange(this.Data));
    }
}
