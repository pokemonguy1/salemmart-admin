import React, { useState } from 'react';
import axios from 'axios';
import { height } from '@mui/system';

function ProductInfoForm() {
    const [products, setProducts] = useState([]);

    const addProduct = () => {
        setProducts([...products, {
            id: products.length + 1,
            image: "",
            inner_image: []
        }]);
    };

    const handleImageChange = (index, value) => {
        const updatedProducts = [...products];
        updatedProducts[index].image = value;
        setProducts(updatedProducts);
    };

    const addInnerImage = (productIndex) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image.push({
            id: updatedProducts[productIndex].inner_image.length + 1,
            image: "",
            description: "",
            inner_info: []
        });
        setProducts(updatedProducts);
    };

    const handleInnerImageChange = (productIndex, innerImageIndex, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex][field] = value;
        setProducts(updatedProducts);
    };

    const addPhone = (productIndex, innerImageIndex) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex].inner_info.push({
            id: updatedProducts[productIndex].inner_image[innerImageIndex].inner_info.length + 1,
            text: "",
            phone_inner: []
        });
        setProducts(updatedProducts);
    };

    const handlePhoneChange = (productIndex, innerImageIndex, inner_infoIndex, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex][field] = value;
        setProducts(updatedProducts);
    };


    const addInnerInfo = (productIndex, innerImageIndex, inner_infoIndex) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex].phone_inner.push({
            id: updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex].phone_inner.length + 1,
            phone_type: "",
            country_price: []
        });
        setProducts(updatedProducts);
    };

    const handlePhoneValueChange = (productIndex, innerImageIndex, inner_infoIndex, index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex].phone_inner[index][field] = value;
        setProducts(updatedProducts);
    };

    const addCountryPriceInfo = (productIndex, innerImageIndex, inner_infoIndex, index) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex].phone_inner[index].country_price.push({
            id: updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex].phone_inner[index].country_price.length + 1,
            desc: ""
        });
        setProducts(updatedProducts);
    };

    const handleCountryPriceChange = (productIndex, innerImageIndex, inner_infoIndex, index, country_priceindex, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].inner_image[innerImageIndex].inner_info[inner_infoIndex].phone_inner[index].country_price[country_priceindex][field] = value;
        setProducts(updatedProducts);
    };

    const formatDataToSend = () => {
        const formattedData = products.map((product) => ({
            id: product.id,
            image: product.image,
            inner_image: product.inner_image.map((innerImage) => ({
                id: innerImage.id,
                images: innerImage.image,
                description: innerImage.description,
                inner_info: innerImage.inner_info.map((info) => ({
                    id: info.id,
                    text: info.text,
                    phone_inner: info.phone_inner.map((phone_inner) => ({
                        id: phone_inner.id,
                        phone_type: phone_inner.phone_type,
                        country_price: phone_inner.country_price.map((country_price) => ({
                            id: country_price.id,
                            price: country_price.desc
                        }))
                    }))
                }))
            }))
        }));
        console.log(formattedData)
        axios.post('http://103.35.189.138:3005/api/services/createProduct', formattedData)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ height: "50px" }}></div>
            <h1 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: "1.5rem", padding: "10px" }}>Create Product here</h1>
            <button style={{ marginBottom: "10px", fontSize: "0.8rem", padding: "5px 10px" }} onClick={addProduct}>Add Product</button>
            {products.map((product, productIndex) => (
                <div key={product.id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginBottom: "10px" }}>
                    <input type="text" placeholder="Enter Image URL" value={product.image} onChange={(e) => handleImageChange(productIndex, e.target.value)} style={{ padding: "5px" }} />
                    <button style={{ marginBottom: "5px", fontSize: "0.8rem", padding: "5px 10px" }} onClick={() => addInnerImage(productIndex)}>Add Inner Image</button>
                    {product.inner_image.map((innerImage, innerImageIndex) => (
                        <div key={innerImage.id} style={{ border: "1px solid #eee", borderRadius: "5px", padding: "5px", marginBottom: "5px" }}>
                            <input type="text" placeholder="Enter Inner Image URL" value={innerImage.image} onChange={(e) => handleInnerImageChange(productIndex, innerImageIndex, 'image', e.target.value)} style={{ padding: "5px" }} />
                            <input type="text" placeholder="Enter Inner Image Description" value={innerImage.description} onChange={(e) => handleInnerImageChange(productIndex, innerImageIndex, 'description', e.target.value)} style={{ padding: "5px" }} />
                            <button style={{ marginBottom: "5px", fontSize: "0.8rem", padding: "5px 10px" }} onClick={() => addPhone(productIndex, innerImageIndex)}>Add Phone</button>
                            {innerImage.inner_info.map((inner_info, inner_infoIndex) => (
                                <div key={inner_info.id} style={{ border: "1px solid #f0f0f0", borderRadius: "5px", padding: "5px", marginBottom: "5px" }}>
                                    <input type="text" placeholder="Enter Text" value={inner_info.text} onChange={(e) => handlePhoneChange(productIndex, innerImageIndex, inner_infoIndex, 'text', e.target.value)} style={{ padding: "5px" }} />
                                    <button style={{ marginBottom: "5px", fontSize: "0.8rem", padding: "5px 10px" }} onClick={() => addInnerInfo(productIndex, innerImageIndex, inner_infoIndex)}>Add Inner Info</button>
                                    {inner_info.phone_inner.map((phone_inner, index) => (
                                        <div key={phone_inner.id} style={{ border: "1px solid #f9f9f9", borderRadius: "5px", padding: "5px", marginBottom: "5px" }}>
                                            <input type="text" placeholder="Enter Phone Type" value={phone_inner.phone_type} onChange={(e) => handlePhoneValueChange(productIndex, innerImageIndex, inner_infoIndex, index, 'phone_type', e.target.value)} style={{ padding: "5px" }} />
                                            <button style={{ marginBottom: "5px", fontSize: "0.8rem", padding: "5px 10px" }} onClick={() => addCountryPriceInfo(productIndex, innerImageIndex, inner_infoIndex, index)}>Add country_price Info</button>
                                            {phone_inner.country_price.map((country_price, country_priceindex) => (
                                                <div key={country_price.id} style={{ border: "1px solid #fafafa", borderRadius: "5px", padding: "5px", marginBottom: "5px" }}>
                                                    <input type="text" placeholder="Enter Country and price" value={country_price.desc} onChange={(e) => handleCountryPriceChange(productIndex, innerImageIndex, inner_infoIndex, index, country_priceindex, 'desc', e.target.value)} style={{ padding: " 5px" }} />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={formatDataToSend} style={{ padding: " 8px 16 px" }}>Send Data to Backend</button>
        </div>
    );
}

export default ProductInfoForm;