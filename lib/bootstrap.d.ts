import * as React from 'react';
import { ReactNode, Children } from "react";

declare class TextInput extends React.Component<{
  value: string | null
  onChange?: (value: string | null) => void
  placeholder?: string
  size?: "sm" | "lg"
  emptyNull?: boolean
  style?: object
}> {}

declare class NumberInput extends React.Component<{
  decimal: boolean,
  value?: number | null
  onChange?: (value: number | null) => void
  style?: object
  size?: "sm" | "lg"
  onTab?: () => void
  onEnter?: () => void
  /** Force an exact number of decimal places, rounding value as necessary */
  decimalPlaces?: number
  placeholder?: string  
}> {}

declare class Select<T> extends React.Component<{
  value: T | null,
  onChange?: (value: T | null) => void,
  options: Array<{ value: T | null, label: string }>,
  /** "lg" or "sm" */
  size?: string
  nullLabel?: string
  style?: object
  inline?: boolean
}> {}

declare class Checkbox extends React.Component<{
  value: boolean
  onChange?: (value: boolean) => void
  inline?: boolean
}> {}

declare class Radio extends React.Component<{
  /** Value to display */
  value: any     

  /** Value that radio button represents. If equal to value, button is checked */
  radioValue: any  
  
  /** Called with radio value */
  onChange: (value: any) => void
  
  /** Makes horizontal */
  inline: boolean
}> {}


declare class Toggle<T> extends React.Component<{
  value: T | null
  onChange?: (value: T | null) => void,
  options: Array<{ value: T | null, label: ReactNode }>,
  /** "xs" or "sm" */
  size?: string
  allowReset?: boolean
}> {}