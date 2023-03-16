import React, { userState, useEffect, useContext, useState } from 'react'
import './grid.css'
import axios from '../../Axios'
import AuthContext from '../../context/ContextAuth'


export default function Grid() {
    const [gridData, setGridData] = useState([])
    const { user, authToken,postCountFind } = useContext(AuthContext)

    const getGridData = () => {
        axios.get(`api/usergrid/${user.user_id}/`, { headers: { 'Authorization': `Bearer ${authToken.access}` } }).then((response) => {
            setGridData(response.data)
        })
    }


    postCountFind(gridData.length)


    useEffect(() => {
        getGridData()
    }, [])

    return (
        <div>
            <div className="wrapper">
                {
                    gridData.map((obj) => (
                        <img className='img-grid' src={obj.image_url} alt="" />
                    ))
                }
            </div>
        </div>
    )
}
