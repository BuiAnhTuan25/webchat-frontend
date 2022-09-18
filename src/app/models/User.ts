export class User {
    id!:string;
    username!: string;
    password!: string;
    name!:string;
    status!:string;

    constructor(id:string,username: string, password: string,name:string,status:string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.name= name;
        this.status= status;
    }
    
}