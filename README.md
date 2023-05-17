## NextJS Ecommerce Website

Next.js is a framework for building web applications.

With Next.js, you can build user interfaces using React components. Then, Next.js provides additional structure, features, and optimizations for your application.

Under the hood, Next.js also abstracts and automatically configures tooling for you, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time setting up tooling.

Next.js can help you build interactive, dynamic, and fast web applications.

## Main Features

Some of the main Next.js features include:

| Feature       | Description                                                                                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Routing       | A file-system based router built on top of Server Components that supports layouts, nested routing, loading states, error handling, and more.                                                    |
| Rendering     | Client-side and Server-side Rendering with Client and Server Components. Further optimized with Static and Dynamic Rendering on the server with Next.js. Streaming on Edge and Node.js runtimes. |
| Data Fetching | Simplified data fetching with async/await support in React Components and the fetch()s API that aligns with React and the Web Platform.                                                          |
| Styling       | Support for your preferred styling methods, including CSS Modules, Tailwind CSS, and CSS-in-JS.                                                                                                  |
| Optimizations | Image, Fonts, and Script Optimizations to improve your application's Core Web Vitals and User Experience.                                                                                        |
| Typescript    | Improved support for TypeScript, with better type checking and more efficient compilation, as well as custom TypeScript Plugin and type checker.                                                 |
| API Reference | Updates to the API design throughout Next.js. Please refer to the API Reference Section for new APIs.                                                                                            |

## What all we learned

- NextJS basics like setting up project, navigating between pages and data fetching.
- NextJS advanced topics like dynamic routing , image optimization , API calls , Fetching data from API.

## Run Locally

Install and Run

```
$ npm install
$ npm run dev
```

    - Install all the dependencies from package.json

## About the project

1. Introduction to NextJS
2. Install tools
3. Create Next App
4. Create Website Layout

   1. create layout component
   2. add header
   3. add breadcrumb
   4. add sidebar
   5. add banner

5. List Products
   1. fetch data from api
   2. add images
   3. render products
6. Create Product Details
   1. create product page
   2. show images
   3. show product info
   4. show add to cart action
   5. add styles
7. Handle Add To Cart
   1. define react context
   2. define cart items state
   3. create addd to cart action
   4. add reducer
   5. create store provider
   6. handle add to cart button
8. Create Cart Page
   1. create cart.js
   2. use context to get cart items
   3. list items in cart items
   4. redirect to cart screen after add to cart
9. Update Quantity In The Cart
   1. add select box for quantity
   2. handle select box change
10. Save Cart Items
    1. install js-cookie package
    2. save and retreive cart items in cookies
11. Create Checkout Page
    1. create a checkout form
    2. checkoutHandle for chekout button
12. Create Login Form
    1. install react hook form
    2. create input boxes
    3. add login button
13. Display Thankyou message after successful checkout

```

Project is yet to be improved more, more feature will be added afterwards.

```
