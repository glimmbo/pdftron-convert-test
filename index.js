const { exec } = require("child_process");
const { PDFNet } = require("@pdftron/pdfnet-node");

/**
 * This handler function will run successfully when simply calling exports.handler()
 * in my local environment using Node 16 and Node 18.
 *
 * However, when I run it in the serverless framework, I get a FATAL ERROR (output saved
 * at locking_error). This is a new issue, unrelated to the ticket I raised (#54060).
 *
 * Because of this locking error related to running the function with serverless-offline,
 * I'm unable to reproduce the segfault encountered in our deployed lambda...
 */

module.exports.handler = async (event) => {
  const main = async () => {
    // Log node version
    exec("node -v", (error, stdout, stderr) => {
      console.log("Node Version: " + stdout);
    });

    const doc = await PDFNet.PDFDoc.create();
    const page = await doc.pageCreate();
    await doc.pagePushBack(page);
    await doc.save("blank.pdf", PDFNet.SDFDoc.SaveOptions.e_linearized);
  };

  await PDFNet.runWithCleanup(
    main,
    "demo:1661365188258:7a05c77903000000007b8fc9ed2f758482b585d287024b8d387459a750"
  )
    .catch(function (error) {
      console.log("Error: " + JSON.stringify(error));
    })
    .then(function () {
      PDFNet.shutdown();
    });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

exports.handler();
