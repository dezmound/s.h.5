import {FluxError, View} from "../";

export default class App {
    private root: View;
    private rootElement: string;
    constructor(rootView: string = "app", entryPoint: string = "template") {
        this.root = new View(rootView, document.querySelector(entryPoint).innerHTML);
        this.rootElement = entryPoint;
    }
    public init() {
        const renderedView = this.root.render();
        const rootElement = document.querySelector(this.rootElement);
        rootElement.parentNode.appendChild(renderedView);
        rootElement.parentNode.replaceChild(
            renderedView,
            rootElement,
        );
        this.monkeyPathing();
    }
    private monkeyPathing(): void {
        (window as any).view = (self: Element) => {
            let parentElement = self.parentElement;
            while (parentElement && (parentElement.getAttribute("view") === null)) {
                parentElement = parentElement.parentElement;
            }
            if (!parentElement) {
                throw new FluxError("Cannot find parent view of current element.");
            }
            return (parentElement as any).view;
        };
    }
}
