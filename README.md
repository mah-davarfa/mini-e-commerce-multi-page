Mini E-Commerce React Application

A multi-page React app built with React Router, Context API, and custom hooks.
Features include user authentication, protected checkout, cart merging, product search, dark/light theme, and persistent state via localStorage.

Features
## Multi-Page Navigation (React Router)
Home page

Category pages

Product details (dynamic route: /products/:id)

Login

Cart

Checkout (Protected Route)

NotFound (404 page)

## Authentication + Protected Routes

Login system using username & password stored in localStorage

Redirect back to Checkout after login

ProtectedRoute blocks unauthorized access

## Full Cart System

Guest cart stored in localStorage

User carts stored per user

Cart merging when user logs in

Add, edit quantity, and remove items

Dynamic cart item count in Navbar

Cart state preserved across refresh
## Intelligent Product Search

Search bar powered by sanitizeBasic()

Removes unsafe characters to prevent XSS

Uses useSearchParams / navigate to update URL

Handles empty queries

Fetches products from FakeStore API
## Dark / Light Theme (UI Switch)

Theme toggle in Navbar

Global CSS variables (--bg, --panel, etc.)

Uses <html data-theme="light|dark">

Fully persistent with useLocalStorage
## Custom Hook: useLocalStorage

Syncs state to localStorage

Used for theme, cart, auth, users, and user carts

Prevents data loss on refresh
## Clean, Accessible UI

Responsive layout using CSS Grid & Flexbox

Reusable card styles

Elevation effects & subtle animations

Mobile-first design
## Tech Stack

React 19

React Router DOM 7

Context API

Custom Hooks

JavaScript (ES Modules)

CSS Variables for Theming

FakeStore API for product data
## Project Structure
src/
│
├── api/
│   └── ProductsApi.js        # fetch helpers
│
├── components/
│   ├── NavBar.jsx
│   |__ Footer.jsx

│__util/
   |__ ProtectedRoute.jsx
│
├── context/
│   └── AppContext.jsx        # global state (auth, cart, theme)
│
├── hooks/
│   └── useLocalStorage.js
│
├── pages/
│   ├── ShowCase.jsx          # homepage
│   ├── Products.jsx
│   ├── Product.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── CheckOut.jsx
│   └── NotFound.jsx
│
├── utils/
│   └── sanitize.js           # search sanitization
│
├── App.jsx
├── App.css
└── main.jsx

## Getting Started
1. Install dependencies
npm install

2. Run the development server
npm start

## Cart Logic Explained
Guest Mode

Items stored in cart (array)

Logged-In Mode

Each user has their own cart inside usersCart

Example:

usersCart = {
    userId1: { productId1: {...}, productId2: {...} },
    userId2: { ... }
}

Cart Merging

When a guest logs in:

Guest cart items are added to the user cart

Guest cart is cleared

Everything persists automatically

## Dark / Light Mode

Theme is stored in:

const [theme, setTheme] = useLocalStorage("theme", "dark")


DOM updates:

document.documentElement.setAttribute("data-theme", theme)


CSS swaps variables:

:root[data-theme="light"] { --bg: #fff; ... }
:root[data-theme="dark"]  { --bg: #0f1220; ... }

## API Used

FakeStore API

https://fakestoreapi.com/products
https://fakestoreapi.com/products/:id


Data includes:

id

title

price

category

description

image