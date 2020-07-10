import { Injectable } from '@angular/core';
import { EvidDrawerComponent } from './drawer.component';

@Injectable({
    providedIn: 'root'
})
export class EvidDrawerService
{
    // Private
    private _componentRegistry: Map<string, EvidDrawerComponent>;

    /**
     * Constructor
     */
    constructor()
    {
        // Set the defaults
        this._componentRegistry = new Map<string, EvidDrawerComponent>();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: EvidDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): EvidDrawerComponent
    {
        return this._componentRegistry.get(name);
    }
}
