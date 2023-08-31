import express from "express";

/**
 * This is middleware to handle exception
 *
 * @export
 * @class ExceptionHandler
 */
export class ExceptionHandler {
    constructor() {

    }

    /**
     * this method handles the error and send proper response
     *
     * @param {*} err
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @memberof ExceptionHandler
     */
    public handleError(err: any, req: express.Request, res: express.Response, next: express.NextFunction){
        const errorObj = {timestamp: new Date(), message: err.message}
        if(err.errorCode) {
            res.status(err.errorCode).send(errorObj)
        } else {
            res.status(500).send(errorObj)
        }
    }
}