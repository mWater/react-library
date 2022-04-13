/** Makes a callback into a stable function that does not change
 * between renders but is always up to date.
 * See https://thoughtspile.github.io/2021/04/07/better-usecallback/
 */
export declare function useStableCallback<T extends (...args: any[]) => any>(callback: T): T;
