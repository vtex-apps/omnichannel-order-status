declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const Input: ComponentType<InputProps>

  interface InputProps {
    [key: string]: any
  }

  export const DatePicker: ComponentType<any>
  export const Spinner: ComponentType<any>
  export const Alert: ComponentType<any>
  export const Button: ComponentType<any>
  export const Table: ComponentType<any>
  export const EXPERIMENTAL_Table: ComponentType<any>
  export const Link: ComponentType<any>
  export const ArrowDown: ComponentType<any>
  export const ArrowUp: ComponentType<any>
}

declare module '@vtex/styleguide/lib/*' {
  const Component: ComponentType<any>
  export default Component
}