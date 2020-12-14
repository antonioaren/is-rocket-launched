import * as admin from 'firebase-admin';
class FirebaseDatabaseRepository {
  db: admin.database.Database | undefined;

  constructor() {
    this.db = admin.database();
  }

  public getAll(urlRouteEntity: string) {}

  public getOne(urlRouteEntity: string, id: string) {
    return new Promise((resolve, reject) => {
      var ref = this.db?.ref(`${urlRouteEntity}/${id}`);
      if (ref) {
        ref.on(
          'value',
          snapshot => {
            console.log(snapshot.val());
            resolve(snapshot.val());
          },
          errorObject => {
            console.log('The read failed: ' + errorObject);
            reject('Error Firebase');
          }
        );
      }
    });
  }

  public set(urlRouteEntity: string, id: string, data: {}) {
    const ref = this.db?.ref(urlRouteEntity);
    var pointer = ref?.child(id);
    pointer?.set(data);
  }
}

export default new FirebaseDatabaseRepository();


