import { MomentObjectOutput } from "moment";

export default class UpdateAccountRequest {
    dailyTiming: {
        from: MomentObjectOutput,
        to: MomentObjectOutput
    } = {} as any;
    slotDuration: MomentObjectOutput = {} as any;
    customersPerSlot: number = 0;

    setSlotDuration(slotDuration: number) {
        this.slotDuration = { minutes: slotDuration } as MomentObjectOutput;
        return this;
    }

    setCustomersPerSlot(customersPerSlot: number) {
        this.customersPerSlot = customersPerSlot;
        return this;
    }

    setDailyTimingFrom(hours: number, minutes: number) {
        this.dailyTiming.from = {
            hours,
            minutes
        } as MomentObjectOutput;
        return this;
    }

    setDailyTimingTo(hours: number, minutes: number) {
        this.dailyTiming.to = {
            hours,
            minutes
        } as MomentObjectOutput;
        return this;
    }

    getRequestBody() {
        return {
            dailyTiming: this.dailyTiming,
            slotDuration: this.slotDuration,
            customersPerSlot: this.customersPerSlot
        }
    }
}