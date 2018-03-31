import Message from "./Message";
import Observer from "./Observer";

interface IObservable {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(message: Message): void;
}

abstract class Observable implements IObservable {
    private subscribers: Observer[] = [];
    public subscribe(observer: Observer) {
        this.subscribers.push(observer);
    }
    public unsubscribe(observer: Observer) {
        this.subscribers = this.subscribers.filter((subscriber) => {
            return subscriber !== observer;
        });
    }
    public notify(message: Message) {
        this.subscribers.forEach((subscriber) => {
            subscriber.getNotification(message);
        });
    }
}

export {Observable, IObservable};
