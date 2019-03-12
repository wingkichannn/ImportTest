'use strict';
 
//const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const {dialogflow} = require('actions-on-google');

const app = dialogflow();

var surgery;
var price;
var doctorName;
var hospital;
var abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];


var gastroscopy_summary= { 
    "B" : gastroscopy_B,
    "C" : gastroscopy_C,
    
    
};
// var gastroscopy_A= {
//     "A1" : {
//         "name" : "沒息肉切除", 
//         "price" : 0
//     },
//     "A2" :{
//         "name" : "<=3有息肉切除 <=1cm",
//         "price" : 4700
//     },
//     "A3" :{
//         "name" : ">3息肉切除 <=1cm",
//         "price" : 6800
//     },

//     "A4" :{
//         "name": "大粒息肉 >1cm",
//         "price" : -1
//     }
// };
// var gastroscopy_B = {
//    "B1":{
//        "name": "一般胃鏡",
//        "price":-1
//     },
//     "B2":{
//         "name":"自體熒光成像",
//         "price":-1
//     },
//     "B3":{
//         "name":"超細胃鏡5mm(小孩/老人)",
//         "price":-1

//     } , 
//     "B4":{
//         "name":"膠囊內鏡",
//         "price":-1
//     }
// };

// var gastroscopy_C = ["沒有併發症/複雜/特別風險/另加手術", "中風險", "有併發症/複雜/另加手術", "急症"];

// var gastroscopy_B = ["一般胃鏡", "自體熒光成像", "超細胃鏡5mm(小孩/老人)", "膠囊內鏡"];

// var gastroscopy_C = ["沒有併發症/複雜/特別風險/另加手術", "中風險", "有併發症/複雜/另加手術", "急症"];

////////////////// convert the object to an array.//////////////////////////////////////
// var gastroscopy_A_array = [];
// var gastroscopy_B_array = [];
// for(var key in gastroscopy_A){
//     gastroscopy_A_array.push(gastroscopy_A[key]);
// }
// for(var key in gastroscopy_B){
//     gastroscopy_B_array.push(gastroscopy_B[key]);
// }
///////////////////////////////////////////////////////////////////////////////////
var gastroscopy_B = ["一般胃鏡", "自體熒光成像", "超細胃鏡5mm(小孩/老人)", "膠囊內鏡"];

var gastroscopy_C = ["沒有併發症/複雜/特別風險/另加手術", "中風險", "有併發症/複雜/另加手術", "急症"];

//////////////////////Code for each Intent////////////////////////////////////

app.intent('user provides surgery', (conv, params) => {
    surgery = params.surgery;
    console.log("The surgery is "+surgery);
  
    return conv.close('請輸入負責手術的醫生名字，如不知道請輸入"0"**');
    
});
app.intent('user provides doctor name', (conv, params, req) => {
    doctorName = params.doctorName;
    console.log("The doctor name is "+doctorName);
    return conv.close('請問醫院名稱**');
    
});
app.intent('user provides hospital', (conv, params) => {
    
    hospital = params.hospital;
    console.log("The hospital is "+hospital);
   
    return conv.close('請輸入全單價錢(包括所有醫生/醫院收費)**');

});
app.intent('user provides price', (conv,parmas) => {
    price = params.price;
    console.log("The price is "+ price);
    var output = "所以，你地案例為下：\n"
    console.log(output);
    for(var key in gastroscopy_summary){
        var count = 0;
        output += abc[count] +": "+gastroscopy_summary[key][0].name+"\n";
    }
    console.log(output);
    return conv.close(output);

});
app.intent('user modifies details', (conv, params) => {
   
});
// function makeOutputMessage(surgery){
//     var outputMessage;
//     for(var key in gastroscopy_summary){
//         console.log(key);
//     }
    
// };
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
module.exports = app;