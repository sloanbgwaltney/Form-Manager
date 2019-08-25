const authRouter = require("../routes/auth");

describe("Auth Router Test Suite", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            body: {
                username: "testtest",
                password: "testtest"
            },
            models: {
                user: {
                    findOne: jest.fn(() => {
                        return Promise.resolve({
                            comparePasswords: jest.fn(() => true),
                            save: jest.fn(),
                            createSession: jest.fn(),
                            session: {
                                id: "123"
                            }
                        })
                    }),
                }
            }
        }
        res = {
            set: jest.fn(),
            status: jest.fn(() => res),
            json: jest.fn(),
            sendStatus: jest.fn()
        }
        next = jest.fn();
    })

    it("It calls next if find one errors", async () => {
        req.models.user.findOne.mockRejectedValue("Connection Failure");
        await authRouter.login(req, res, next)
        expect(res.set.mock.calls.length).toBe(0)
        expect(res.status.mock.calls.length).toBe(0)
        expect(res.json.mock.calls.length).toBe(0)
        expect(res.sendStatus.mock.calls.length).toBe(0)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual("Connection Failure")
    })

    it("It sends 400 if find one returns null", async () => {
        req.models.user.findOne.mockResolvedValue(null);
        await authRouter.login(req, res, next)
        expect(res.set.mock.calls.length).toBe(0)
        expect(res.status.mock.calls.length).toBe(1)
        expect(res.json.mock.calls.length).toBe(1)
        expect(res.sendStatus.mock.calls.length).toBe(0)
        expect(next.mock.calls.length).toBe(0)
        expect(res.status.mock.calls[0][0]).toEqual(400)
        expect(res.json.mock.calls[0][0]).toEqual({message: "Unknow username/password combination"})
    })

    it("It sends 400 if compare passwords do not match", async () => {
        req.models.user.findOne.mockResolvedValue({
            comparePasswords: jest.fn().mockResolvedValue(false)
        })
        await authRouter.login(req, res, next)
        expect(res.set.mock.calls.length).toBe(0)
        expect(res.status.mock.calls.length).toBe(1)
        expect(res.json.mock.calls.length).toBe(1)
        expect(res.sendStatus.mock.calls.length).toBe(0)
        expect(next.mock.calls.length).toBe(0)
        expect(res.status.mock.calls[0][0]).toEqual(400)
        expect(res.json.mock.calls[0][0]).toEqual({message: "Unknow username/password combination"})
    })

    it("It calls next if compare passwords errors", async () => {
        req.models.user.findOne.mockResolvedValue({
            comparePasswords: jest.fn().mockRejectedValue("Error")
        })
        await authRouter.login(req, res, next)
        expect(res.set.mock.calls.length).toBe(0)
        expect(res.status.mock.calls.length).toBe(0)
        expect(res.json.mock.calls.length).toBe(0)
        expect(res.sendStatus.mock.calls.length).toBe(0)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual("Error")
    })

    it("It calls next if user save errors", async () => {
        req.models.user.findOne.mockResolvedValue({
            comparePasswords: jest.fn().mockResolvedValue(true),
            createSession: jest.fn(),
            save: jest.fn().mockRejectedValue("Error")
        })
        await authRouter.login(req, res, next)
        expect(res.set.mock.calls.length).toBe(0)
        expect(res.status.mock.calls.length).toBe(0)
        expect(res.json.mock.calls.length).toBe(0)
        expect(res.sendStatus.mock.calls.length).toBe(0)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual("Error")
    })

    it("It sends 200 if no errors", async () => {
        await authRouter.login(req, res, next)
        expect(res.set.mock.calls.length).toBe(1)
        expect(res.status.mock.calls.length).toBe(0)
        expect(res.json.mock.calls.length).toBe(0)
        expect(res.sendStatus.mock.calls.length).toBe(1)
        expect(next.mock.calls.length).toBe(0)
        expect(res.set.mock.calls[0][0]).toEqual('Authorization')
        expect(res.set.mock.calls[0][1]).toEqual("123")
        expect(res.sendStatus.mock.calls[0][0]).toBe(200)
    })

    afterEach(() => {
        req = undefined;
        res = undefined;
        next = undefined;
    })
})