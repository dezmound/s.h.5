import {IObserver, Message, Observable} from "../observable";
import {FluxMessageDispatcherStoreChange} from "./FluxMessageDispatcherStoreChange";

export default class Dispatcher extends Observable implements IObserver {
    public getNotification(message: Message): void {
        this.notify(new FluxMessageDispatcherStoreChange(message.Data));
    }
}
