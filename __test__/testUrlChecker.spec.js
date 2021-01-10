import { checkUrl } from "../src/client/js/urlChecker"

describe("Testing the check url functionality", () => {

    test("Check if url (https://www.google.com) is valid", () => {
        expect(checkUrl('https://www.google.com')).toEqual(true);
    });

    test("Check if url (https://) is not valid", () => {
        expect(checkUrl('https://')).toEqual(false);
    });

});