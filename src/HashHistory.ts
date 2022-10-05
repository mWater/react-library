/** Simple hash-based history that allows blocking transitions within the page
 * asynchronously. */
 export class HashHistory {
  /** Index of current page in stack. Used to determine if push or pop */
  index: number

  /** Listeners for location changes */
  locationListeners: HashLocationListener[]

  /** Listeners for blockers */
  blockerListeners: HashBlockerListener[]

  /** Number of popstate events to ignore */
  ignoringPopstate: number

  /** Current location */
  currentLocation: HashLocation

  constructor() {
    this.locationListeners = []
    this.blockerListeners = []
    this.ignoringPopstate = 0

    // Save index of 0 as current state and normalize path
    this.index = 0
    history.replaceState(0, "", window.location.hash || "#/")

    this.currentLocation = this.getLocation()

    // Listen for popstate
    window.addEventListener("popstate", this.handlePopstate)
  }

  /** Gets the current location */
  getLocation(): HashLocation {
    const uri = (window.location.hash || "#").substr(1)
    return this.parseLocation(uri, this.index)
  }

  /** Convenience getter */
  get location(): HashLocation {
    return this.getLocation()
  }

  /** Parse a location. Uri should not include initial "#" */
  private parseLocation(uri: string, index: number) {
    const match = uri.match(/^(.*?)(\?.*?)?(#.*)?$/)!
    return {
      pathname: match[1] || "/",
      search: match[2] || "",
      hash: match[3] || "",
      uri: uri || "/",
      index
    }
  }

  private handlePopstate = async (ev: PopStateEvent) => {
    if (this.ignoringPopstate > 0) {
      this.ignoringPopstate--
      return
    }

    // Determine delta
    const delta = ev.state == null ? 1 : ev.state - this.index

    // Check blockers
    const blocked = await this.checkBlockers(this.getLocation())
    if (blocked) {
      // Undo
      this.ignoringPopstate++
      history.go(-delta)
      return
    }

    // Set index in state
    this.index += delta
    history.replaceState(this.index, "")

    const location = this.getLocation()
    this.currentLocation = location
    this.notifyLocationListeners(location)
  }

  /** Add listener to final changes in location. Returns unsubscribe */
  addLocationListener(listener: HashLocationListener): () => void {
    this.locationListeners.push(listener)
    return () => {
      this.locationListeners = this.locationListeners.filter((l) => l != listener)
    }
  }

  /** Add listener to block location changes. Returns unsubscribe */
  addBlockerListener(listener: HashBlockerListener): () => void {
    this.blockerListeners.push(listener)
    return () => {
      this.blockerListeners = this.blockerListeners.filter((l) => l != listener)
    }
  }

  private notifyLocationListeners(location: HashLocation) {
    for (const listener of this.locationListeners) {
      listener(location)
    }
  }

  /** Check if a new location is going to be blocked */
  private async checkBlockers(newLocation: HashLocation): Promise<boolean> {
    for (const listener of this.blockerListeners) {
      if (await listener(this.currentLocation, newLocation)) {
        return true
      }
    }
    return false
  }

  /** Push a new location
   * @param location.search must start with "?" if non-empty string
   * @param location.query must be object that will be encoded.
   */
  push(location: string): void
  push(location: { pathname: string, search?: string }): void
  push(location: { pathname: string, query?: { [key: string]: string | number | boolean | undefined | null } }): void
  async push(location: string | { pathname: string, search?: string } & { pathname: string, query?: { [key: string]: string | number | boolean | undefined | null } }) {
    if (typeof location !== "string") {
      if (typeof location.search === "string") {
        location = location.pathname + (location.search || "")
      }
      else {
        const searchObj = location.query || {}
        location = location.pathname + "?" + Object.keys(searchObj).map(key => key + '=' + encodeURIComponent(searchObj[key] ?? "")).join('&')
      }
    }

    const newLocation = this.parseLocation(location, this.index + 1)
    if (await this.checkBlockers(newLocation)) {
      return
    }

    this.index += 1
    history.pushState(this.index, "", "#" + location)

    this.currentLocation = this.getLocation()
    this.notifyLocationListeners(this.getLocation())
  }

  /** Replace current location */
  replace(location: string): void
  replace(location: { pathname: string, search?: string }): void
  replace(location: { pathname: string, query?: { [key: string]: string | number | boolean | undefined | null } }): void
  async replace(location: string | { pathname: string, search?: string } & { pathname: string, query?: { [key: string]: string | number | boolean | undefined | null } }) {
    if (typeof location !== "string") {
      if (typeof location.search === "string") {
        location = location.pathname + (location.search || "")
      }
      else {
        const searchObj = location.query || {}
        location = location.pathname + "?" + Object.keys(searchObj).map(key => key + '=' + encodeURIComponent(searchObj[key] ?? "")).join('&')
      }
    }

    const newLocation = this.parseLocation(location, this.index + 1)
    if (await this.checkBlockers(newLocation)) {
      return
    }

    history.replaceState(this.index, "", "#" + location)
    this.currentLocation = this.getLocation()
    this.notifyLocationListeners(this.getLocation())
  }

  /** Go back. Calls history.back() */
  back() {
    history.back()
  }
}

export interface HashLocation {
  /** Base part of the path. Starts with "/" */
  pathname: string

  /** query string. Includes ? if present */
  search: string

  /** Hash part of hash url. Includes "#" if present */
  hash: string

  /** Complete uri which includes all of the hash, starting with "/" */
  uri: string

  /** Index of page in stack. Can be used to sense pushes/pops to same location */
  index: number
}

export type HashLocationListener = (location: HashLocation) => void

/** True if blocked, false to proceed */
export type HashBlockerListener = (prevLocation: HashLocation, nextLocation: HashLocation) => Promise<boolean> | boolean
