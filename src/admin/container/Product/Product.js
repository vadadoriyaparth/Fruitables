import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { object, string, number } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProducts, EditeProducts, addProducts, getProducts } from '../../../redux/action/product.action';
import { DeleteOutline, Update } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { DELETE_PRODUCT } from '../../../redux/AcationType';
import { getCategories } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subcategory.slice';
import { render } from '@testing-library/react';

function Product() {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const dispatch = useDispatch();
    const product = useSelector(state => state.products);
    console.log(product.products);
    const categories = useSelector(state => state.categories);
    console.log(categories);
    const subcategories = useSelector(state => state.subcategories);

    React.useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
        dispatch(getSubData());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true);
        setUpdate(null);
    };

    const productSchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required(),
        category_id: string().required(),
        subcategory_id: string().required(),
        image:string().required()
    });

    const handleEdit = (data) => {
        setOpen(true);
        formik.setValues(data);
        setUpdate(data._id);
    };

    const handleDelete = (id) => {
        dispatch(DeleteProducts(id));
    };
// const handlefile =()=>{

// }
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            category_id: '',
            subcategory_id: '',
            image: ''
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            console.log(update);
            if (update) {
                dispatch(EditeProducts({...values,_id:update}));
            } else {
                dispatch(addProducts(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur,setFieldValue, values, touched, errors } = formik;

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        formik.setFieldValue('category_id', event.target.value);
        formik.setFieldValue('subcategory_id', '');
    };
    
    const handleFile =(event)=>{
        console.log("dfgh");
        formik.setFieldValue('image',event.currentTarget.files[0]);
        }
    const filteredSubcategories = subcategories.subcategories.filter(subcategory => subcategory.category_id === selectedCategory);

    const columns = [
        {
            field: 'category_id',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => {
                console.log(params);
                const category = categories.categories.find(v => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'image', headerName: 'Image', width: 150 ,
            renderCell:(params)=>{
                console.log(params);
                return(
                    <img 
                    src={params.row.image.url}
                    alt='product'
                    style={{width:'50px',height:'50px',objectFit:'cover'}}
                    />
                )
            }
        },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => handleEdit(params.row)}
                        startIcon={<EditIcon />}
                    />
                    <Button
                        onClick={() => handleDelete(params.row._id)}
                        startIcon={<DeleteOutline />}
                    />
                </>
            ),
        },
    ];

    return (
        <div>
            {product.products.isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Product
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Product</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            id="category-label"
                                            name="category_id"
                                            value={values.category_id}
                                            onChange={handleCategoryChange}
                                            onBlur={handleBlur}
                                            error={errors.category_id && touched.category_id}
                                        >
                                            {categories.categories.map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {/* {errors.category_id && touched.category_id && (
                                            <div>{errors.category_id}</div>
                                        )} */}
                                    </FormControl>
                                    <FormControl fullWidth variant="standard" margin="dense">
                                        <InputLabel id="subcategory-label">Subcategory</InputLabel>
                                        <Select
                                            labelId="subcategory-label"
                                            id="subcategory_id"
                                            name="subcategory_id"
                                            value={values.subcategory_id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.subcategory_id && touched.subcategory_id}
                                            disabled={!values.category_id}
                                        >
                                            {filteredSubcategories.map((subcategory) => (
                                                <MenuItem key={subcategory._id} value={subcategory._id}>
                                                    {subcategory.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.subcategory_id && touched.subcategory_id && (
                                            <div>{errors.subcategory_id}</div>
                                        )}
                                    </FormControl>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Product name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && touched.name}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Product description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && touched.description}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="Product Price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={errors.price && touched.price}
                                        helperText={errors.price && touched.price ? errors.price : ''}
                                    />
                                    <input type="file" name="image" onChange={handleFile} />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={product.products}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection

                            />
                        </div>
                    
                </>
            )}
        </div>
    );
}

export default Product;