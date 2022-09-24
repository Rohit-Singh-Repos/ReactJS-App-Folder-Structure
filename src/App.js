import { useState, useEffect } from "react"
import axios from "axios"
import { config } from "./config/config"

const App  = () => {
  const [inputVal, setInputVal] = useState({
    name:"",
    email:""
  })
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getUserData()
  },[])
  console.log("config",config)
  const getUserData = async() => {
    try {
      setLoading(true)
      const getDataFromApi = await axios.get(`${config.dev_BaseUrl}/api/getuserdata`)
      setUserData(getDataFromApi.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputs = (e) => {
    const {name,value} = e.target
    setInputVal({
      ...inputVal,
      [name]:value
    })
  }

  const sendData = async() => {
    try {
      const getDataFromApi = await axios(`${config.dev_BaseUrl}/api/saveuserdata`,{
        method:"post",
        data:{
          name:inputVal.name,
          email:inputVal.email
        }
      })
      getUserData()
    } catch (error) {
      console.log(error)
    }
  }

  if(loading){
    return(
      <div className="container mt-5">
        <h4 className="text-center">Loading ... </h4>
      </div>
    )
  }

  return (
    <div className="container pt-5">
      <h3 className="text-center">Mern Stack Application</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">S.no.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.length !== 0 ? (
            userData.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.username}</td>
                <td>{item.useremail}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-5"><p className="text-center">No Data Found</p></td>
            </tr>
          )}
        </tbody>
      </table>
      <h3 className="text-center mt-5 mb-5">User Data</h3>
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={inputVal.name} onChange={handleInputs} name="name" placeholder="Enter name ..." />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" value={inputVal.email} name="email" onChange={handleInputs} placeholder="Enter email ..." />
        </div>
        </div>
        <button className="btn btn-primary" onClick={sendData}>Submit</button>
    </div>
  );
}

export default App
