import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const CheckOut = () => {
    const service = useLoaderData();
    const {title, price, _id, img} = service;
    const {user} = useContext(AuthContext);

    const handelBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const date = form.date.value;
        const Price = form.price.value;

        const order = {
            customerName : name,
            email,
            img,
            date,
            service_id : _id,
            service_title : title,
            price: Price

        }
        console.log(order);

        fetch('http://localhost:5000/bookings', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(order),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId)
            {
                alert("Your Service Booked Successfully");
            }
        })


    }
    return (
        <div>
            <h2>book services: <span className="text-2xl font-bold"  >{title}</span></h2>
            
            <form onSubmit={handelBookService} className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" name="name" defaultValue={user?.displayName} className="input input-bordered"  />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" placeholder="Date" name="date" className="input input-bordered"  />
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" name="email" defaultValue={user?.email} className="input input-bordered"  />
          
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">price</span>
          </label>
          <input type="text" placeholder="Price" name="price" defaultValue={ '$' +  price} className="input input-bordered"  />
          
        </div>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">Order Confirm</button>
        </div>
      </form>

            </div>
    );
};

export default CheckOut;