import { Status } from './status';

export class User {
    id: number;
    role: string;
    username: string;
    password: string;
    name: string;
    surname: string;
    token: string;
    status: string;

    constructor(username: string, password: string, role: string){
            
        this.username = username;
        this.password = password;
        this.role = role;
    }

    setToken(token: string): User{
        this.token = token;
        return this;
    }

    setName(name: string): User {
        this.name = name;
        return this;
    }

    setSurName(surname: string): User {
        this.surname = surname; 
        return this;
    }

    setStatus(status: string): User {
        this.status = status;
        return this;
    }

    setId(id: number): User {
        this.id = id;
        return this;
    }
}