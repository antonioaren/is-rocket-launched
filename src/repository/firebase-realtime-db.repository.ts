import * as admin from 'firebase-admin';
class FirebaseDatabaseRepository {
  constructor() {
    
  }

  public getAll(urlRouteEntity: string) {}

  public getOne<T>(urlRouteEntity: string, id: string) : Promise<T> {
    return new Promise((resolve, reject) => {
      const db = admin.database();
      var ref = db.ref(`${urlRouteEntity}/${id}`);
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
    const db = admin.database();
    const ref = db.ref(urlRouteEntity);
    var pointer = ref.child(id);
    pointer.set(data);
  }

  public delete(urlRouteEntity: string, id: string) {
    const db = admin.database();
    const ref = db.ref(urlRouteEntity);
    var pointer = ref.child(id);
    pointer.remove();
  }
}

export default new FirebaseDatabaseRepository();


