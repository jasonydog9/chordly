const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this exists!

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;