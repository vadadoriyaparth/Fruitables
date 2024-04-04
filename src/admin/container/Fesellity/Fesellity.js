import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { delete_data, edite_data, facilites_data } from '../../../redux/action/fesellity.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Facilites(props) {
    const [open, setOpen] = React.useState(false);
    const [Update, setUpdate] = React.useState(false);

    
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true);
        setUpdate(false)
    };

    let facilitesSchema = object({
        name: string().required(),
        discription: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            discription: "",
        },
        validationSchema: facilitesSchema,

        onSubmit: (values, { resetForm }) => {
            const rNo = Math.floor((Math.random()) * 1000);
            if (Update) {
                dispatch(edite_data(values));
            } else {
                dispatch(facilites_data({ ...values, id: rNo }));
            }
         
            resetForm();
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik

    const handledelete = (id) => {
        console.log(id);
        dispatch(delete_data(id))
    }
    const handledite = (data) => {
        console.log(data);
        setOpen(true);
        formik.setValues(data);
        setUpdate(true);

    }
    const facilites = useSelector(state => state.facilites)
    console.log(facilites);
    const columns = [
        { field: 'name', headerName: 'NAME', width: 70 },
        { field: 'discription', headerName: 'Discription', width: 130 },

        {
            field: 'action',
            headerName: 'action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => handledelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edite" size="large" onClick={() => handledite(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>

            )
        },
    ];

    return (
        <div>
            {
                facilites.isLodaing ? <p>isLodaing...................
                    
                </p>
                 :
                <>
                  <Button variant="outlined" onClick={handleClickOpen}>
                Add Facilites
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Facilites</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Add Facilites"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ""}
                        />
                        <TextField
                            margin="dense"
                            id="discription"
                            name="discription"
                            label="Add Discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discription}
                            error={errors.discription && touched.discription ? true : false}
                            helperText={errors.discription && touched.discription ? errors.discription : ""}
                        />
                        <DialogActions>


                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{ Update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={facilites.facilites}
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
            }
          
        </div>
    );
}

export default Facilites;