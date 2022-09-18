export class GroupChat {
    id:any;
    id_groupchat: any;
    id_user: any;
    namegroup :any;
    nameuser:any;

    constructor(id: any, id_groupchat: any, id_user: any,namegroup:any,nameuser:any) {
        this.id = id;
        this.id_groupchat = id_groupchat;
        this.id_user= id_user;
        this.namegroup = namegroup;
        this.nameuser = nameuser;
    }
}