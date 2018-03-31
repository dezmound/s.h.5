import {FluxError, FluxMessage} from ".";
import Utils from "../utils";
import FluxMessageStoreViewUpdate from "./flux-messages/FluxMessageStoreViewUpdate";
import FluxMessageViewDispatcherUpdate from "./flux-messages/FluxMessageViewDispatcherUpdate";
import FluxMessageViewStoreGet from "./flux-messages/FluxMessageViewStoreGet";
import FluxMessageHandler from "./FluxMessageHandler";
import ServerStoreDispatcher from "./ServerStoreDispatcher";
import Store from "./Store";

export default class View extends FluxMessageHandler {
    private static getInnerViews(self: View) {
        return Array.from(self.Dom.querySelectorAll(`[view]`))
        .map((innerViewElement) => {
            return new View(
                innerViewElement.tagName.toLowerCase(),
                innerViewElement.innerHTML,
            );
        }) || [];
    }
    private dependencies: string[] = [];
    private dom: Element;
    private innerViews: View[] = [];
    private parent: View;
    private template: string;
    private tag: string;
    constructor(tag: string, template?: string) {
        super();
        this.tag = tag;
        this.dom = document.createElement(this.tag);
        this.dom.setAttribute("view", "");
        (this.dom as any).view = this;
        Store.Instance.subscribe(this);
        this.subscribe(Store.Instance);
        this.subscribe(ServerStoreDispatcher.Instance);
        this.template = template || document.querySelector(this.tag).innerHTML;
        this.innerViews = View.getInnerViews(this);
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
    public get Dependencies(): string[] {
        return this.dependencies;
    }
    public get(schema: object): any {
        this.addDependency(schema);
        const [storedData] = this.notify(new FluxMessageViewStoreGet(schema));
        return Utils.getValue({
            obj: storedData,
            path: schema,
            saveStruct: false,
        });

    }
    public update(schema: object): any {
        return this.notify(new FluxMessageViewDispatcherUpdate(schema));
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
        return this.renderTemplate();
    }
    protected checkMessage(message: FluxMessage): boolean {
        return message instanceof FluxMessageStoreViewUpdate;
    }
    private addDependency(dependency: object) {
        const dependencyPath = Utils.getObjectSchema(dependency).pop();
        if (!this.dependencies.includes(dependencyPath)) {
            this.dependencies.push(dependencyPath);
            this.notify(new FluxMessageViewDispatcherUpdate(dependency));
        }
    }
    private escapeTemplate() {
        Utils.contentsBetween(this.template, "${|}$")
        .forEach((code) => {
            const element = document.createElement("textarea");
            element.innerHTML = code;
            const escaped = element.value;
            // Тут возможен XSS, но для упрощения реализации пока используем простые шаблоны.
            // tslint:disable-next-line:no-eval
            this.template = this.template.replace(`\${${code}}$`, eval(escaped));
        });
    }
    private renderTemplate(): Element {
        // TODO Тут надо поменять логику рендера шаблона. Работает только в случае
        // если родительское view имеет только вложенные view без прочего текста.
        if (this.innerViews.length === 0) {
            const unescapedTemplate = this.template;
            this.escapeTemplate();
            this.dom.innerHTML = this.template;
            this.template = unescapedTemplate;
        }
        return this.dom;
    }
}
