module.exports = function () {

    var req = this.req;
    var res = this.res;
    // var surgery;
    const { WebhookClient } = require('dialogflow-fulfillment');
    // const {Card, Suggestion} = require('dialogflow-fulfillment');

    const agent = new WebhookClient({ request: req, response: res });

    async function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    async function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
    async function surgery(agent) {
        let conv = agent.conv();
        let params = agent.parameters;
        doctorName = params.doctorName;
        console.log("The doctor name is " + doctorName);


        return agent.add('請問醫生名稱**');


    }
    async function noDoctorName(agent) {
        var lowerBaselinePrice
        var upperBaselinePrice
        var surgery = await db.collection('surgery').doc('58').get();
        var general = await db.collection('general').doc('option').get();
        var surgeryOptions = await surgery.collection('option').doc().get()
        surgeryOptions.forEach(element => {
            console.log(element.id);
            console.log(element.data())
        });
        await surgery.collection('option').doc('general').collection('A').doc().get()

        // var surgery1 = await db.collection('surgery').doc('58');
        // var surgery = await db.collection('surgery').doc('58').get();

        console.log(surgery.data().lowerBaselinePrice);
        console.log(upperBaselinePrice);

        agent.add(lowerBaselinePrice);

    }
    async function doctorName(agent) {
        let params = agent.parameters;
        doctorName = params.doctorName;
        console.log(agent.getContext('userprovidessurgery-followup'))
        console.log("The doctor name is " + doctorName);
        // getFulfillmentText(agent);
        console.log("Surgery in doctor name intent: ");
        agent.add('請問醫院名稱**');

    }
    async function noDoctorName(agent) {

    }
    async function hospital(agent) {
        let params = agent.parameters;
        hospital = params.hospital;
        console.log("The hospital is " + hospital);
        //console.log(">>>>"+)
        // console.log("INput context is: "+ req.body.outputContexts[2].surgery);

        agent.add('請輸入全單價錢(包括所有醫生/醫院收費)**');

    }
    async function price(agent) {
        let params = agent.parameters;
        price = params.price;
        console.log("The price is " + price);
        agent.add("The price is " + price);

    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('user provides surgery', surgery);
    intentMap.set('user provides doctor name', doctorName);
    intentMap.set('user does not provide doctor name', noDoctorName)
    intentMap.set('user provides hospital', hospital);
    intentMap.set('user provides price', price);
    // intentMap.set('user does not provide doctor name', noDoctorName);
    // intentMap.set('user wants to see doctor list', doctorlist);
    // intentMap.set('follow up', followUp);
    agent.handleRequest(intentMap);
    // // intentMap.set('<INTENT_NAME_HERE>', yourFunctionHandler);
    // // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
    // agent.handleRequest(intentMap);

    // intentMap.set('user provides surgery', (agent) => {
    //     let conv = agent.conv();
    //     console.log(":::::::::::::::::::::::");
    //     console.log(conv);
    //     let params = agent.parameters;
    //     surgery = params.surgery;
    //     console.log("The surgery is "+surgery);

    //     return agent.add('請輸入負責手術的醫生名字，如不知道請輸入"0"**');

    // });
    // intentMap.set('user provides doctor name', (agent) => {
    //     let conv = agent.conv();
    //     let params = agent.parameters;
    //     doctorName = params.doctorName;
    //     console.log("The doctor name is "+doctorName);
    //     // getFulfillmentText(agent);
    //     console.log("Surgery in doctor name intent: ");
    //     return agent.add('請問醫院名稱**');

    // });
    // intentMap.set('user provides hospital', (agent) => {
    //     let conv = agent.conv();
    //     let params = agent.parameters;
    //     hospital = params.hospital;
    //     console.log("The hospital is "+hospital);
    //     //console.log(">>>>"+)
    //     console.log("INput context is: "+ req.body.outputContexts[2].surgery);

    //     return conv.close('請輸入全單價錢(包括所有醫生/醫院收費)**');

    // });
    // intentMap.set('user provides price', (agent) => {
    //     let conv = agent.conv();
    //     let params = agent.parameters;
    //     price = params.price;
    //     console.log("The price is "+ price);
    // for(var key in surgery_summary)break;
    // var temp = surgery_summary[key];
    // console.log("11111111."+temp);
    // // var output = "所以，你地案例為下：\n"
    // // // console.log(output);
    // // console.log("@@@@@@@@");
    // // console.log(gastroscopy_summary.B);
    // // for(var key in gastroscopy_summary){
    // //     var temp = gastroscopy_summary[key];
    // //     console.log("*******"+temp);
    // //    console.log(temp[1].name);
    // //    const optionsList = list.map(item => Object.values(item)[0]);
    // // }
    // var count = 0;
    // for(var key in gastroscopy_summary){
    //     output += (abc[count] +": "+gastroscopy_summary[key][1].name+"\n");
    //     count++;
    // }
    // // console.log(output);
    // return conv.close("Display the surgery summary");

    // });
    // intentMap.set('user modifies details', (agent) => {
    //     let conv = agent.conv();

    // });


}