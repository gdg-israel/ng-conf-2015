Push Notifications service for ng-conf Israel 2015. 

Uses the [Web Push API](http://www.w3.org/TR/push-api/), as implemented in Chrome 42 for Android, PC and Mac. The backend is built on top of [Firebase](http://www.firebase.com).

File Structure
==============

* `web/index.html` - entry point for users to subscribe
* `web/service-worker.js` - service worker that listens for incoming notifications, get the message from firebase and displays it
* `web/broadcast.html` - admin interface to send the broadcasts
* `service/index.js` - node.js service that listens on Firebase and sends the actual messages

