'use strict';
const SDK = require('@serverless/event-gateway-sdk');
const URL = process.env.URL;
const eventGateway = new SDK({
  url: URL,
});

module.exports.simulate = (event, context, callback) => {
  eventGateway.emit({
    eventID: '1',
    eventType: 'user.created',
    cloudEventsVersion: '0.1',
    source: '/services/users',
    contentType: 'application/json',
    data: {
      userID: 'foo'
    }
  }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          error: err
        })
      }))
};

module.exports.main = (event, context, callback) => {
  console.log('event***************', event);
  let body = {
    "message": "Go Serverless v1.0! Your function executed successfully!",
    "input": event
  }

  let response = {
    "statusCode": 200,
    "body": JSON.stringify(body)
  };

  return response;
};

