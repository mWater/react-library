import { useCallback, useLayoutEffect, useRef } from "react"

/** Makes a callback into a stable function that does not change
 * between renders but is always up to date.
 * See https://thoughtspile.github.io/2021/04/07/better-usecallback/
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const wrappedCallback = function (this: any, ...args: any[]): T {
    return callbackRef.current.apply(this, args)
  }

  return useCallback(wrappedCallback as any, [])
}
