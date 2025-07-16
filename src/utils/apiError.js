class ApiError extends Error {
    constructor(
                statusCode,
                message='something went wrong',
                errors = [],
                statck = ""
              ){
                super(message)
                this.statusCode =statusCode
                this.message=message
                this.errors=errors
                this.sucess=false;

                if(statck){
                    this.stack =statck
                }
                else{
                    Error.captureStackTrace(this,this.constructor)
                }


        
               }
}

export {ApiError}