import { Request, Response } from "express";
import myError from "./errors";
import { saveUserToDatabase } from "./microservices/user";

class User {
    userName:string;
    email:string;
    password: string;
    constructor(userName:string, email:string, password: string){
        this.userName = userName;
        this.email= email;
        this.password = password;
    }
    validate(){
        const errors = new myError()
	if (!this.userName || !this.email || !this.password) {
		errors.addError("Plaese fill the form");
	}
	if (this.userName.length < 3) {
		errors.addError("user name must be of greater then 3 charecters");
	}
	if (this.userName.length > 20) {
		errors.addError("user name must be of less then 20 charecters");
	}
	if (this.password.length < 3) {
		errors.addError("password must be greater then 3 charecters");
	}
	if (this.password.length > 20) {
		errors.addError("password must be less then 20 charecters");
	}if(errors.length > 0){
    return errors
    }else{
        return "valid user"
    }
    }
    saveUser( req: Request, res:Response){
       saveUserToDatabase(this.email, req, res, this.userName, this.password) 
    }
}

export default User;