import { useEffect, useState, type ChangeEvent, type Dispatch, type FC, type SetStateAction } from 'react'
import { instance } from '../Hooks'

interface SelectType {
    extraClass?: string,
    URL?: string,
    customList?: any[],
    setValue: Dispatch<SetStateAction<string | number>>,
    value: string | number,
    setLoading?:Dispatch<SetStateAction<boolean>>
}

const Select: FC<SelectType> = ({ extraClass, URL, customList, setValue, value, setLoading }) => {
    const [list, setList] = useState(URL ? [] : customList)

    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        if(setLoading) setLoading(true)
        setValue(e.target.value == "all" ? "" : e.target.value);
    }

    useEffect(() => {
        if (URL) instance().get(URL).then(res => setList(res.data))
    }, [])

    return (
        <select value={value} onChange={handleSelectChange} className={`${extraClass} w-75 rounded-2xl bg-transparent border px-4 py-3.5 text-sm text-white/90 placeholder:text-white/35 outline-none`}>
            <option value="all">All</option>
            {list?.map((item: { id: string | number, name: string }) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
    )
}

export default Select