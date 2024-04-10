import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProducts, EditeProducts, addProducts, getProducts } from '../../../redux/action/product.action';
import { DeleteOutline, Update } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { DELETE_PRODUCT } from '../../../redux/AcationType';



export default function Product() {
    const [open, setOpen] = React.useState(false);
    const [Update, setUpdate] = useState(false)

    const dispatch = useDispatch()
    const products = useSelector(state => state.products);
    console.log(products);

    React.useEffect(() => {
        dispatch(getProducts())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true);
    };

    let productSchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required().positive(),
        // image: string().required()
    });


    const handleedite = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
      
    }
    const handledelete = (id) => {
        dispatch(DeleteProducts(id))
        // {type:DELETE_PRODUCT,payload:response.data}
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            image: ''
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {

            if (Update) {
                dispatch(EditeProducts(values))
            } else {
                dispatch(addProducts(values))
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

// console.log(errors);
    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'description', headerName: 'description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => handleedite(params.row)}
                        startIcon={<EditIcon />}
                    >

                    </Button>
                    <Button
                        onClick={() => handledelete(params.row.id)}
                        startIcon={<DeleteOutline />}
                    >
                    </Button>
                </>

            ),
        },
    ];




    return (
        <div>
 {
                products.isLodaing ? <p>isLodaing...................
                    
                </p>
                 :
                 <>
                 <React.Fragment>
                     <Button variant="outlined" onClick={handleClickOpen}>
                         Add Product
                     </Button>
                     <Dialog
                         open={open}
                         onClose={handleClose}
                     >
                         <DialogTitle>Product</DialogTitle>
                         <form onSubmit={handleSubmit}>
                             <DialogContent>
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
                                     error={errors.name && touched.name ? true : false}
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
                                     error={errors.description && touched.description ? true : false}
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
                                     error={errors.price && touched.price ? true : false}
                                     helperText={errors.price && touched.price ? errors.price : ''}
                                 />

                                 {/* <TextField
                                  margin="dense"
                                  id="image"
                                  name="image"
                                  label="Product Image"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.image}
                                  error={errors.image && touched.image ? true : false}
                                  helperText={errors.image && touched.image ? errors.image : ''}
                              /> */}

                                 <DialogActions>
                                     <Button onClick={handleClose}>Cancel</Button>
                                     <Button type="submit">{ Update ? 'Update' : 'Add'}</Button>
                                 </DialogActions>

                             </DialogContent>
                         </form>

                     </Dialog>
                     <div style={{ height: 400, width: '100%' }}>
                     <DataGrid
                         rows={products.products}
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
                 </React.Fragment>

              
             </>
     
 }

              

        </div>
      

    );
}