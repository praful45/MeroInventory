const Product = require('../models/Product');
const Category = require('../models/Category');

const emailTemplate = async (savedOrder, customer) => {
  const orderCategories = savedOrder.categories;

  let emailContent = `
    <html>
      <head>
        <style>
          h1 {
            color: #333;
          }
          h2 {
            color: #777;
          }
          h3 {
            color: #555;
          }
          ul {
            list-style-type: none;
            padding-left: 0;
          }
          li {
            margin-bottom: 5px;
          }
          p {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>New Order Placed</h1>
        <h2>Order Details:</h2>
  `;

  let currentCategory = null;

  for (const categoryData of orderCategories) {
    const categoryObj = await Category.findById(categoryData.category);
    const categoryName = categoryObj.name;
    const products = categoryData.products;

    if (currentCategory !== categoryName) {
      emailContent += `<h3>${categoryName}</h3>`;
      currentCategory = categoryName;
    }

    emailContent += '<ul>';

    for (const productData of products) {
      const productObj = await Product.findById(productData.product);
      const productName = productObj.name;
      const quantity = productData.quantity;

      emailContent += `<li>Product: ${productName}, Quantity: ${quantity}</li>`;
    }

    emailContent += '</ul>';
  }

  emailContent += `<br/><h2>Customer Details:</h2>`;
  emailContent += `<p>Customer Name: ${customer.name}</p>`;
  emailContent += `<p>Email: ${customer.email}</p>`;
  emailContent += `<p>Phone: ${customer.phone}</p>`;
  emailContent += `<p>Delivery Date: ${savedOrder.delivery_date}</p>`;
  emailContent += `
      </body>
    </html>
  `;

  return emailContent;
};

module.exports = emailTemplate;
