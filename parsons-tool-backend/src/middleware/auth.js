import admin from 'firebase-admin';
import firebaseConfig from './firebaseConfig.json' assert { type: 'json' };

console.log('FirebaseConfig', firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const firebaseAuth =
  (requireAuth = false) =>
  async (req, res, next) => {
    // https://fireship.io/snippets/express-middleware-auth-token-firebase/
    if (req?.headers?.authorization?.startsWith('Bearer ')) {
      const idToken = req.headers.authorization.split('Bearer ')[1];

      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.currentUser = decodedToken;
      } catch (err) {
        console.log(err);
      }
    }
    if (requireAuth && req.currentUser == null) {
      return res.sendStatus(401);
    }

    next();
  };
