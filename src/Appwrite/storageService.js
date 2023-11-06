import envImporter from '../Config/envImporter';
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class storageService {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            // Now we use the setEndPoints method
            .setEndpoint(envImporter.appwriteEndPoint)
            .setProject(envImporter.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);    
    };

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                envImporter.appwriteDatabaseId,
                envImporter.appwriteCollectionId,
                // Slug is post's id
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error : createPost : Error", error)

        }
    };

    // We are separating slug here because we are using slug as DOCUMENT_ID , So we don't want to destructure, we want to use slug directly.
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                envImporter.appwriteDatabaseId,
                envImporter.appwriteCollectionId,
                slug,

                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error : upatePost : Error", error);

        }
    };

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                envImporter.appwriteDatabaseId,
                envImporter.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service Error : deletePost : Error", error);
            return false;
        }
    };

    // To get only one post by passing slug or DOCUMENT_ID

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                envImporter.appwriteDatabaseId,
                envImporter.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service Error : getPost : Error", error);
            return false;
        }
    }

    // To get all Post by taking default value in parameter which is status, Here we are using Query 
    // So we get those posts whose query is that the status type should be active, We can pass multiple queries at once in array
    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                envImporter.appwriteDatabaseId,
                envImporter.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service Error : getAllPost : Error", error);
            return false;
        }
    };


    // File Upload Service

    // here we have to pass the block of file
    async uploadFile(fileId) {
        try {
            return await this.storage.createFile(
                envImporter.appwriteBucketId,
                ID.unique(),
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service Error : uploadFile : Error", error);
        }
    };

    async deleteUpload(fileId) {
        try {
            await this.storage.deleteFile(
                envImporter.appwriteBucketId,
                ID.unique(),
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service Error : deleteFile : Error", error);
            return false;
        }
    };

    // Now we will make a file preview service, we can use async but it is not returning any promises therefore we can use it without async.
    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                envImporter.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service Error : getFilePreview : Error", error);
        }
    } 

} 1

// We initialised an Object of the above class and export it.
const storageServiceServer = new storageService();

export default storageServiceServer;