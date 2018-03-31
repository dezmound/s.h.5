import {FluxMessageType} from ".";
import Utils from "../utils";
import FluxMessage from "./FluxMessage";
import View from "./View";
export default class FluxMessageStoreViewUpdate extends FluxMessage {
    constructor(data: object) {
        super(FluxMessageType.UPDATE_STORE_VIEW, data);
    }
    public handle(view: View) {
        const dependencyPath = Utils.getObjectSchema(this.Data).pop();
        if (view.Dependencies.includes(dependencyPath)) {
            view.render();
        }
    }
}
