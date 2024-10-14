import React, {useState} from "react";


export default function CheckoutPage({ userId }) {
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    })

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setShippingInfo(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Shipping Information:', shippingInfo)
    }

    return(
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {/* Shipping Information Form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={shippingInfo.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Address</label>
                    <input type="text" name="address" value={shippingInfo.address} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">City</label>
                    <input type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Postal Code</label>
                    <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-2" required />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Country</label>
                    <input type="text" name="country" value={shippingInfo.country} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mt-2" required />
                </div>

                {/* Submit Shipping Info*/}
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition">
                    Confirm and Proceed
                </button>
            </form>
        </div>
    )
}