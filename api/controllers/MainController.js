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
    // const data = require("./fakedb.json");

    //...
    upload: async function (req, res) {

        if (req.method == 'GET')
            return res.view('main/upload');
            const csv = require("fast-csv")
            // var surgeryno = require("fast-csv");
            // var option = require("fast-csv");
            var db = sails.firebaseAdmin.firestore();
            var uploadedFiles = req.file('surgeryno').upload({ maxBytes: 10000000 });
                //, async function whenDone(err, uploadedFiles) {
            //if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            var db = sails.firebaseAdmin.firestore();
            // var surgeryno = require("fast-csv");
            // var option = require("fast-csv");
            var index = 0;

            var batch = db.batch();

            csv.fromPath(uploadedFiles[0].fd, { headers: false }).on("data", function (data) {
                if (index == 0) {
                    index++;
                    return;
                }

                //  console.log()
             console.log(data);
                if (data[0]) {

                    batch.set(db.collection('surgery').doc(data[0]), {
                        "content": data[1],
                        "內容": data[2] ? data[2] : '',
                        "specialist": data[3],
                    });
                }

                index++;
            }).on("end", function () {
                batch.commit().then(function () {
                    return res.ok('csv file imported.');
                });

            });

            ///////////////////////////////////////////////////////////////////////////////
          
            var uploadedFiles = await req.file('optionmap').upload({ maxBytes: 10000000 });

            if (uploadedFiles) { return res.badRequest('No file was uploaded'); }

            var index = 0;
            var batch = db.batch();

            csv.fromPath(uploadedFiles[1].fd, { headers: false }).on("data", function (data) {
                if (index == 0 || data == 1) {
                    index++;
                    return;
                }

                
                //console.log()
                console.log(data);
                if (data[1].includes('General')) {

                    var count = 5;
                    var optionNum = 1;
                    while(data[count]){
                    batch.set(db.collection('general').doc(option).collection('data[2]').doc(optionNum), {
                        "content": data[count],
                        // "percentage": data[],
                        // "price": data[],
                        // "title" : data[],
                        "內容": data[count],
                    }
                );
                count++;
                optionNum++;
                    }
                }

                else if(data[0]){
                    var surgeryNum = daat[2].match(/\d/g);
                    var count = 5;
                    var optionNum = 1;
                    while(data[count]){
                    batch.set(db.collection('surgery').doc(option).collection(surgeryNum).doc('specific').collection(data[2].doc(optionNum).collection(count)), {
                        "content": data[count],
                        // "percentage": data[],
                        // "price": data[],
                        // "title" : data[],
                        "內容": data[count],
                    }
                );
                count++;
                optionNum++;
                    }
                }



                index++;
            }).on("end", function () {
                batch.commit().then(function () {
                    return res.ok('csv file imported.');
                });


            });
        },
};

//};
//...



