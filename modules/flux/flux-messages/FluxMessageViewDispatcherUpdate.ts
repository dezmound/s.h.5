import {FluxMessageType} from "../";
import Dispatcher from "../Dispatcher";
import View from "../View";
import FluxMessage from "./FluxMessage";
import {FluxMessageDispatcherStoreChange} from "./FluxMessageDispatcherStoreChange";
export default class FluxMessageViewDispatcherUpdate extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.UPDATE_VIEW_DISPATCHER, data);
    }
    public handle(dispathcer: Dispatcher): any {
        return dispathcer.notify(new FluxMessageDispatcherStoreChange(this.Data));
    }
}
