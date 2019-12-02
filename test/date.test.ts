import { expect } from "chai";
import { describe, it } from "mocha";

import { formatDate, pad } from "../src/date";

describe("Date Functions", () => {

    describe("pad()", () => {

        it("should return a 0-padded string string", (done: MochaDone) => {

            expect(pad(1)).to.be.a("string");
            expect(pad(8)).to.equal("08");
            expect(pad(10)).to.equal("10");

            done();
        });
    });

    describe("formatDate()", () => {

        it("should return an ISO 8601 formatted date string", (done: MochaDone) => {

            const date: Date = new Date(Date.UTC(2019, 0, 1, 0, 0, 0));
            const dateFormatted: string = "2019-01-01T00:00:00Z";

            const currDate: Date = new Date();

            expect(formatDate(currDate)).to.be.a("string");
            expect(formatDate(date)).to.be.a("string");
            expect(formatDate(date)).to.equal(dateFormatted);

            done();
        });
    });
});
