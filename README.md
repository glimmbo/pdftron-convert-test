# Locking Error

Using Node 18.16 on my local machine, I run into a FATAL ERROR by following these steps:

1. Install packages `npm i`
2. Run the function using just node: `node index.js`
3. Run the function using serverless-offline: `serverless offline`
4. `curl http://localhost:3000/`. This causes the error saved in `locking_error`

# Segmentation Fault test

Because I'm unable to test the function without getting the Locking Error, I'm at a loss with how to
proceed with the PDFNet.PDFDoc.create() test you suggested, in the deployed Lambda.
