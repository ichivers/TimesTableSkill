'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = ""; 
var SKILL_NAME = 'Times Tables';
var MAX_QUESTIONS = 5;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function(){
        var factor1 = this.attributes['factor1'] = Math.floor(Math.random() * 12);
        var factor2 = this.attributes['factor2'] = Math.floor(Math.random() * 12);
        var product = this.attributes['product'] = factor1 * factor2;
        this.attributes['questionsAnswered'] = 1;
        this.attributes['correctAnswers'] = 0;
        var speechOutput = "ok, here we go.  what is " + factor1 + " times " + factor2;
        var repromptSpeech = "what is " + factor1 + " times " + factor2;
        this.emit(':askWithCard', speechOutput, repromptSpeech, SKILL_NAME, factor1 + " x " + factor2);
    },
    'AnswerIntent': function(){
        var answerNum = parseInt(this.event.request.intent.slots.number.value);
        var targetNum = this.attributes["product"];
        var questionsAnswered = this.attributes["questionsAnswered"]
        console.log('user answered: ' + answerNum);
        if(answerNum == targetNum)
        {
            this.emit('Correct', questionsAnswered)
        } 
        else if(isNaN(answerNum))
        {
            this.emit('TryAgain');
        } 
        else 
        {
            this.emit('Incorrect', questionsAnswered);
        }
    },
    'TryAgain': function(){
        var factor1 = this.attributes['factor1']; 
        var factor2 = this.attributes['factor2'];
        var speechOutput = "sorry, I didn't catch that.  what is  " + factor1 + " times " + factor2;
        var repromptSpeech = "what is " + factor1 + " times " + factor2;
        this.emit(':askWithCard', speechOutput, repromptSpeech, SKILL_NAME, factor1 + " x " + factor2);
    },
   'Correct': function(questionsAnswered){
        this.attributes["questionsAnswered"]++
        this.attributes["correctAnswers"]++
        var factor1 = this.attributes['factor1'] = Math.floor(Math.random() * 12);
        var factor2 = this.attributes['factor2'] = Math.floor(Math.random() * 12);
        var product = this.attributes['product'] = factor1 * factor2;
        var speechOutput = 'correct! what is ' + factor1 + " times " + factor2;
        var repromptSpeech = "What is " + factor1 + " times " + factor2;
        if(questionsAnswered == MAX_QUESTIONS)
        {
            this.emit('EndGame', 'correct!');
        } else {
            this.emit(':askWithCard', speechOutput, repromptSpeech, SKILL_NAME, factor1 + " x " + factor2);
        }
    },
    'Incorrect': function(questionsAnswered){
        this.attributes["questionsAnswered"]++
        var factor1 = this.attributes['factor1'] = Math.floor(Math.random() * 12);
        var factor2 = this.attributes['factor2'] = Math.floor(Math.random() * 12);
        var product = this.attributes['product'] = factor1 * factor2;
        var speechOutput = "sorry, that's wrong.  what is  " + factor1 + " times " + factor2;
        var repromptSpeech = "what is " + factor1 + " times " + factor2;
        if(questionsAnswered == MAX_QUESTIONS)
        {
            this.emit('EndGame', "sorry, that's wrong.'");
        } else {
            this.emit(':askWithCard', speechOutput, repromptSpeech, SKILL_NAME, factor1 + " x " + factor2);
        }
    },
    'EndGame': function(speechOutput){
        var correctAnswers = this.attributes["correctAnswers"];
        this.emit(':tell', speechOutput + '.  You scored ' + correctAnswers + ' out of ' + MAX_QUESTIONS + ". thanks for playing, goodbye!");
    },
    "AMAZON.StopIntent": function() {
      this.emit(':tell', "goodbye!");  
    },
    "AMAZON.CancelIntent": function() {
      this.emit(':tell', "goodbye!");  
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(":tell", "goodbye!");
    },
    'Unhandled': function() {
        console.log("Unhandled");
        var message = 'foobar';
        this.emit(':tell', message, message);
    },
};