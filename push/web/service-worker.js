self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        fetch('https://ng-conf-2015.firebaseio.com/message.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return self.registration.showNotification(data.title, {
                    body: data.body,
                    icon: icon,
                    tag: tag
                });
            }));
});
