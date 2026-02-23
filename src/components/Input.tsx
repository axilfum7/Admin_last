import type { ChangeEvent, ChangeEventHandler, FC } from "react"

interface InputType{
    type:"email" | "password" | "text",
    placeholder:string,
    extraClass?:string,
    name:string,
    onChange?:ChangeEventHandler<HTMLInputElement>
}
const Input:FC<InputType> = ({type, placeholder, extraClass, name, onChange}) => {
  return (
 <input onChange={onChange} name={name} type={type} placeholder={placeholder} className={`px-4 py-3 rounded-xl bg-[#1e293b] text-white border border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition duration-300 ${extraClass}`}/>
  )
}

export default Input