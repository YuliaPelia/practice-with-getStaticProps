import { useEffect, useState } from "react"
import useSWR from "swr"

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales)
    
    // const [isLoading, setLoading] = useState(false)

    const { data, error } = useSWR('https://course-next-d8ca6-default-rtdb.europe-west1.firebasedatabase.app/sales.json', (url) => fetch(url).then(res => res.json()))

    useEffect(() => {
        if (data) {
            const transformedSales = []
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            console.log(transformedSales);
            setSales(transformedSales)
        }
    }, [data])


    // useEffect(() => {
    //     setLoading(true)
    //     fetch("https://course-next-d8ca6-default-rtdb.europe-west1.firebasedatabase.app/sales.json")
    //         .then(response => response.json())
    //         .then(data => {
    //             const transformedSales = []
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             console.log(data);
    //             setSales(transformedSales)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })

    // }, [])

    if (error) {
        return <p>No sales found.</p>
    }

    if (!data && !sales) {
        return <p>Loading...</p>
    }



    return (
        <>
            <h1>Last Sales</h1>
            <ul>
                {sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
            </ul>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch(
        "https://course-next-d8ca6-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    )
    const data = await res.json();

    const transformedSales = []
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }
    return {
        props: {
            sales: transformedSales
        }
    }

}

export default LastSalesPage