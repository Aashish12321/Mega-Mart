# MegaMart Ecommerce

MegaMart is a fully-featured Multi-Vendor E-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS for styling. 
It offers a seamless shopping experience with integrated Stripe payment processing.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Cloud Storage](#cloud-storage)
- [State Management](#state-management)
- [Payment Integration](#payment-integration)

## Features

- **User Authentication**: Secure login and registration with JWT authentication.
- **Product Management**: Browse, search, and filter products.
- **Shopping Cart**: Add, update, or remove items from the cart.
- **Favourite**: Add or remove items from the Favourite or wishlist.
- **Order Management**: Place and view orders and can track their status.
- **Stripe Payment Integration**: Secure online payment processing.
- **Admin Dashboard**: Add, update and manage products, orders, and users.
- **Responsive Design**: Optimized for all devices using Tailwind CSS.

## Tech Stack

- **Frontend**: React, Context API, React-Redux, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Gateway**: Stripe
- **Cloud Storage**: Cloudinary  

## Usage
- **Browse Products**: Navigate through the product catalog. Use the search bar to find specific items and filter options to narrow down your choices.
- **Manage Cart**: Add products to your shopping cart, adjust quantities, or remove items as needed. The cart icon will show the number of items currently in your cart.
- **Favourite**: Save your favorite products to revisit them later.
- **Checkout**: Proceed to checkout to review your order, enter shipping details, and provide payment information. The checkout process is handled securely via Stripe.
- **Order History**: After placing an order, you can view your order history in the user profile section. Track your orders and view their status.

## Cloud Storage
Cloudinary is used for managing product and user images:

- **Image Uploads**: Product images and users review images are uploaded to Cloudinary and accessed via Cloudinary URLs.

## State Management
This project uses both Context API and React-Redux for managing application state:

- **Context API**: Used for managing states like the shopping cart, favourite products, and user preferences. It provides a way to share state across the entire application without passing props down manually.
- **React-Redux**: Used for managing global states such as user authentication. Redux helps in maintaining a predictable state container and enables easy state management across different components.

## Payment Integration
Stripe is integrated as the payment gateway to handle transactions:

- **Stripe Configuration**: The backend server is set up to interact with Stripe's API for processing payments. For this we must include the Stripe secret key in our .env file in backend and Stripe Public key in .env in frontend.
- **Checkout Process**: During checkout, Stripe handles the payment processing. Users are directed to the checkout where customers can find secure Stripe interface to enter their payment details.
- **Testing Payments**: We use Stripe's test card details to simulate transactions. We can use card number 4242 4242 4242 4242 with any future expiration date and a random 3 digit CVC code.