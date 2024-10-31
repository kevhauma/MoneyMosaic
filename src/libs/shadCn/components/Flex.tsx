import { PropsWithChildren } from "react"

type Props =  PropsWithChildren &
{vertical?: boolean, className?:string}

export const Flex = ({children, vertical, className}: Props) => {
return <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} ${className}`}>{children}</div>
}