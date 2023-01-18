const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const cors = require("cors")({origin: true});

exports.saveMessage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      const {message} = request.body;
      const db = admin.firestore();
      const savedDoc = db.collection("inputs").doc().set({text: message});
      response.json({success: true, savedDoc});
    } catch (error) {
      response.json({success: false, error});
    }
  });
});

