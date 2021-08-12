

export class User{
    constructor(public email:string,private id: string,private _token:string,private _tokenExpirationDate:Date){
    }
    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) // current date
        {
            return null;
        }
        return this._token;
    }
}
