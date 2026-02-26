import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react"

interface InputType{
    type:"email" | "password" | "text",
    placeholder:string,
    extraClass?:string,
    name:string,
    setLoading?:Dispatch<SetStateAction<boolean>>,
    setValue:Dispatch<SetStateAction<string>>,
    value:string
}
const Input:FC<InputType> = ({type, placeholder, extraClass, name, setLoading, setValue, value}) => {
    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
     if(setLoading) setLoading(true)
      if(setValue) setValue(e.target.value)
    }

  return (
 <input value={value} onChange={handleSearch} autoComplete="off" required name={name} type={type} placeholder={placeholder} className={`px-4 py-3 rounded-xl bg-[#1e293b] text-white border border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition duration-300 ${extraClass}`}/>
  )
}

export default Input