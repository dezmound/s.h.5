import Message from "./Message";
export default interface IObserver {
    getNotification(message: Message): any;
}
