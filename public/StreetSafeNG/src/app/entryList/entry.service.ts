import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntryService {
    private ApiRoute = 'api/entry';
    constructor(private http: Http) { }

    getEntrys() {
        return this.http.get(this.ApiRoute)
        .toPromise()
        .then(response => response.json().entrys)
        .catch();
    }
}