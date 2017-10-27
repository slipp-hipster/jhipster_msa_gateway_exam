import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Contents } from './contents.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ContentsService {

    private resourceUrl = '/app1/api/contents';

    constructor(private http: Http) { }

    create(contents: Contents): Observable<Contents> {
        const copy = this.convert(contents);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(contents: Contents): Observable<Contents> {
        const copy = this.convert(contents);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Contents> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Contents.
     */
    private convertItemFromServer(json: any): Contents {
        const entity: Contents = Object.assign(new Contents(), json);
        return entity;
    }

    /**
     * Convert a Contents to a JSON which can be sent to the server.
     */
    private convert(contents: Contents): Contents {
        const copy: Contents = Object.assign({}, contents);
        return copy;
    }
}
