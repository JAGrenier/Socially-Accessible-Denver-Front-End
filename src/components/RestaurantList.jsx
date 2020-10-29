import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../Context/RestaurantsContext'

const RestaurantList = (props) => {
    const {restaurants, setRestaurants } = useContext(RestaurantsContext)
    let history = useHistory()
   
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
               
            } catch (err) {}  
        }
        fetchData(); 
    },[])

    const handleDelete = async (event, id) => {
        event.stopPropagation()
        try{
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    };

    const handleUpdate = (event, id) => {
        event.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead> 
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody> 
                    {restaurants && restaurants.map((restaurant) => {
                        return(
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td><button onClick={(event) => handleUpdate(event, restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(event) => handleDelete(event, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>Jenn's Bagels</td>
                        <td>RiNo</td>
                        <td>$$</td>
                        <td>5 stars!</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-warning">Update</button></td>
                    </tr>
                    <tr>
                        <td>AJ's Coffee</td>
                        <td>Capital Hill</td>
                        <td>$</td>
                        <td>2 stars!</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
            
        </div>
    )
}

export default RestaurantList
