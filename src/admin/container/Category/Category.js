import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline, Update } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState([]);
    const [edit, setedit] = React.useState(null);

    const getdata = () => {
        let data = JSON.parse(localStorage.getItem('category'));

        if (data) {
            setdata(data);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setedit(null);
    };

    let categorySchema = object({
        category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'use a valid name').max(15, 'use a valid name'),
        discription: string().required().min(10, 'Message is 10 word')
    });

    const handaladd = (data) => {
        let localdata = JSON.parse(localStorage.getItem('category'));
        let rNo = Math.floor(Math.random() * 1000) + 1;

        if (localdata) {
            localdata.push({ ...data, id: rNo });
            localStorage.setItem('category', JSON.stringify(localdata));
        } else {
            localStorage.setItem('category', JSON.stringify([{ ...data, id: rNo }]));
        }

        getdata();
    }

    const Deletelocal = (id) => {

        const Delete = data.filter(v => v.id !== id);
        localStorage.setItem('category', JSON.stringify(Delete));
        setdata(Delete);
    }

    const editlocal = (data) => {
        formik.setValues(data);
        setOpen(true);
        setedit(data.id);
        // const Edit = data.filter(item => item.id === id);
        // localStorage.setItem('category', JSON.stringify(Edit));
    }

    const handalupadte = (data) => {

        let localdata = JSON.parse(localStorage.getItem('category'));


        let indx = localdata.findIndex(v => v.id === data.id);
        console.log(indx);

        localdata[indx] = data;
        localStorage.setItem('category', JSON.stringify(localdata));

        getdata();
    }

    const formik = useFormik({
        initialValues: {
            category: '',
            discription: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            resetForm();
            handleClose();
            // handaladd(values);

            if (edit) {
                handalupadte(values);
            } else {
                handaladd(values);
            }
        },
    });

    const columns = [
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'discription', headerName: 'Description', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => editlocal(params.row)}
                        startIcon={<EditIcon />}
                    >

                    </Button>
                    <Button
                        onClick={() => Deletelocal(params.row.id)}
                        startIcon={<DeleteOutline />}
                    >
                    </Button>
                </>

            ),
        },
    ];

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

    return (
        <>
            <React.Fragment>
                <div className='m-4 mx-5 d-flex justify-content-end'>
                    <Button variant="outlined" color='primary' onClick={handleClickOpen}>
                        Add Category
                    </Button>
                </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle className='text-center'>Add Category</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent style={{ width: 500 }}>
                            <div>
                                <TextField
                                    margin="dense"
                                    name="category"
                                    label="Enter category"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
                                    error={errors.category && touched.category ? true : false}
                                    helperText={errors.category && touched.category ? errors.category : ''}
                                />
                            </div>
                            <div>
                                <TextField
                                    margin="dense"
                                    name="discription"
                                    label="Enter category description"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.discription}
                                    error={errors.discription && touched.discription ? true : false}
                                    helperText={errors.discription && touched.discription ? errors.discription : ''}
                                />
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{edit ? 'Edit' : 'Add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Category;