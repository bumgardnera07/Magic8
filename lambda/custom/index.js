/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.cf45805e-e739-4f93-8fca-cfe058cd97fe';

const SKILL_NAME = 'Magic8';
const GET_ANS_MESSAGE = "Magic Eight says:";
const HELP_MESSAGE = 'You can say ask Magic Eight, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const data = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'of course',
    'Count on it',
    'yes yes yes',
    'Yes',
    'Looks to be so',
    'Absolutely',
    'It seems so',
    'Not sure, try again',
    'Ask again later',
    'Better not to say',
    'Concentrate and Ask Again',
    'Look within',
    'No',
    'not likely',
    'very doubtful',
    'impossible',
    'No way',
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewAnsIntent');
    },
    'GetNewAnsIntent': function () {
        const AnsArr = data;
        const AnsIndex = Math.floor(Math.random() * AnsArr.length);
        const randomAns = AnsArr[AnsIndex];
        const speechOutput = GET_ANS_MESSAGE + randomAns;

        this.response.cardRenderer(SKILL_NAME, randomAns);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
