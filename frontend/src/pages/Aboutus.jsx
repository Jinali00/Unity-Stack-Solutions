import React from 'react';
import storeImage from '../../public/assets/img1.png'; 
const Aboutus = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">About Us</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <p>
            Welcome to Urban Cart, your one-stop destination for all things trendy and affordable! 
            Established in 2024, we've been on a mission to revolutionize online shopping by 
            offering quality products at prices that won't break the bank.
          </p>
          <p>
            Our team of dedicated professionals scours the globe to bring you the latest in fashion, 
            electronics, home decor, and more. We believe that everyone deserves access to great products, 
            and we're committed to making that a reality.
          </p>
          <h2 className="mt-4">Our Values</h2>
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="text-success mr-2">✓</i> Customer Satisfaction
            </li>
            <li className="mb-2">
              <i className="text-success mr-2">✓</i> Quality Assurance
            </li>
            <li className="mb-2">
              <i className="text-success mr-2">✓</i> Affordable Pricing
            </li>
            <li className="mb-2">
              <i className="text-success mr-2">✓</i> Sustainable Practices
            </li>
          </ul>
          <p>
            Thank you for choosing Urban Cart. We're more than just an e-commerce platform; 
            we're your partner in finding the perfect items to enhance your lifestyle. 
            Happy shopping..!
          </p>
        </div>
        <div className="col-md-6">
          <img src={storeImage} alt="Our Store" className="img-fluid rounded shadow" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;