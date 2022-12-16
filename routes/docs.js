const express=require("express");
const docs = require('@googleapis/docs')
require("dotenv").config()
const path=require("path")
const router=express.Router()
const log=console.log

router.post('/api/create-doc', async (req, res) => {
    try {
        const title = req.body.doc_title || "My first document via API"
        const serviceAccountfileName=process.env.GOOGLE_SERVICE_ACCOUNT_FILE
        const keyPath=path.resolve(__dirname,`../credentials/${serviceAccountfileName}`)
 
        const auth = new docs.auth.GoogleAuth({
            keyFilename: keyPath,  // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/documents']
        });
         const authClient = await auth.getClient();
 
        const client = await docs.docs({
            version: 'v1',
            auth: authClient
        });
    
        const createResponse = await client.documents.create({
            requestBody: {
                title
            },
        });

        return res.status(200).json(createResponse.data)
    } catch (error) {
        log("ERROR ",error);
        return res.status(403).json(error)
    }    
   
})

module.exports=router