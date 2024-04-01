// We are create a object and we will include/import all anv vars in String

const envImporter = {
    appwriteEndPoint: String(import.meta.env.VITE_APPWRITE_API_END_POINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyAPi: String(import.meta.env.VITE_TINY_API_KEY)
}

export default envImporter;
