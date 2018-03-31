import {FluxMessage} from ".";
import Logger from "../utils/Logger";
import Dispatcher from "./Dispatcher";

export default class ServerStoreDispatcher extends Dispatcher {
    protected static instance: ServerStoreDispatcher = null;
    public static get Instance() {
        if (!this.instance) {
            this.instance = new ServerStoreDispatcher();
        }
        return this.instance;
    }
    public getNotification(message: FluxMessage): any {
        const result = super.getNotification(message);
        if (result) {
            Logger.Instance.log(`Сервер принял данные: ${JSON.stringify(message.Data)}`);
        }
        return result;
    }
}
