import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, IconButton, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Background.png'; // Import your background image here

export default function ProductForm() {
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  const productTypes = [
    { value: 'Vegetable', label: 'Vegetable' },
    { value: 'Fruit', label: 'Fruit' },
    { value: 'Food', label: 'Food' },
  ];

  const handleAddProduct = () => {
    // Split input values by comma
    const productNameArray = productName.split(',');
    const priceArray = price.split(',');
    const quantityArray = quantity.split(',');

    // Create an array to store product objects
    const newProducts = [];

    // Check if the lengths of productName, price, and quantity arrays are equal
    if (
      productNameArray.length === priceArray.length &&
      priceArray.length === quantityArray.length
    ) {
      // Iterate over each product entry and create a product object
      for (let i = 0; i < productNameArray.length; i++) {
        // Construct details string using productName, price, and quantity at index i
        const details = `${productNameArray[i].trim()} - ${priceArray[i].trim()}`;

        // Create a new product object
        const newProduct = {
          productType,
          details,
          quantity: quantityArray[i].trim()
        };

        // Add the new product object to the newProducts array
        newProducts.push(newProduct);
      }

      // Set the products state with the newProducts array
      setProducts([...products, ...newProducts]);
      setProductName('');
      setQuantity('');
      setPrice('');
      setProductType('');
    } else {
      alert('Please ensure all fields have the same number of entries separated by commas.');
    }
  };

  const handleDeleteProduct = () => {
    const updatedProducts = [...products];
    updatedProducts.splice(deleteIndex, 1);
    setProducts(updatedProducts);
    setConfirmDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (products.length >= 0) {
      console.log('Submitted Products:', products);
      // Now you can split productName and price from each product's details before storing in the database
      const productsToStore = products.map((product) => ({
        productType: product.productType,
        productName: product.details.split(' - ')[0],
        price: product.details.split(' - ')[1],
        quantity: product.quantity,
      }));
      console.log('Products to store in database:', productsToStore);
      navigate('/');
    } else {
      alert('Please add at least one product');
    }
  };

  const backgroundHeight = 100 + 70 * products.length; // Adjust the height based on the number of products added

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${backgroundHeight}vh`, // Set height dynamically based on product count
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
            <Typography variant="h4" gutterBottom>
              Product Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                select
                label="Select Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {productTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Product Name (comma separated)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="text"
                label="Quantity (comma separated)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="text"
                label="Price (comma separated)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <IconButton aria-label="add" onClick={handleAddProduct}>
                Add Product
                <AddIcon />
              </IconButton>
              {products.map((product, index) => (
                <div key={index}>
                  <Typography variant="h6">Product {index + 1}</Typography>
                  <TextField
                    disabled
                    label="Product Type"
                    value={product.productType}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Product Name"
                    value={product.details.split(' - ')[0]}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Quantity"
                    value={product.quantity}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Price"
                    value={product.details.split(' - ')[1]}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setDeleteIndex(index);
                      setConfirmDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
