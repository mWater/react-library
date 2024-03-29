/** Simple hash-based history that allows blocking transitions within the page
 * asynchronously.
 */
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
    /** Push a new location
     * @param location.search must start with "?" if non-empty string
     * @param location.query must be object that will be encoded.
     * @param options.silent: Do not notify listeners or check blockers
     */
    push(location: string, options?: {
        silent?: boolean;
    }): void;
    push(location: {
        pathname: string;
        search?: string;
    }, options?: {
        silent?: boolean;
    }): void;
    push(location: {
        pathname: string;
        query?: {
            [key: string]: string | number | boolean | undefined | null;
        };
    }, options?: {
        silent?: boolean;
    }): void;
    /** Replace current location
     * @param options.silent: Do not notify listeners or check blockers
     */
    replace(location: string, options?: {
        silent?: boolean;
    }): void;
    replace(location: {
        pathname: string;
        search?: string;
    }, options?: {
        silent?: boolean;
    }): void;
    replace(location: {
        pathname: string;
        query?: {
            [key: string]: string | number | boolean | undefined | null;
        };
    }, options?: {
        silent?: boolean;
    }): void;
    /** Go back. Calls history.back()
     * @param options.silent: Do not notify listeners or check blockers
    */
    back(options?: {
        silent?: boolean;
    }): void;
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
