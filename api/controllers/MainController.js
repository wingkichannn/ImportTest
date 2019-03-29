/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // fulfill: async function (req, res) {
    //     return res.fulfillment();
    // },
    // // index2: async function (req, res) {
    // //     var admin = require('firebase-admin');
    // //     var serviceAccount = require(sails.config.appPath + '/wecarebill-92132-firebase-adminsdk-7usxj-6240df0e36.json');
    // //     admin.initializeApp({
    // //       credential: admin.credential.cert(serviceAccount),
    // //       databaseURL: 'https://wecarebill-92132.firebaseio.com'

    // //     })
    // // }
    index: async function (req, res) {

        var admin = require('firebase-admin');
        var serviceAccount = require(sails.config.appPath + '/wecarebill-92132-firebase-adminsdk-7usxj-6240df0e36.json');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: 'https://wecarebill-92132.firebaseio.com'

        })
        const data = require("./fakedb.json");

        /**
         * Data is a collection if
         *  - it has a odd depth
         *  - contains only objects or contains no objects.
         */
        function isCollection(data, path, depth) {
            if (
                typeof data != 'object' ||
                data == null ||
                data.length === 0 ||
                isEmpty(data)
            ) {
                return false;
            }

            for (const key in data) {
                if (typeof data[key] != 'object' || data[key] == null) {
                    // If there is at least one non-object item in the data then it cannot be collection.
                    return false;
                }
            }

            return true;
        }

        // Checks if object is empty.
        function isEmpty(obj) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }

        async function upload(data, path) {
            return await admin.firestore()
                .doc(path.join('/'))
                .set(data)
                .then(() => console.log(`Document ${path.join('/')} uploaded.`))
                .catch(() => console.error(`Could not write document ${path.join('/')}.`));
        }

        /**
         *
         */
        async function resolve(data, path = []) {
            if (path.length > 0 && path.length % 2 == 0) {
                // Document's length of path is always even, however, one of keys can actually be a collection.

                // Copy an object.
                const documentData = Object.assign({}, data);

                for (const key in data) {
                    // Resolve each collection and remove it from document data.
                    if (isCollection(data[key], [...path, key])) {
                        // Remove a collection from the document data.
                        delete documentData[key];
                        // Resolve a colleciton.
                        resolve(data[key], [...path, key]);
                    }
                }

                // If document is empty then it means it only consisted of collections.
                if (!isEmpty(documentData)) {
                    // Upload a document free of collections.
                    await upload(documentData, path);
                }
            } else {
                // Collection's length of is always odd.
                for (const key in data) {
                    // Resolve each collection.
                    await resolve(data[key], [...path, key]);
                }
            }
        }

        resolve(data);
    }


    // const admin = require('../functions/node_modules/firebase-admin')
    // const serviceAccount = require("./service-key.json")

    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: 'https://wecarebill-92132.firebaseio.com'
    // });


}

