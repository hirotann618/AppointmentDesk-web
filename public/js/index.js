
class Index {

  static init() {
    // Firebaseの初期化
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

    // FirebaseUIインスタンス初期化
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // FirebaseUIの各種設定
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      signInFlow: 'popup',
      signInSuccessUrl: 'top.html',
      signInOptions: [
        // サポートするプロバイダを指定
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.(サービス利用規約ページの)
      tosUrl: '',
      //アカウント選択を行う画面の防止
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };

    // FirebaseUI描画開始
    ui.start('#firebaseui-auth-container', uiConfig);

  }
}