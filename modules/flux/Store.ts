import {FluxError, FluxMessage} from ".";
import {IObserver, Message, Observable} from "../observable";
import Utils from "../utils";
import Dispatcher from "./Dispatcher";
import FluxMessageStoreViewUpdate from "./FluxMessageStoreViewUpdate";
export default class Store extends Observable implements IObserver {
    public static get Instance(): Store {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    private static state: any;
    private static instance: Store;
    private dispatcher: Dispatcher;
    public get State(): any {
        return Object.assign({}, Store.state);
    }
    constructor() {
        super();
    }
    public getNotification(message: Message): void {
        if (!(message instanceof FluxMessage)) {
            throw new FluxError(`Cannot handle message of this type: ${typeof message}`);
        }
        (message as FluxMessage).handle(this);
    }
    public registerInDispatcher(dispatcher: Dispatcher) {
        if (!this.dispatcher) {
            this.dispatcher = dispatcher;
            this.dispatcher.subscribe(this);
        }
    }
    public get(schema: object) {
        return Utils.intersection(Store.Instance.State, schema);
    }
    public update(schema: object) {
        Store.state = Object.assign(Store.state, schema);
        this.notify(new FluxMessageStoreViewUpdate(schema));
    }
}
