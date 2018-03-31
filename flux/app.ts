import {App} from "../modules/flux/flux-app";

const app = new App();
(window as any).Logger = app.Logger;
app.init();
const view = (document.querySelector("view-logger") as any).view;
app.Logger.subscribe({
    getNotification(): void {
        view.render();
    },
});
