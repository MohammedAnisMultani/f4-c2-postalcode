import axios from "axios";
import { useState } from "react"
import './App.css'
import { getByDisplayValue } from "@testing-library/react";

const Pincodelookup = () => {

 const[pincode, setPincode] = useState('');
 const[error, setError] = useState('');
 const[loader, setloader] = useState(false);
 const[filterResult, setFilterResults] = useState([]);
 const[postalData, setPostalData] = useState();
 const[isDisplay,setIsDisplay] = useState(false)

  const inpChange = (e) => {
    setPincode(e.target.value);
    setError('')
  }
  const handleLookup = () => {

    if(pincode.length != 6){
      setError('Postel code must be of 6 digit')
      return;
    }

    setloader(true);

    axios
    .get(`https://api.postalpincode.in/pincode/${pincode}`)
    .then((response) => {
      setloader(false)
      const data = response.data
      if(data && data[0] && data[0].Status === 'Success'){
       setIsDisplay(true)
        setPostalData(data[0].PostOffice)
        setFilterResults(data[0].PostOffice)
      }
      

    })
    .catch((error)=> {
      setloader(false)
      setError('Not able to fetch data')
    })
    
    
  }

const nxt = () => {
  return{
    display: isDisplay ? "" : "none"
  }
}
const nxt2 = () => {
  return{
    display: isDisplay ? "none" : ""
  }
}

const handleFilter = (e) => {
  const search = e.target.value.toLowerCase()
  const filtered = postalData.filter((data)=>
    data.Name.toLowerCase().includes(search)
  )
  setFilterResults(filtered);
}

  return(
 
    <div className="phase1">
    <h2 className="inpHead" style={nxt2()}>Enter Pincode</h2>
    <input type="text" value={pincode} placeholder="Pincode" onChange={inpChange} style={nxt2()} className="input"/>
    <button onClick={handleLookup} style={nxt2()} className="inpBtn">Lookup</button>
    
    {error && <div className="error">{error}</div>}
    {loader && <div className="loader">Loading...!</div>}
    
    <h3 className="pincodeNo" style={nxt()}>Pincode: {pincode}</h3>
    <p className="pincodeNo" style={nxt()}><b>Message: </b>Number of pincode(s) found:</p>
    <input type="text" placeholder="Filter" onChange={handleFilter} className="filterSearch" style={nxt()}/>

    <ul className="container" style={nxt()}>
      {filterResult.map((data,index) => {
        return( <li key={index} className="box">
          <p>Post office name: {data.Name}</p>
          <p>Pincode: {data.Pincode}</p>
          <p>District: {data.District}</p>
          <p>State: {data.State}</p>
        </li>)
       
      })}
    </ul>
  </div>
  )

}

export default Pincodelookup