
class Main {

    constructor() {
        this.email = null;
        this.uid = null;
    }

    get useremail() {
        return this.email;
    }

    set useremail(value) {
        this.email = value;
    }

    get useruid() {
        return this.uid;
    }

    set useruid(value) {
        this.uid = value;
    }


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
                obj.useremail = user.email;
                obj.useruid = user.uid;

                jQuery('#nav_displayName').append(user.displayName);

                var db = firebase.firestore();

                var dataRef = db.collection('root').doc('record').collection(user.uid);
                dataRef.orderBy("date", "desc").onSnapshot(function (querySnapshot) {
                    jQuery('#table').empty();
                    querySnapshot.forEach(function (doc) {
                        // console.log(doc.data().date);
                        jQuery('#table').append('<tr>');
                        jQuery('#table').append('<td onclick="main.onDelete(main.useruid,\''+ doc.id +'\')">' + doc.data().code + '</td>');
                        jQuery('#table').append('<td onclick="main.onDelete(main.useruid,\''+ doc.id +'\')">' + moment(doc.data().date.toDate(), 'ddd MMM DD YYYY HH:mm:ss z ZZ').format('HH:mm') + '</td>');
                        jQuery('#table').append('</tr>');
                    });
                });
            } else {
                window.location.href = 'index.html'
            }
        });
    }

    onDelete(uid, id) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500
        });

        var options = {
            title: "削除してよろしいですか。",
            type: "question",
            showCancelButton: true,
        };

        Swal.fire(options)
            .then(function (isConfirm) {
                if (isConfirm.value) {

                    var db = firebase.firestore();
                    db.collection('root').doc('record').collection(uid).doc(id).delete().then(function () {
                        Toast.fire({
                            type: "success",
                            title: "削除しました。",
                        })
                    }).catch(function (error) {
                        Swal.fire({
                            type: "error",
                            title: "エラーが発生しました。",
                            text: error,
                        });
                    });
                } else {
                    // キャンセルボタンを押した時の処理
                    // valには 'null' が返ってきます
                    Swal.fire({
                        text: "キャンセルされました",
                        type: "info",
                    });
                }
            });
    }
}

var main = new Main();
Main.init(main);