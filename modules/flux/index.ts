export {default as Store} from "./Store";
export {default as View} from "./View";
export {default as Dispatcher} from "./Dispatcher";
export {default as FluxMessage} from "./flux-messages/FluxMessage";

export enum FluxMessageType {
    GET_VIEW_STORE = "getViewStore",
    CHANGE_DISPATCHER_STORE = "changeValueDispatcherStore",
    UPDATE_STORE_VIEW = "updateStoreView",
    UPDATE_VIEW_DISPATCHER = "updateViewDispatcher",
}
export class FluxError extends Error {
    constructor(message?: string) {
        super(`Flux error: ${message}`);
    }
}
