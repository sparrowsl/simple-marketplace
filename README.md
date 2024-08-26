# Christex Foundation Bounty - Simple Marketplace

This is a solution to the [Simple Marketplace bounty on Christex Foundation](https://earn.christex.foundation/fndn/Develop-a-simple-Marketplace-047b98dd32e64bd69cfce1100f0e929e).

## Overview

Develop a basic platform where users can list items for sale and others can purchase them. This platform should include essential eCommerce features to facilitate product listing, browsing, and mock purchasing.

### The challenge

**features**:

- **Product Listing:** Users can add products with a title, description, price, and image.
- **Product Browsing:** View all listed products on a main page.
- **Product Details:** Click on a product to see more details.
- **Basic Rating System:** Users can give a thumbs up or thumbs down to a product.
- **Mock Payment Screen:** A simulated checkout process (no real payments).

### Links

- Solution URL: [Solution URL here](https://github.com/sparrowsl/simple-marketplace)
- Live Site URL: [Live site URL here](https://fem-ecom-product.netlify.app/)

### Built with

- Semantic HTML5 markup
- [Sveltekit](https://kit.svelte.dev) - JS framework
- [Tailwindcss](https://tailwindcss.com) - CSS framework

## Run project locally

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/sparrowsl/simple-marketplace.git

cd simple-marketplace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and copy the default contents of the `.env.example` in it:

> Adjust the values according to your preference.

### 4. Setup database tables

```bash
npm run setup
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to see the project in action.
