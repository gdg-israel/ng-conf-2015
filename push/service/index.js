'use strict';

var gcm = require('node-gcm');
var Firebase = require('firebase');
var _ = require('lodash');

var registrationIds = [];

//API Server Key
var sender = new gcm.Sender(process.env.GCM_SECRET);

function sendMessage() {
    var message = new gcm.Message();
    message.timeToLive = 3000;
    sender.send(message, registrationIds, 4, function (result) {
        console.log('Send message:', result, '#users:', registrationIds.length);
    });
}

var fbRef = new Firebase('https://ng-conf-2015.firebaseio.com');
fbRef.authWithCustomToken(process.env.FIREBASE_TOKEN, function (err) {
    console.log('Authentication result: ', err);
    fbRef.child('register').on('value', function (snapshot) {
        registrationIds = _(snapshot.val()).values().pluck('subscription').uniq().map(function(endpoint) {
            return endpoint.replace(/^https:\/\/android.googleapis.com\/gcm\/send\//, '');
        }).value();
    });

    fbRef.child('send').on('value', function (snapshot) {
        if (snapshot.val()) {
            sendMessage();
        }
        snapshot.ref().remove();
    });
});
