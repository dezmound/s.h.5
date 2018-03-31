import {FluxMessageType} from "../";
import Store from "../Store";
import FluxMessage from "./FluxMessage";
export default class FluxMessageViewStoreGet extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.GET_VIEW_STORE, data);
    }
    public handle(store: Store): any {
        return store.get(this.Data);
    }
}
