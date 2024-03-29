/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // var admin = require('firebase-admin');
  // var serviceAccount = require(sails.config.appPath + '/wecarebill-92132-firebase-adminsdk-7usxj-6240df0e36.json');
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: 'https://wecarebill-92132.firebaseio.com'

  // });

  // var db = admin.firestore();

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```


  var admin = require('firebase-admin');
  var serviceAccount = require(sails.config.appPath + '/testing-d68ea-firebase-adminsdk-jl7jl-05994dc0b1.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://testing-d68ea.firebaseio.com'


  });

  sails.firebaseAdmin = admin;

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
return done();

};
