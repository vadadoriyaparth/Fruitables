// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
//   MenuItem, Select, FormControl, InputLabel
// } from '@mui/material';
// import { DeleteOutline, Edit } from '@mui/icons-material';
// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import { object, string, number } from 'yup';
// import { DeleteProducts, editProducts, addProducts, getProducts } from '../../../redux/action/product.action';
// import { getCategories } from '../../../redux/action/category.action';
// import { getSubData } from '../../../redux/slice/subcategory.slice';

// function Product() {
//   const [open, setOpen] = useState(false);
//   const [update, setUpdate] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const dispatch = useDispatch();
//   const products = useSelector(state => state.products.products);

//   const categories = useSelector(state => state.categories.categories);
//   const subcategories = useSelector(state => state.subcategories.subcategories);

//   useEffect(() => {
//     dispatch(getProducts());
//     dispatch(getCategories());
//     dispatch(getSubData());
//   }, [dispatch]);

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     formik.resetForm();
//     setUpdate(null);
//   };

//   const productSchema = object({
//     name: string().required("Enter your name"),
//     description: string().required("Enter your description"),
//     price: number().required("Enter your price"),
//     category_id: string().required("Enter your category"),
//     subcategory_id: string().required("Enter your subcategory"),
//     image: string().required("Upload your subcategory image")
//       .test("fileSize", "The file is large", (values) => values ? values.size <= 2 * 1024 * 1024 : true)
//       .test("fileType", "The file type is not supported", (values) => values ? ["image/jpeg", "image/png", "image/jpg"].includes(values.type) : true)
//   });

//   const handleEdit = (data) => {
//     setOpen(true);
//     formik.setValues(data);
//     setSelectedCategory(data.category_id);
//     setUpdate(data._id);
//   };

//   const handleDelete = (id) => dispatch(DeleteProducts(id));

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       description: '',
//       price: '',
//       category_id: '',
//       subcategory_id: '',
//       image: ''
//     },
//     validationSchema: productSchema,
//     onSubmit: (values, { resetForm }) => {
//       if (update) {
//         dispatch(editProducts({ ...values, _id: update }));
//       } else {
//         dispatch(addProducts(values));
//       }
//       resetForm();
//       handleClose();
//     },
//   });

//   const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;

//   const handleFile = (event) => {
//     formik.setFieldValue('image', event.currentTarget.files[0]);
//   };

//   const filteredSubcategories = subcategories.filter(subcategory => subcategory.category_id === values.category_id);

//   const columns = [
//     {
//       field: 'category_id',
//       headerName: 'Category',
//       width: 150,
//       renderCell: (params) => {
//         const category = categories.find(v => v._id === params.row.category_id);
//         return category ? category.name : '';
//       }
//     },
//     {
//       field: 'subcategory_id',
//       headerName: 'Subcategory',
//       width: 150,
//       renderCell: (params) => {
//         const subcategory = subcategories.find(v => v._id === params.row.subcategory_id);
//         return subcategory ? subcategory.name : '';
//       }
//     },
//     { field: 'name', headerName: 'Name', width: 150 },
//     { field: 'description', headerName: 'Description', width: 130 },
//     { field: 'price', headerName: 'Price', width: 130 },
//     {
//       field: 'image',
//       headerName: 'Image',
//       width: 150,
//       renderCell: (params) => (
//         <img
//           src={params.row?.image.url}
//           alt='product'
//           style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//         />
//       )
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 200,
//       renderCell: (params) => (
//         <>
//           <Button
//             onClick={() => handleEdit(params.row)}
//             startIcon={<Edit />}
//           />
//           <Button
//             onClick={() => handleDelete(params.row._id)}
//             startIcon={<DeleteOutline />}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {products.isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <Button variant="outlined" onClick={handleClickOpen}>
//             Add Product
//           </Button>
//           <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Product</DialogTitle>
//             <form onSubmit={handleSubmit}>
//               <DialogContent>
//                 <FormControl fullWidth variant="standard" margin="dense">
//                   <InputLabel id="category-label">Category</InputLabel>
//                   <Select
//                     labelId="category-label"
//                     id="category-label"
//                     name="category_id"
//                     value={values.category_id}
//                     onChange={(e) => {
//                       handleChange(e);
//                       setSelectedCategory(e.target.value);
//                       setFieldValue('subcategory_id', '');
//                     }}
//                     onBlur={handleBlur}
//                     error={errors.category_id && touched.category_id}
//                   >
//                     {categories.map((v) => (
//                       <MenuItem key={v._id} value={v._id}>
//                         {v.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth variant="standard" margin="dense">
//                   <InputLabel id="subcategory-label">Subcategory</InputLabel>
//                   <Select
//                     labelId="subcategory-label"
//                     id="subcategory_id"
//                     name="subcategory_id"
//                     value={values.subcategory_id}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={errors.subcategory_id && touched.subcategory_id}
//                     disabled={!values.category_id}
//                   >
//                     {filteredSubcategories.map((subcategory) => (
//                       <MenuItem key={subcategory._id} value={subcategory._id}>
//                         {subcategory.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   {errors.subcategory_id && touched.subcategory_id && (
//                     <div>{errors.subcategory_id}</div>
//                   )}
//                 </FormControl>
//                 <TextField
//                   margin="dense"
//                   id="name"
//                   name="name"
//                   label="Product name"
//                   type="text"
//                   fullWidth
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.name}
//                   error={errors.name && touched.name}
//                   helperText={errors.name && touched.name ? errors.name : ''}
//                 />
//                 <TextField
//                   margin="dense"
//                   id="description"
//                   name="description"
//                   label="Product description"
//                   type="text"
//                   fullWidth
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.description}
//                   error={errors.description && touched.description}
//                   helperText={errors.description && touched.description ? errors.description : ''}
//                 />
//                 <TextField
//                   margin="dense"
//                   id="price"
//                   name="price"
//                   label="Product Price"
//                   type="number"
//                   fullWidth
//                   variant="standard"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.price}
//                   error={errors.price && touched.price}
//                   helperText={errors.price && touched.price ? errors.price : ''}
//                 />
//                 <input type="file"
//                   name="image"
//                   onChange={handleFile}
//                   onBlur={handleBlur}
//                   error={touched.image && Boolean(errors.image)}
//                 />
//                 {values?.image && (
//                   <img src={values?.image.url ? values?.image.url : URL.createObjectURL(values.image)}
//                     width={50} height={50} alt="Product"
//                   />
//                 )}
//                 <DialogActions>
//                   <Button onClick={handleClose}>Cancel</Button>
//                   <Button type="submit">{update ? 'Update' : 'Add'}</Button>
//                 </DialogActions>
//               </DialogContent>
//             </form>
//           </Dialog>
//           <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//               rows={products}
//               columns={columns}
//               initialState={{
//                 pagination: {
//                   paginationModel: { page: 0, pageSize: 5 },
//                 },
//               }}
//               getRowId={(row) => row._id}
//               pageSizeOptions={[5, 10]}
//               checkboxSelection
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Product;



import React, { useEffect, useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subcategory.slice';
import { addProducts, deleteProducts, editProducts, getProducts } from '../../../redux/slice/product.slice';

function Products() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  
  const categories = useSelector(state => state.categories.categories);
  console.log(categories);
  const subcategories = useSelector(state => state.subcategories.subcategories);
  console.log(subcategories);

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSubData());
    dispatch(getCategories());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    formik.resetForm();
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
  };

  const ProductsSchema = Yup.object({
    image: Yup.mixed().required('File is required')
      .test('size', 'Size must be less than 2MB', (value) => value?.size <= 2 * 1024 * 1024)
      .test('fileType', 'File must be a PDF, JPG, or SVG', (value) => {
        const supportedFormats = ['application/pdf', 'image/jpeg', 'image/png', 'image/svg+xml'];
        return value ? supportedFormats.includes(value.type) : true;
      }),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.string().required('Price is required'),
    subcategory_id: Yup.string().required('Subcategory is required'),
    category_id: Yup.string().required('Category is required'),
  });

  const formik = useFormik({
    initialValues: {
      image: '',
      name: '',
      description: '',
      price: '',
      subcategory_id: '',
      category_id: '',
    },
    validationSchema: ProductsSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editProducts(values));
      } else {
        dispatch(addProducts(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;

  const handleFileChange = (event) => {
    setFieldValue('image', event.currentTarget.files[0]);
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 70,
      renderCell: (params) => (

        <>
          <img
          src={params.value.url}
          alt="product"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
        </>
      
      ),
      
    },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'category_id',
      headerName: 'Category',
      width: 130,
      renderCell: (params) => {
        const category = categories.find((v) => v._id === params.row.category_id);
        return category ? category.name : '';
      }
    },
    {
      field: 'subcategory_id',
      headerName: 'Subcategory',
      width: 130,
      renderCell: (params) => {
        const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
        return subcategory ? subcategory.name : '';
      }
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row._id)}
            startIcon={<DeleteIcon />}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row)}
            startIcon={<EditIcon />}
          />
        </>
      ),
    },
  ];

  return (
    <>
      {products.isLoading ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={products.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : products.error ? (
        <div>{products.error}</div>
      ) : (
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
            Add Product
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{update ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <DialogContent>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    name="category_id"
                    value={values.category_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {categories.map((v) => (
                      <MenuItem key={v._id} value={v._id}>
                        {v.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                  <Select
                    labelId="subcategory-select-label"
                    id="subcategory-select"
                    name="subcategory_id"
                    value={values.subcategory_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {subcategories
                      .filter((v) => v.category_id === values.category_id)
                      .map((sub) => (
                        <MenuItem key={sub._id} value={sub._id}>
                          {sub.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Product Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  required
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  required
                  margin="dense"
                  id="price"
                  name="price"
                  label="Enter Price"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
                <input
                  type="file"
                  name="image"
                  onBlur={handleBlur}
                  onChange={handleFileChange}
                  error={touched.image && Boolean(errors.image)}
                />
                {values.image && (
                  <img
                    alt="product"
                    src={values.image.url ? values.image.url : URL.createObjectURL(values.image)}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  {update ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={products}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
