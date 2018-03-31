import {FluxMessageType} from ".";
import FluxMessage from "./FluxMessage";
import View from "./View";
export default class FluxMessageStoreViewUpdate extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.UPDATE_STORE_VIEW, data);
    }
    public handle(view: View) {
        view.render();
    }
}
