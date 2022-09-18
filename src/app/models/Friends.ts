export class Friends {
    id!:string;
    id_friend!:string;
    name!:string;
    id_me!:string;
    status_friend!:string;

    constructor(id:string,id_friend: string, name: string,id_me:string,status_friend:string){
        this.id = id;
        this.id_friend = id_friend;
        this.name = name;
        this.id_me= id_me;
        this.status_friend= status_friend;
    }
    
}