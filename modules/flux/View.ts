import {FluxError} from ".";
import {IObserver, Message} from "../observable";
import FluxMessageStoreViewUpdate from "./FluxMessageStoreViewUpdate";
import Store from "./Store";

export default class View implements IObserver {
    private static getInnerViews(self: View) {
        return Array.from(self.Dom.querySelectorAll(`[view]`))
        .map((innerViewElement) => {
            return new View(
                innerViewElement.tagName.toLowerCase(),
                innerViewElement.innerHTML,
            );
        });
    }
    private dom: Element;
    private innerViews: View[];
    private parent: View;
    private template: string;
    private tag: string;
    constructor(tag: string, template?: string) {
        this.dom = document.createElement("view");
        this.tag = tag;
        // tslint:disable-next-line:no-eval
        this.template = eval("`" + (template || document.querySelector(this.tag).innerHTML) + "`");
        this.innerViews = View.getInnerViews(this);
        Store.Instance.subscribe(this);

    }
    private get Dom(): Element {
        if (!this.dom.innerHTML) {
            this.dom.innerHTML = this.template;
        }
        return this.dom;
    }
    public get Tag(): string {
        return this.tag;
    }
    public getNotification(message: Message): void {
        if (!(message instanceof FluxMessageStoreViewUpdate)) {
            throw new FluxError(`Cannot handle message of this type: ${typeof message}`);
        }
        (message as FluxMessageStoreViewUpdate).handle(this);
    }
    public render(): Element {
        this.innerViews.forEach((view) => {
            const renderedView = view.render();
            this.dom.appendChild(renderedView);
            this.Dom.replaceChild(
                renderedView,
                this.Dom.querySelector(view.Tag),
            );
        });
        return this.Dom;
    }
}
