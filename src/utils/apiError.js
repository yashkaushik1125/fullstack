class ApiError extends Error {
    constructor(
                statusCode,
                message='something went wrong',
                errors = [],
                stack = ""
              ){
                super(message)
                this.statusCode =statusCode
                this.message=message
                this.errors=errors
                this.sucess=false;

                if(stack){
                    this.stack =statck
                }
                else{
                    Error.captureStackTrace(this,this.constructor)
                }


        
               }
}

export {ApiError}