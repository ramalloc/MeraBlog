import envImporter from '../Config/envImporter';
import { Client, Account, ID } from 'appwrite';

{/*

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('[PROJECT_ID] '); // Your project ID
const account = new Account(client);
const user = await account.create(
    ID.unique(),
    'email@example.com',
    'password'
    );
☺1
*/}

{/*
-> We can use the the user account creation/authentication code manually again and again, but this will create issue if are using it again and again with
UI/UX and Other Codes. Therefore we create this authentication service as Class.
*/}

export class Authservice {
    client = new Client();
    account;
    // Now we will create the account, but we will not create the account manually in the Client
    // because we want that when someone creates object then account should be created therefore we mkae a contructor
    constructor() {
        // Now we use the setEndPoints method
        this.client
            .setEndpoint(envImporter.appwriteEndPoint)
            .setProject(envImporter.appwriteProjectId);

        // Now we will set the client in account
        this.account = new Account(this.client);
    }

    // Now we will create the account, But we don't want any dependency In future if we will use firebase instead of appwrite
    // So we have to make a method, that will call the appwrite services. We can say that we created a wrapper, We hide the appwrite.

    // We will get Object In inputs
    async createAccount({ email, password, name }) {
        // But this account creation can be failed, So we will use try and catch 
        try {
            const userId = ID.unique();
            const userAccount = await this.account.create(userId, email, password, name);
            // now we have to check that account is created or not
            if (userAccount) {
                // Now we want that account is created then the user should be loggen in therefore we use another function for it.
                return this.login({ email, password});
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // Now If we want to check that the user is Logged in or not, OR to get current user so we create function for it
    async getCurrentUser() {
        try {
            return await this.account.get();
            // But if account is not present then the above will not return null
        } catch (error) {
            console.log("Appwrite Service Error :: getCurrentUser :: Error", error)
        }

        // If try doesn't return anything then we return null
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service Error : logout : Error", error);
        }
    }

}

{/*
-> So We creates a class named Authservice and export it. But If we created a class then we have to create an object to use the methods
    of that class. Therefore We makes an object then we will export that Object, And then we can just used the method by destructuring it.
*/}
// Below We created an Object of Authservice
const authServiceServer = new Authservice();

export default authServiceServer;

{/* In Appwrite, Account have many methods */ }