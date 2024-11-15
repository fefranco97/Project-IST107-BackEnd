const { onRequest } = require("firebase-functions/v2/https");
const db = require("../../config/db");

const GetUsers = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.uid, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { GetUsers };
