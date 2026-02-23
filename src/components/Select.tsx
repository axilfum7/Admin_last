import { useEffect, useState, type ChangeEvent, type Dispatch, type FC, type SetStateAction } from 'react'
import { instance } from '../Hooks'

interface SelectType{
    extraClass?:string,
    URL?:string,
    customList?:any[],
    setValue:Dispatch<SetStateAction<string | number>>,
    value: string | number
}

const Select:FC<SelectType>= ({extraClass, URL, customList, setValue, value}) => {
    const [list, setlist] = useState(URL ?[] : customList)

    function handleSelectChange(e:ChangeEvent<HTMLSelectElement>){
        setValue(e.target.value);

    }

    useEffect(() => {
  if(URL) instance().get(URL).then(res => setlist(res.data)) 
},[])
    return(
        <select value={value} onChange={handleSelectChange} className={`${extraClass} w-75 rounded-2xl bg-transparent border px-4 py-3.5 text-sm text-white/90 placeholder:text-white/35 outline-none`}>
    <option value="all">All</option>
    {list?.map((item:{id:string | number, name: string}) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
    )
}

export default Select