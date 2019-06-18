class Top {
    static init(obj) {
        var config = {
            apiKey: "AIzaSyDKRzXfZC2R3H-aiJ8TXYtTPVOalpM-ogQ",
            authDomain: "appointmentdesk-2a477.firebaseapp.com",
            databaseURL: "https://appointmentdesk-2a477.firebaseio.com",
            projectId: "appointmentdesk-2a477",
            storageBucket: "appointmentdesk-2a477.appspot.com",
            messagingSenderId: "806497244401",
            appId: "1:806497244401:web:a109233e493316e2"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                jQuery('#nav_displayName').append(user.displayName);
                jQuery('#qrcode').qrcode({width: 64, height: 64, text: user.displayName});
            } else {
                window.location.href = 'index.html'
            }
        });
    }
}

var top = new Top();
Top.init(top);