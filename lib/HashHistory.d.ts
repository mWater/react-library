/** Simple hash-based history that allows blocking transitions within the page
 * asynchronously. */
export declare class HashHistory {
    /** Index of current page in stack. Used to determine if push or pop */
    index: number;
    /** Listeners for location changes */
    locationListeners: HashLocationListener[];
    /** Listeners for blockers */
    blockerListeners: HashBlockerListener[];
    /** Number of popstate events to ignore */
    ignoringPopstate: number;
    /** Current location */
    currentLocation: HashLocation;
    constructor();
    /** Gets the current location */
    getLocation(): HashLocation;
    /** Convenience getter */
    get location(): HashLocation;
    /** Parse a location. Uri should not include initial "#" */
    private parseLocation;
    private handlePopstate;
    /** Add listener to final changes in location. Returns unsubscribe */
    addLocationListener(listener: HashLocationListener): () => void;
    /** Add listener to block location changes. Returns unsubscribe */
    addBlockerListener(listener: HashBlockerListener): () => void;
    private notifyLocationListeners;
    /** Check if a new location is going to be blocked */
    private checkBlockers;
    /** Push a new location */
    push(location: string): void;
    push(location: {
        pathname: string;
        search?: string;
    }): void;
    /** Replace current location */
    replace(location: string): void;
    replace(location: {
        pathname: string;
        search?: string;
    }): void;
    /** Go back. Calls history.back() */
    back(): void;
}
export interface HashLocation {
    /** Base part of the path. Starts with "/" */
    pathname: string;
    /** query string. Includes ? if present */
    search: string;
    /** Hash part of hash url. Includes "#" if present */
    hash: string;
    /** Complete uri which includes all of the hash, starting with "/" */
    uri: string;
    /** Index of page in stack. Can be used to sense pushes/pops to same location */
    index: number;
}
export declare type HashLocationListener = (location: HashLocation) => void;
/** True if blocked, false to proceed */
export declare type HashBlockerListener = (prevLocation: HashLocation, nextLocation: HashLocation) => Promise<boolean> | boolean;
