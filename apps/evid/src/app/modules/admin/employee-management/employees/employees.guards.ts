import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeesDetailsComponent} from "./details/details.component";

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateEmployeesDetails implements CanDeactivate<EmployeesDetailsComponent>
{
    canDeactivate(
        component: EmployeesDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }

        if ( !nextState.url.includes('/employees') )
        {
            // Let it navigate
            return true;
        }

        if ( nextRoute.paramMap.get('id') )
        {
            // Just navigate
            return true;
        }
        else
        {
            return component.closeDrawer().then(() => {
                return true;
            });
        }
    }
}
