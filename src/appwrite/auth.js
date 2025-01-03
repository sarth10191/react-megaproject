import conf from "../conf/conf.js";
import {Client, ID, Account} from "appwrite";

export class AuthService {
    client = new Client()
    account;
    constructor(){
        this.client = this.client.setEndpoint(conf.appwriteurl)
                            .setProject(conf.appwriteprojectid)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique,email, password,name)
            if(!userAccount){
                //login karwa do
                this.login({email, password})
            }else{
                return userAccount;
                //Handle in calling method.
            }
        }catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            return error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log(error);
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log(error)
        }
    }

}





const authService = new AuthService();

export default authService;