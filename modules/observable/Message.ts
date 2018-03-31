export default abstract class Message {
    private type: string;
    private data: any;
    constructor(type: string, data: any) {
        this.type = type;
        this.data = data;
    }
    get Type(): string {
        return this.type;
    }
    get Data(): any {
        return this.data;
    }
}
