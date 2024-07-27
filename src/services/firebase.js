import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

class FirebaseService {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.storage = app.storage();
    this.firestore = app.firestore();
    this.auth = app.auth();
  }

  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  loginWithGoogle = () =>
    this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  loginWithFacebook = () =>
    this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  loginWithGithub = () =>
    this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  logoutUser = () => this.auth.signOut();

  resetPassword = (email) => this.auth.sendPasswordResetEmail(email);

  addUserToDB = (id, user) =>
    this.firestore.collection("users").doc(id).set(user);

  getUserFromDB = (id) => this.firestore.collection("users").doc(id).get();

  updatePassword = (password) => this.auth.currentUser.updatePassword(password);

  changeUserPassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => resolve("Password updated successfully!"))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  reauthenticate = (currentPassword) => {
    const user = this.auth.currentUser;
    const credential = app.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(credential);
  };

  updateUserEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => resolve("Email Successfully updated"))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  updateUserProfile = (id, updates) =>
    this.firestore.collection("users").doc(id).update(updates);

  authStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items, userId) =>
    this.firestore.collection("users").doc(userId).update({ basket: items });

  setAuthPersistence = () =>
    this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // PRODUCT ACTIONS --------------

  getProductById = (id) => this.firestore.collection("products").doc(id).get();

  getProducts = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.firestore
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const products = [];
            snapshot.forEach((doc) =>
              products.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ products, lastKey });
          } catch (error) {
            reject(error?.message || ":( Failed to fetch products.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.firestore
              .collection("products")
              .get();
            const total = totalQuery.docs.length;
            const query = this.firestore
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const products = [];
              snapshot.forEach((doc) =>
                products.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ products, lastKey, total });
            }
          } catch (error) {
            if (didTimeout) return;
            reject(error?.message || ":( Failed to fetch products.");
          }
        }
      })();
    });
  };

  searchProducts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = this.firestore.collection("products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const nameQuery = productsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const keywordQuery = productsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await nameQuery.get();
          const keywordSnaps = await keywordQuery.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const nameProducts = [];
            const keywordProducts = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                nameProducts.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordSnaps.empty) {
              keywordSnaps.forEach((doc) => {
                keywordProducts.push({ id: doc.id, ...doc.data() });
              });
            }

            const mergedProducts = [...nameProducts, ...keywordProducts];
            const uniqueProducts = {};

            mergedProducts.forEach((product) => {
              uniqueProducts[product.id] = product;
            });

            resolve({ products: Object.values(uniqueProducts), lastKey });
          }
        } catch (error) {
          if (didTimeout) return;
          reject(error);
        }
      })();
    });
  };

  getFeaturedProducts = (itemsCount = 12) =>
    this.firestore
      .collection("products")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedProducts = (itemsCount = 12) =>
    this.firestore
      .collection("products")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  addProductToDB = (id, product) =>
    this.firestore.collection("products").doc(id).set(product);

  generateProductKey = () => this.firestore.collection("products").doc().id;

  uploadImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id) => this.storage.ref("products").child(id).delete();

  updateProduct = (id, updates) =>
    this.firestore.collection("products").doc(id).update(updates);

  deleteProduct = (id) =>
    this.firestore.collection("products").doc(id).delete();
}

const firebaseServiceInstance = new FirebaseService();

export default firebaseServiceInstance;
