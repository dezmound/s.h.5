import {FluxMessageType} from ".";
import FluxMessage from "./FluxMessage";
import Store from "./Store";
export default class FluxMessageViewStoreGet extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.GET_VIEW_STORE, data);
    }
    public handle(store: Store): any {
        return store.get(this.Data);
    }
}
