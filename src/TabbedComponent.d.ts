import { ReactNode } from "react"
import React from "react"

/** Simple bootstrap tabbed component */
export default class TabbedComponent extends React.Component<{
  /** Array of { id, label, elem, onRemove (optional) } */
  tabs: Array<{ id: string; label: ReactNode; elem: ReactNode; onRemove?: () => void }>

  /** Initially selected id of tab */
  initialTabId?: string

  /** Selected id of tab if controlled component */
  tabId?: string

  /** Set to have a plus to add a tab */
  onAddTab?: () => void

  /** Set to be called back when a tab is clicked (tabId) instead of setting internal state */
  onTabClick?: (tabId: string) => void
}> {}
