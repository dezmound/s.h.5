import {Message} from "../observable";
import FluxMessageHandler from "./FluxMessageHandler";
export default abstract class FluxMessage extends Message {
    constructor(type: string, data: any) {
        super(type, data);
        // tslint:disable-next-line:no-console
        console.log(this.Type);
    }
    public abstract handle(handler: FluxMessageHandler): any;
}
