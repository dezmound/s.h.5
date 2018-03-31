import {FluxError, FluxMessage} from ".";
import Utils from "../utils";
import Dispatcher from "./Dispatcher";
import {FluxMessageDispatcherStoreChange} from "./flux-messages/FluxMessageDispatcherStoreChange";
import FluxMessageStoreViewUpdate from "./flux-messages/FluxMessageStoreViewUpdate";
import FluxMessageViewStoreGet from "./flux-messages/FluxMessageViewStoreGet";
import FluxMessageHandler from "./FluxMessageHandler";
import ServerStoreDispatcher from "./ServerStoreDispatcher";
export default class Store extends FluxMessageHandler {
    public static get Instance(): Store {
        if (!this.instance) {
            this.instance = new this();
            ServerStoreDispatcher.Instance.subscribe(this.instance);
        }
        return this.instance;
    }
    protected static instance: Store;
    private static state: any = {};
    private dispatcher: Dispatcher;
    public get State(): any {
        return Object.assign({}, Store.state);
    }
    private constructor() {
        super();
    }
    public registerInDispatcher(dispatcher: Dispatcher) {
        if (!this.dispatcher) {
            this.dispatcher = dispatcher;
            this.dispatcher.subscribe(this);
        }
    }
    public get(schema: object) {
        return Utils.intersection(schema, Store.Instance.State);
    }
    public update(schema: object): any {
        Store.state = Object.assign(Store.state, schema);
        this.notify(new FluxMessageStoreViewUpdate(schema));
        return schema;
    }
    protected checkMessage(message: FluxMessage): boolean {
        return message instanceof FluxMessageDispatcherStoreChange
        || message instanceof FluxMessageViewStoreGet;
    }
}
