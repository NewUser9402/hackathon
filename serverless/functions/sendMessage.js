/*exports.handler = async function (context, event, callback) {
    // const client1 = context.getTwilioClient();
    let response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
    response.appendHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent'
    );
    response.appendHeader('Vary', 'Origin');

    const twilio = require('twilio');
    const client = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    console.log(event);
    // console.log(req.body);
    const message = event.message;
    const phoneNumbers = event.phoneNumbers;
    console.log(String(message));

    // client.messages.create({
    //     body: String(message),
    //     from: '+16786790494',
    //     to: phoneNumbers[0],
    // });
    
    try {
        phoneNumbers.forEach(async (phoneNumber) => {
            await client.messages.create({
            body: String(message),
            from: '+16786790494',
            to: phoneNumber,
            });
        });

        // setTimeout(() => {res.send();}, 3000)
        // res.send();
        response.setStatusCode(200);
        response.setBody({"good": "goody"});
        callback(null, response);
    }
    catch(err) {
        console.log('error');
        callback(response, null);
    }
};*/

















// Worker ending interaction
const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = async function (context, event, callback) {
    const { TRANSLATION_FLAG } = context;
    const client = context.getTwilioClient();
    const functions = Runtime.getFunctions();
    let response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
    response.appendHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent'
    );
    response.appendHeader('Vary', 'Origin');

    // Get helper serverless functions
    // const msCallPath = functions['ms/call-service'].path;
    // const conversationPath = functions['ms/send-conversation'].path;
    // const flexContentPath = functions['flex/get-flex-content'].path;
    // const callMs = require(msCallPath).handler;
    // const sendConversation = require(conversationPath).handler;
    // const flexContent = require(flexContentPath).handler;

    const twilio = require('twilio');
    const client2 = new twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    console.log(event);
    // console.log(req.body);
    const message = event.message;
    const phoneNumbers = event.phoneNumbers;
    console.log(String(message));

    // client.messages.create({
    //     body: String(message),
    //     from: '+16786790494',
    //     to: phoneNumbers[0],
    // });
    
    try {
        let res;
        phoneNumbers.forEach(async (phoneNumber) => {
            res = await client2.messages.create({
            body: String(message),
            from: '+16786790494',
            to: phoneNumber,
            });
        });

        response.setStatusCode(200);
        response.setBody(res);
        callback(null, response);
    } catch (err) {
        console.log('Complete control error:', err);
        handleError(err);
    }
};
