export class User {
    role: string;
    username: string;
    password: string;
    name: string;
    lastName: string;
    token: string;
    status: string;

    constructor(username: string, password: string, role: string, 
        token: string, name?: string, lastName?:string, 
        status?: string){
            
        this.username = username;
        this.password = password;
        this.role = role;
        this.token = token;
        this.name = name;
        this.lastName = lastName;
        this.status = status;
    }
}