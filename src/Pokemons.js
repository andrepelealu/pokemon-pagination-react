import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Pagination from './Pagination'
export default function Pokemons() {
    const [pokeData,setPokeData] = useState([''])
    const [currentUrl,setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [nextUrl, setNextUrl]=useState('')
    const [prevUrl, setPrevUrl]=useState('')
    console.log(pokeData[0])

    useEffect(()=>{
        let cancel

        axios.get(currentUrl,{
            cancelToken: new axios.CancelToken(c=>cancel=c) //membatalkan previus request
        }).then(res=>{
            console.log('data',res.data.results)
            setPokeData(res.data.results.map(p=>(p.name)))
            setNextUrl(res.data.next)
            setPrevUrl(res.data.previous)
        })
        return()=>cancel()
    },[currentUrl])
    function gotoNextPage(){
        setCurrentUrl(nextUrl)
    }
    function gotoPrevPage(){
        setCurrentUrl(prevUrl)
    }
    return (
        <div>
            {pokeData.map(p =>(
                <div key={p}>{p}</div>
            ))}
            <Pagination 
                gotoNextPage={nextUrl ? gotoNextPage : null}
                gotoPrevPage={prevUrl ? gotoPrevPage : null}
            />
        </div>
    )
}
