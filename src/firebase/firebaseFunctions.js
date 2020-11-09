import firebase from 'firebase/app';

export default function writeUserData(userId, date, energyType, predictedVal) {
  firebase
    .database()
    .ref('users/' + userId)
    .update({
      date: date,
      energyType: energyType,
      prediction: predictedVal,
    });
}

export default function readUserData(userId) {
  firebase
    .database()
    .ref('users/' + userId)
    .on(
      'value',
      function (snapshot) {
        console.log(snapshot.val().index);
      },
      function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      },
    );
}
