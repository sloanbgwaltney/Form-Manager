const sessionParser = require("../middleware/sessionParser")

describe("Session Parser Test Suite", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            headers: {
                authorization: null,
            },
            models: {
                user: {
                    findOne: jest.fn(() => {})
                }
            }
        };
        res = {};
        next = jest.fn()
    })

    it("Calls empty next if no authorization header is received", async () => {
        await sessionParser(req, res, next);
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(undefined)
    })

    it("Calls empty next if authorization header is one word", async () => {
        req.headers.authorization = "Bearer"
        await sessionParser(req, res, next);
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(undefined)
    })

    it("Calls empty next if authorization first word is not bearer", async () => {
        req.headers.authorization = "tester test"
        await sessionParser(req, res, next);
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(undefined)
    })

    it("Calls empty next if invalid token is provided", async () => {
        req.headers.authorization = "Bearer test"
        req.models.user.findOne.mockImplementation(() => null)
        await sessionParser(req, res, next);
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(undefined)
    })

    it("Calls next with error if findONe() Errors", async () => {
        req.headers.authorization = "Bearer test"
        req.models.user.findOne.mockRejectedValue("Error")
        await sessionParser(req, res, next);
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual("Error")
    })

    it("Calls empty next if no errors", async () => {
        req.headers.authorization = "Bearer test"
        req.models.user.findOne.mockResolvedValue({})
        await sessionParser(req, res, next);
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(undefined)
    })

    afterEach(() => {
        req = undefined;
        res = undefined;
        next = undefined;
    })
})