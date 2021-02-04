exports.handler = async function (context, event, callback) {
    const client = context.getTwilioClient();
    let response = new Twilio.Response();
    let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };
    
    // Set headers in response
    response.setHeaders(headers);

    client.messages.create({
        body: 'hi',
        from: '+16786790494',
        to: '+16786611799‬',
    }).then(() => {
        callback(null, response);
    }).catch((err) => {
        callback(err, response);
    });
};