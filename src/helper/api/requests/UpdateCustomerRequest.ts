export default class UpdateQueueRequest {
    queueId: string= "";
    active: boolean = false;

    setQueueId(queueId: string) {
        this.queueId = queueId;
        return this;
    }

    setActive(value: boolean) {
        this.active = value;
        return this;
    }

    getRequestBody() {
        return {
            active: this.active
        }
    }
}