import useSWR from "swr";

export function useFetch<Data = any>(url: string){
    const {data, error} = useSWR<Data>(url, async url =>{
        const response = await fetch(url)
        const data = await response.json()

        return data
    })
}