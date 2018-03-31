import {FluxMessageType} from "../";
import Store from "../Store";
import FluxMessage from "./FluxMessage";
export class FluxMessageDispatcherStoreChange extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.CHANGE_DISPATCHER_STORE, data);
    }
    public handle(store: Store): void {
        store.update(this.Data);
    }
}
