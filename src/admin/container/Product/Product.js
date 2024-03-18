import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
function Product(props) {
    return (
        <div>
            <h1>Hello Product</h1>
            <IconButton aria-label="delete" size="large">
                <DeleteIcon />
            </IconButton>
        </div>
    );
}

export default Product