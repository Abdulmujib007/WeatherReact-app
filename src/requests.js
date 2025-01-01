import axios from "axios"
const baseurl =  (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`

export const getAll = async (city) => {
    const response = await axios.get(baseurl(city))
    
    console.log(city,baseurl(city),response.data)
    return response.data
}