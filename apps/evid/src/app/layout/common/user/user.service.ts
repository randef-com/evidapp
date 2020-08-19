import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {IUser} from "../../../../../../../libs/api-interfaces/src/lib/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    // Observables
    private _user: BehaviorSubject<IUser | null>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this._user = new BehaviorSubject(null);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: IUser)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<IUser>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user data
     *
     * @param user
     */
    update(user: IUser): Observable<any>
    {
        return this._httpClient.patch('api/common/user', {user}).pipe(
            tap(() => {

                // Execute the observable
                this._user.next(user);
            })
        );
    }
}
