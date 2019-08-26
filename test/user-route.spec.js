const userRouter = require("../routes/user");
describe("User Route Test Suite", () => {
    let req;
    let validate;
    let hashPassword;
    let save;
    let res;
    let next;

    beforeEach(() => {
        validate = jest.fn();
        hashPassword = jest.fn();
        save = jest.fn();
        req = {
            construct: {
                user: {
                    validate,
                    hashPassword,
                    save
                }
            }
        }
        res = {
            sendStatus: jest.fn(),
            json: jest.fn()
        };
        next = jest.fn();
    })

    it("[Create User] calls next immediately if validation fails", async () => {
        validate.mockRejectedValue("Validation Failure")
        await userRouter.createUser(req, res, next);
        expect(validate.mock.calls.length).toBe(1)
        expect(hashPassword.mock.calls.length).toBe(0)
        expect(save.mock.calls.length).toBe(0)
        expect(next.mock.calls[0][0]).toEqual("Validation Failure")
    });

    
    it(" [Create User] calls next immediately if hashPassword fails", async () => {
        hashPassword.mockRejectedValue("Failure")
        await userRouter.createUser(req, res, next);
        expect(validate.mock.calls.length).toBe(1)
        expect(hashPassword.mock.calls.length).toBe(1)
        expect(save.mock.calls.length).toBe(0)
        expect(next.mock.calls[0][0]).toEqual("Failure")
    });

    it(" [Create User] calls next immediately if save fails", async () => {
        save.mockRejectedValue("Failure")
        await userRouter.createUser(req, res, next);
        expect(validate.mock.calls.length).toBe(1)
        expect(hashPassword.mock.calls.length).toBe(1)
        expect(save.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual("Failure")
    });

    it(" [Create User] it sends statusCode 200 if no errors", async () => {
        await userRouter.createUser(req, res, next);
        expect(validate.mock.calls.length).toBe(1)
        expect(hashPassword.mock.calls.length).toBe(1)
        expect(save.mock.calls.length).toBe(1)
        expect(res.sendStatus.mock.calls.length).toBe(1)
        expect(res.sendStatus.mock.calls[0][0]).toEqual(200)
        expect(next.mock.calls.length).toBe(0)
    });

    it("[Get User] sends the user", () => {
        req.user = {}
        userRouter.getUser(req, res, next)
        expect(res.json.mock.calls.length).toBe(1)
        expect(res.json.mock.calls[0][0]).toEqual(req.user)
    })

    it("[Delete User] calls next if error", async () => {
        req.user = {delete: jest.fn().mockRejectedValue("Error")}
        await userRouter.deleteUser(req, res, next)
        expect(res.json.mock.calls.length).toBe(0)
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual("Error")
    })

    it("[Delete User] sends status 200 if no error", async () => {
        req.user = {delete: jest.fn().mockResolvedValue({})}
        await userRouter.deleteUser(req, res, next)
        expect(res.sendStatus.mock.calls.length).toBe(1)
        expect(res.sendStatus.mock.calls[0][0]).toEqual(200)
        expect(next.mock.calls.length).toBe(0)
    })

    afterEach(() => {
        req = undefined;
        res = undefined;
        next = undefined;
    })
})