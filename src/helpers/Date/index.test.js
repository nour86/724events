import {getMonth} from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const date=getMonth(new Date("2022/01/01"))
            expect(date).toEqual("janvier")
        });
        it("the function return juillet for 2022-07-08 as date", () => {

            const date = getMonth(new Date("2022/07/08"))
            expect(date).toEqual("juillet")
        });
    });
})

