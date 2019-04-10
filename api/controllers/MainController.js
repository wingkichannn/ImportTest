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
        var serviceAccount = require(sails.config.appPath + '/testing-d68ea-firebase-adminsdk-jl7jl-05994dc0b1.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://testing-d68ea.firebaseio.com'

        })
    },

    // ///////////////////////////////////////////////////////////////////////////
    // upload: async function (req, res) {

    //     if (req.method == 'GET')
    //         return res.view('main/upload');

    //     req.file('surgeryno').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
    //         if (err) { return res.serverError(err); }
    //         if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

    //         var db = sails.firebaseAdmin.firestore();
    //         var surgeryno = require("fast-csv");
    //         // var optionmap = require("fast-csv");
    //         var index = 0;

    //         var batch = db.batch();

    //         surgeryno.fromPath(uploadedFiles[0].fd, { headers: false }).on("data", function (data) {
    //             if (index == 0) {
    //                 index++;
    //                 return;
    //             }

    //             // console.log()
    //             // console.log(data);
    //             if (data[0]) {

    //                 batch.set(db.collection('surgery').doc(data[0]), {
    //                     "content": data[1],
    //                     "內容": data[2] ? data[2] : '',
    //                 });
    //             }

    //             index++;
    //         }).on("end", function () {
    //             batch.commit().then(function () {
    //                 return res.ok('csv file imported.');
    //             });

    //         });
    //     });
    // },
    //////////////////////////////////////////////////////////////////////////////
    upload2: async function (req, res) {


        if (req.method == 'GET')
            return res.view('main/upload2');

        const csv = require("fast-csv");
        var db = sails.firebaseAdmin.firestore();

        var surgeryNoBuffer = new Buffer(req.body.sugeryNo[1].split(",")[1], 'base64'.toString('utf8'));
        var calibrationBuffer = new Buffer(req.body.calibration[1].split(",")[1], 'base64'.toString('utf8'));
        var optionmappingBuffer = new Buffer(req.body.optionmapping[1].split(",")[1], 'base64'.toString('utf8'));
        var hospitalcodeBuffer = new Buffer(req.body.hospitalcode[1].split(",")[1], 'base64'.toString('utf8'));

        await new Promise((resolve, reject) => {
            var index = 0;
            var batch = db.batch();
            csv.fromString(surgeryNoBuffer, { headers: false }).on("data", function (data) {
                if (index == 0) {
                    index++;
                    return;
                }

                if (data[0]) {

                    batch.set(db.collection('surgery').doc(data[0]), {
                        "content": data[1],
                        "內容": data[2] ? data[2] : '',
                    });
                }

                index++;
            }).on("end", function () {
                batch.commit().then(function () {
                    console.log('surgeryNo end');
                    resolve();
                });
            });
        });



        console.log(req.body);
        return res.ok("uploaded");
    },

};




