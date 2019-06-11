export class User {
    role: string;
    username: string;
    password: string;
    name: string;
    lastName: string;
    token: string;

    constructor(username: string, password: string, role: string, 
        token: string){
            
        this.username = username;
        this.password = password;
        this.role = role;
        this.token = token;

    }
}