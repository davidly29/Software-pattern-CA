import {FirebaseService} from '../firebase.service';

export class SaveHistory implements UserInterface {
    constructor(private firebase: FirebaseService) {
    }

    saveUser(userOrder): any {
        this.firebase.addUserHistory(userOrder).then(console.log);
        return userOrder;
    }

}
