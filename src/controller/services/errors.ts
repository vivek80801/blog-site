class myError {
    errors: string[];
    length: number;
    constructor(){
        this.errors = [];
        this.length = this.errors.length
    }
    addError (err:string){
        this.errors.push(err)
    }
    for(){
        
    }
}

export default myError