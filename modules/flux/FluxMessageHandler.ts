import {FluxError, FluxMessage} from ".";
import {IObserver, Observable} from "../observable";

export default abstract class FluxMessageHandler extends Observable implements IObserver {
    public getNotification(message: FluxMessage): any {
        if (this.checkMessage(message)) {
            return message.handle(this);
        }
        return false;
    }
    protected abstract checkMessage(message: FluxMessage): boolean;
}
