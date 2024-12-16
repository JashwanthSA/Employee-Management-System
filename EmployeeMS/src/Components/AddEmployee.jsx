import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phoneno: "",
    salary: "",
    address: "",
    date:"",
    image: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('phoneno', employee.phoneno);
    formData.append('salary', employee.salary); 
    formData.append('address', employee.address);
    formData.append('date', employee.date);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);

    axios.post('http://localhost:3000/auth/add_employee', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(JSON.stringify(result.data.Error))
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>{
                const value=e.target.value;
      if (/\S+@\S+\.\S+/.test(value)) {
        console.log("email valid");
        setEmployee({ ...employee, email: value });
      }
                }
                
              }
              required
            />
          </div>
          {/* <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            </div> */}
            <div className="col-12">
  <label for="inputPhone" className="form-label">
    Phone Number
  </label>
  <input
    type="text"
    className="form-control rounded-0"
    id="inputPhone"
    placeholder="Enter Phone Number"
    maxLength="10"
    autoComplete="off"
    onChange={(e) => {
      const value=e.target.value;
      // Validate to ensure only numbers are entered
      // for email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/; or /\S+@\S+\.\S+/
      if (/^\d{0,10}$/.test(value)) {
        setEmployee({ ...employee, phoneno: value });
      }
    }}
    required
  />
</div>
            <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              required
            />
          </div>
          <div className="col-12">
            <label for="inputDate" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputDate"
              placeholder="Date of Joining"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, date: e.target.value })
              }
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12 d-flex justify-content-between mt-3">
            <button type="reset" className="btn btn-danger">
              Reset
            </button>
            <button type="submit" className="btn btn-success">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
