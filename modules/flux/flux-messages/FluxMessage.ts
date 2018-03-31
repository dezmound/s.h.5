import {Message} from "../../observable";
import Logger from "../../utils/Logger";
import FluxMessageHandler from "../FluxMessageHandler";
export default abstract class FluxMessage extends Message {
    constructor(type: string, data: any) {
        super(type, data);
        Logger.Instance.log(`Сформировано сообщение: ${this.Type}`);
    }
    public abstract handle(handler: FluxMessageHandler): any;
}
