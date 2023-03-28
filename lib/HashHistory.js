"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashHistory = void 0;
/** Simple hash-based history that allows blocking transitions within the page
 * asynchronously.
 */
class HashHistory {
    constructor() {
        this.handlePopstate = (ev) => __awaiter(this, void 0, void 0, function* () {
            if (this.ignoringPopstate > 0) {
                this.ignoringPopstate--;
                return;
            }
            // Determine delta
            const delta = ev.state === null ? 1 : ev.state - this.index;
            // Check blockers
            const blocked = yield this.checkBlockers(this.getLocation());
            if (blocked) {
                // Undo
                this.ignoringPopstate++;
                history.go(-delta);
                return;
            }
            // Set index in state
            this.index += delta;
            history.replaceState(this.index, "");
            const location = this.getLocation();
            this.currentLocation = location;
            this.notifyLocationListeners(location);
        });
        this.locationListeners = [];
        this.blockerListeners = [];
        this.ignoringPopstate = 0;
        // Save index of 0 as current state and normalize path
        this.index = 0;
        history.replaceState(0, "", window.location.hash || "#/");
        this.currentLocation = this.getLocation();
        // Listen for popstate
        window.addEventListener("popstate", this.handlePopstate);
    }
    /** Gets the current location */
    getLocation() {
        const uri = (window.location.hash || "#").substr(1);
        return this.parseLocation(uri, this.index);
    }
    /** Convenience getter */
    get location() {
        return this.getLocation();
    }
    /** Parse a location. Uri should not include initial "#" */
    parseLocation(uri, index) {
        const match = uri.match(/^(.*?)(\?.*?)?(#.*)?$/);
        return {
            pathname: match[1] || "/",
            search: match[2] || "",
            hash: match[3] || "",
            uri: uri || "/",
            index
        };
    }
    /** Add listener to final changes in location. Returns unsubscribe */
    addLocationListener(listener) {
        this.locationListeners.push(listener);
        return () => {
            this.locationListeners = this.locationListeners.filter((l) => l != listener);
        };
    }
    /** Add listener to block location changes. Returns unsubscribe */
    addBlockerListener(listener) {
        this.blockerListeners.push(listener);
        return () => {
            this.blockerListeners = this.blockerListeners.filter((l) => l != listener);
        };
    }
    notifyLocationListeners(location) {
        for (const listener of this.locationListeners) {
            listener(location);
        }
    }
    /** Check if a new location is going to be blocked */
    checkBlockers(newLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const listener of this.blockerListeners) {
                if (yield listener(this.currentLocation, newLocation)) {
                    return true;
                }
            }
            return false;
        });
    }
    push(location, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const silent = (_a = options === null || options === void 0 ? void 0 : options.silent) !== null && _a !== void 0 ? _a : false;
            if (typeof location !== "string") {
                if (typeof location.search === "string") {
                    location = location.pathname + (location.search || "");
                }
                else {
                    const searchObj = location.query || {};
                    location = location.pathname + "?" + Object.keys(searchObj).map(key => { var _a; return key + '=' + encodeURIComponent((_a = searchObj[key]) !== null && _a !== void 0 ? _a : ""); }).join('&');
                }
            }
            const newLocation = this.parseLocation(location, this.index + 1);
            if (!silent) {
                if (yield this.checkBlockers(newLocation)) {
                    return;
                }
            }
            this.index += 1;
            history.pushState(this.index, "", "#" + location);
            this.currentLocation = this.getLocation();
            if (!silent) {
                this.notifyLocationListeners(this.getLocation());
            }
        });
    }
    replace(location, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const silent = (_a = options === null || options === void 0 ? void 0 : options.silent) !== null && _a !== void 0 ? _a : false;
            if (typeof location !== "string") {
                if (typeof location.search === "string") {
                    location = location.pathname + (location.search || "");
                }
                else {
                    const searchObj = location.query || {};
                    location = location.pathname + "?" + Object.keys(searchObj).map(key => { var _a; return key + '=' + encodeURIComponent((_a = searchObj[key]) !== null && _a !== void 0 ? _a : ""); }).join('&');
                }
            }
            const newLocation = this.parseLocation(location, this.index + 1);
            if (!silent) {
                if (yield this.checkBlockers(newLocation)) {
                    return;
                }
            }
            history.replaceState(this.index, "", "#" + location);
            this.currentLocation = this.getLocation();
            if (!silent) {
                this.notifyLocationListeners(this.getLocation());
            }
        });
    }
    /** Go back. Calls history.back()
     * @param options.silent: Do not notify listeners or check blockers
    */
    back(options) {
        var _a;
        const silent = (_a = options === null || options === void 0 ? void 0 : options.silent) !== null && _a !== void 0 ? _a : false;
        // If silent, do not notify listeners or check blockers
        if (silent) {
            this.ignoringPopstate++;
        }
        history.back();
    }
}
exports.HashHistory = HashHistory;
