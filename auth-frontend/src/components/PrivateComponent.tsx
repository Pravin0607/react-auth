import { PropsWithChildren } from "react"
type PrivateComponentProps = PropsWithChildren<{}>

const PrivateComponent = ({children}:PrivateComponentProps) => {
  return (
    children
  )
}

export default PrivateComponent