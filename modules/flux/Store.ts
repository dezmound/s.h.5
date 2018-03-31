import {FluxError, FluxMessage} from ".";
import Utils from "../utils";
import Dispatcher from "./Dispatcher";
import {FluxMessageDispatcherStoreChange} from "./FluxMessageDispatcherStoreChange";
import FluxMessageHandler from "./FluxMessageHandler";
import FluxMessageStoreViewUpdate from "./FluxMessageStoreViewUpdate";
import FluxMessageViewStoreGet from "./FluxMessageViewStoreGet";
export default class Store extends FluxMessageHandler {
    public static get Instance(): Store {
        if (!this.instance) {
            this.instance = new this();
            Dispatcher.Instance.subscribe(this.instance);
        }
        return this.instance;
    }
    private static state: any = {};
    private static instance: Store;
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
    public update(schema: object) {
        Store.state = Object.assign(Store.state, schema);
        this.notify(new FluxMessageStoreViewUpdate(schema));
    }
    protected checkMessage(message: FluxMessage): boolean {
        return message instanceof FluxMessageDispatcherStoreChange
        || message instanceof FluxMessageViewStoreGet;
    }
}
