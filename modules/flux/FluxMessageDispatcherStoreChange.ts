import {FluxMessageType} from ".";
import FluxMessage from "./FluxMessage";
import Store from "./Store";
export class FluxMessageDispatcherStoreChange extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.CHANGE_DISPATCHER_STORE, data);
    }
    public handle(store: Store): void {
        store.update(this.Data);
    }
}
