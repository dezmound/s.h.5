import {Message} from "../observable";
import Dispatcher from "./Dispatcher";
import Store from "./Store";
import View from "./View";
export default abstract class FluxMessage extends Message {
    public abstract handle(handler: Store|Dispatcher|View): any;
}
