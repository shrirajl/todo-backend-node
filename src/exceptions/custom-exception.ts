/**
 *
 * This is custom exception class
 * @export
 * @class CustomException
 * @extends {Error}
 */
export class CustomException extends Error {
    errorCode: number;
    message: string;
    constructor(errorCode: number, message: string){
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}