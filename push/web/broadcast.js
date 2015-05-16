'use strict';

angular.module('ngconf.broadcast', ['firebase'])
    .controller('BoardcastCtrl', function (Firebase, $firebaseObject, $timeout) {
        var vm = this;

        var auth = location.hash.substr(1);
        var fbRef = new Firebase('https://ng-conf-2015.firebaseio.com/');
        fbRef.authWithCustomToken(auth, angular.identity);

        vm.message = $firebaseObject(fbRef.child('message'));

        fbRef.child('register').on('value', function (snapshot) {
            $timeout(function() {
                vm.registeredUsers = _(snapshot.val()).values().pluck('subscription').uniq().value().length;
            })
        });

        vm.send = function () {
            vm.message.$save().then(function() {
                fbRef.child('send').set(true);
            });
            fbRef.child('history').push({
                title: vm.message.title,
                body: vm.message.body,
                timestamp: Firebase.ServerValue.TIMESTAMP
            });
        }
    });
