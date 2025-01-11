import conf from "../conf/conf.js";
import {ID, Client, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug, title, content, userId, featuredImage, status}){
        try{
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }catch(error){
            console.log(error)
        }
    };

    async updatePost(slug ,{title, content, featuredImage, status}){
        try{
            await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {title, content, featuredImage, status}
            );
        }catch(error){
            console.log(error)
        }
    }

    async deletePost(slug){
        try{
            this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            );
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            );
        }catch(error){
            console.log(error)
        }
    }

    async getPosts(query = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                query,
            )
        }catch(error){
            console.log("Listposts", error)
        }
    }


    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )   

        }catch(error){
            console.log("uploadfile", error)
            return false
        }

    }

    async deleteFile(file_id){
        try{
            await this.bucket.deleteFile(
                conf.appwritebucketid,
                file_id
            )
            return true;
        }catch(error){
            console.log("Deletefile", error)
        }

    }

    getFilePreview(file_id){

        try{
            return this.bucket.getFilePreview(
                conf.appwritebucketid,
                file_id
            )
        }catch(error){
            console.log("getFilePreview", error)
        }
    }

}




const service = new Service()
export default service