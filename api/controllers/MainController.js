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

        // var surgerynoBuffer = new Buffer(req.body.surgeryno[1].split(",")[1], 'base64').toString('utf8');
        // var optionmapBuffer = new Buffer(req.body.optionmap[1].split(",")[1], 'base64').toString('utf8');
        var calibrationBuffer = new Buffer(req.body.calibration[1].split(",")[1], 'base64').toString('utf8');
        // var hospitalBuffer = new Buffer(req.body.hospital[1].split(",")[1], 'base64').toString('utf8');

        //////////////////////CALIBRATION//////////////////////////////////////

        await new Promise((resolve, reject) => {
            var index = 0;
            var batch = db.batch();

            csv.fromString(calibrationBuffer, { headers: false }).on("data", function (data) {
                if (index == 0) {
                    index++;
                    return;
                }
                if (index == 1) {
                    index++;
                    return;
                }

                // console.log()
                console.log(data);
                if (data[4]) {
                    /////////////extract surgery number & surgery option//////////
                    //data[4] = name 

                    var cSurgeryNo = data[6].toLowerCase().match(/^([\d]+)/g)[0];//take out surgery number e.g. 121
                    var cSurgeryOptionNum = data[6].toLowerCase().match(/([\d]+)$/g)[0];//take out surgery option number e.g. 1 from A1
                    var cSurgeryOption = data[6].toLowerCase().replace(cSurgeryNo, '').replace(cSurgeryOptionNum, '');//take out the option GeneralA/A(specific)


                    var amount = data[7];//price
                    var agePercentage = data[6].match(/^[\d]+/g);//extract digits but no %
                    var useAmount = data[44].match(/\d/g);//extract digits but no %

                    // var d = {};//no need this as read line by line

                    if (cSurgeryNo) {

                        ////////////Base Case/////////////
                        if (data[4].toLowerCase().includes("base")) {
                            // d['cSurgeryNo'] = data[7];
                            batch.set(db.collection('surgery').doc(cSurgeryNo), {
                                "baseline_price": data[7],
                            }, { merge: true });//overwrite the field
                        } else if (data[4].toLowerCase().includes("lower")) {
                            // d['cSurgeryNo'] = data[7];
                            batch.set(db.collection('surgery').doc(cSurgeryNo), {
                                "lowerBaselinePrice": data[7],
                            }, { merge: true });
                        } else if (data[4].toLowerCase().includes("upper")) {
                            batch.set(db.collection('surgery').doc(cSurgeryNo), {
                                "upperBaselinePrice": data[7],
                            }, { merge: true });
                        } else if (data[4].toLowerCase().includes("docfeehkrange")) {
                            batch.set(db.collection('surgery').doc(cSurgeryNo), {
                                "range": data[7],
                            }, { merge: true });
                        }
                        else if (cSurgeryOptionNum) {
                            if (data[6].toLowerCase().includes('general')) {
                                var generalOption = data[6].toLowerCase().replace('general', '');
                                batch.set(db.collection('surgery').doc(cSurgeryNo).collection('option').doc('general').collection(generalOption).doc(cSurgeryOptionNum), {
                                    // "baseline_price": data[7],
                                    "percentage": agePercentage,
                                    "price": amount,
                                });
                            } else {
                                batch.set(db.collection('surgery').doc(cSurgeryNo).collection('option').doc('specific').collection(cSurgeryOption).doc(cSurgeryOptionNum), {
                                    // "baseline_price": data[7],
                                    "percentage": agePercentage,
                                    "price": amount,
                                });
                            }
                        }

                    }

                    //////////////////////////////////////////

                }

                index++;
            }).on("end", function () {
                batch.commit().then(function () {
                    console.log('calibration end');
                    resolve();
                });

            });
        });
        ///////////////////////HOSIPITAL CODE////////////////////////////
        // await new Promise((resolve, reject) => {
        //     var index = 0;
        //     var batch = db.batch();

        //     csv.fromString(hospitalBuffer, { headers: false }).on("data", function (data) {
        //         if (index == 0) {
        //             index++;
        //             return;
        //         }
        //         if (index == 1) {
        //             index++;
        //             return;
        //         }

        //         // console.log()
        //         console.log(data);
        //         if (data[0] && data[1]) {

        //             batch.set(db.collection('hospital').doc(data[0]), {
        //                 "id": data[0],
        //                 "content": data[1],
        //                 "內容": data[1],

        //             });
        //         }

        //         index++;
        //     }).on("end", function () {
        //         batch.commit().then(function () {
        //             console.log('hospital end');
        //             resolve();
        //         });

        //     });
        // });


        console.log(req.body);

        return res.ok("Files uploaded successfully");

    },

};






