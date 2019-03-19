/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    fulfill: async function (req, res) {
        return res.fulfillment();
    },
    // index2: async function (req, res) {
    //     var admin = require('firebase-admin');
    //     var serviceAccount = require(sails.config.appPath + '/wecarebill-92132-firebase-adminsdk-7usxj-6240df0e36.json');
    //     admin.initializeApp({
    //       credential: admin.credential.cert(serviceAccount),
    //       databaseURL: 'https://wecarebill-92132.firebaseio.com'
      
    //     })
    // }
    
};

