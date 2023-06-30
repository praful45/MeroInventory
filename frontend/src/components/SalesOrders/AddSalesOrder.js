import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const [ selectedProduct, setSelectedProduct] = useState("");
  const [OrderProducts, setOrderProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [OrderCategories, setOrderCategories ]  = useState([]);
  const [OrderCustomers, setOrderCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [OrderQuantity, setOrderQuantity] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  const [OrderDeliverydate, setOrderDeliverydate]=useState("")
  const [selectedStatus, setSelectedStatus] = useState("");
  const [OrderStatus, setOrderStatus ]  = useState([]);

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  function handleChange(event) {
    const value = event.target.value;

    // Update the state of the `categories` variable.
    this.setState({
      categories: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Vallidate the input fields

    if (selectedProduct === "") {
      alert("Please enter a product.");
      return;
    }

    // if (OrderAvailability === "") {
    //   alert("Show Availability.");
    //   return;
    // }

    if (selectedCategory === "") {
      alert("Please select a category.");
      return;
    }

    if (selectedCustomer === "") {
      alert("Please select a customer.");
      return;
    }

    if (OrderQuantity === "") {
      alert("Please enter a product quantity.");
      return;
    }

    if (OrderDate === "") {
        alert("Please show date.");
        return;
      }

      if (selectedStatus === "") {
        alert("Please select a status.");
        return;
      }
    // Make a request to the backend API to create the new product.
    const formData = new FormData();
    formData.append("Productname", selectedProduct);
    formData.append("Customer", selectedCustomer);
    formData.append("categoryName", selectedCategory);
    // formData.append("Availability", OrderAvailability);
    formData.append("quantity", OrderQuantity);
    formData.append("date", OrderDate);
    formData.apppend("deliverydate",OrderDeliverydate);
    formData.apppend("status",selectedStatus);
     axios
      .post("http://localhost:5000/api/create-order", formData)
            .then((order) => {
       // Redirect the user back to the inventory page.
       navigate("/order"); 
           });
  };

  useEffect(() => {
    // Get the list of categories from the backend API.
      const fetchData = async () => {
        try {
          // Get the list of categories from the backend API.
          const categoriesResponse = await axios.get("http://localhost:5000/api/getallcategories");
          setOrderCategories(categoriesResponse.data);
    
          // Get other data using additional API requests
          const ProductsResponse = await axios.get("http://localhost:5000/api/getallcategories");
          setOrderProducts(ProductsResponse.data);

          const CustomersResponse = await axios.get("http://localhost:5000/api/getallcategories");
          setOrderCustomers(CustomersResponse.data);

          const StatusResponse = await axios.get("http://localhost:5000/api/getallcategories");
          setOrderStatus(StatusResponse.data);
          // ... Add more API requests as needed
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
  }, []);

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Sales</h2>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" }}>
          Add Order
        </div>
        
        <div className="w-90 p-3">
          <label htmlFor="Productname" className="form-label">
            <b>Product</b>
          </label>
          <select value={selectedProduct} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {OrderProducts.map((product) => (
              <option key={product._id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="w-90 p-3">
          <label htmlFor="Productname" className="form-label">
            <b>Product</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div> */}
        
        <div className="w-90 p-3">
          <label htmlFor="categoryname" className="form-label">
            <b>Categories</b>
          </label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {OrderCategories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-90 p-3">
          <label htmlFor="quantity" className="form-label">
            <b>Quantity</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter quantity"
            value={OrderQuantity}
            onChange={(e) => setOrderQuantity(e.target.value)}
          />
        </div>

        {/* <div className="w-90 p-3">
          <label htmlFor="Availability" className="form-label">
            <b>Availability</b>
          </label>
          <input
            type="string"
            className="form-control"
            // placeholder="Enter quantity"
            value={OrderAvailability}
            onChange={(e) => setOrderAvailability(e.target.value)}
          />
        </div> */}


        <div className="w-90 p-3">
          <label htmlFor="Customername" className="form-label">
            <b>Cutomer</b>
          </label>
          <select value={selectedCustomer} onChange={handleCustomerChange}>
            <option value="">Select a customer</option>
            {OrderCustomers.map((customer) => (
              <option key={customer._id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-90 p-3">
          <label htmlFor="Date" className="form-label">
            <b>Date</b>
          </label>
          <input
            type="date"
            className="form-control"
            // placeholder="Enter quantity"
            value={OrderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label htmlFor="Date" className="form-label">
            <b>Deliverydate</b>
          </label>
          <input
            type="date"
            className="form-control"
            // placeholder="Enter quantity"
            value={OrderDeliverydate}
            onChange={(e) => setOrderDeliverydate(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label htmlFor="Status" className="form-label">
            <b>Status</b>
          </label>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="">Select a status</option>
            {OrderStatus.map((status) => (
              <option key={status._id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>69
        </div>


        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="submit"></label>
          <div className=" gap-2 d-flex justify-content-md-end text-dark">
            <button
              id="submit"
              name="submit"
              className="btn btn-primary text-dark"
              style={{ background: "#19A7CE" }}
              value="1"
            >
              Add Order
            </button>
            <Link
              to="/product"
              id="cancel"
              name="cancel"
              className="btn btn-default"
              style={{ background: "#19A7CE" }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";



// const AddOrder = () => {
  
//   const [categories,setCategories] = useState([]);

//   const [products,setProducts] = useState([]);

//   const [categoryWithProduct,setCategoryWithProduct] = useState({});

  /**
   * {
   *  mobile:{
   *    products:[
   *      {
   *        name,
   *      }
   *    ]
   *  }
   * }
   */

//   useEffect(()=>{
//     const fetchAllCateories = async ()=>{
//       const categoriesDatas = await axios.get('http://localhost:5000/api/getallcategories')
//       const productDatas = await axios.get("http://localhost:5000/api/getallproducts");
//       setCategories(categoriesDatas.data);
//       setProducts(productDatas.data)
//       console.log(productDatas)
//     }

//     fetchAllCateories()

//   },[])

//   const [productName,setProductName] = useState('');

//   const [quantity,setQuantity] = useState(0);

//   return <div>
//     <select>
//       {
//         categories.map(category=><option key={category._id}>{category.name}</option>)
//       }

      

//     </select>
//   </div>
// };

// export default AddOrder;








