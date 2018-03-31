import {View} from "../";

export default class App {
    private root: View;
    constructor(rootView: string = "app") {
        this.root = new View(rootView);
    }
    public init() {
        const renderedView = this.root.render();
        const rootElement = document.querySelector(this.root.Tag);
        rootElement.parentNode.appendChild(renderedView);
        rootElement.parentNode.replaceChild(
            renderedView,
            rootElement,
        );
    }
}
