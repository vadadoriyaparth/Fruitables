import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {addcoupon, deletecoupon, getcoupon, updateCoupon } from '../../../redux/slice/coupan.slice';
import { object, string, number, date } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { ContectContext } from '../../../context/ContectContext';

const Contect = () => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

  const contectSchema = object({
    addresh: string().required(),
    email: string().email().required(),
    number: number().required(),
  });

  const contect = useContext(ContectContext);
  console.log(contect);
  useEffect(() => {
    contect.getcontect()
  }, []);

  const formik = useFormik({
    initialValues: {
      addresh: '',
      email: '',
      number: '',
    },
    validationSchema: contectSchema,
    onSubmit: (values) => {
      if (update) {
        contect.editContact(values)
       
      } else {
        contect.addcontect(values)
      }

      handleClose();
      formik.resetForm();
    },
  });

  const columns = [
    { field: 'addresh', headerName: 'addresh', width: 130 },
    { field: 'email', headerName: 'email', width: 130 },
    { field: 'number', headerName: 'number', width: 130 },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 130,
      renderCell: (params) => (
        <IconButton variant="outlined"  onClick={() => handleRemove(params.row.id)}>
        
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <IconButton variant="contained"  onClick={() => handleEdit(params.row)}>
       
          <ModeEditOutlineIcon />
        </IconButton>
      ),
    },
  ];
  
  const handleRemove = (id) => {
    
    contect.deleteContact(id)
    
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(true);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <>
      <h1>Contect </h1>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Coupon Code</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="addresh"
              name="addresh"
              label="Enter addresh"
              type="text"
              fullWidth
              variant="standard"
              value={values.addresh}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.addresh && touched.addresh}
              helperText={touched.addresh ? errors.addresh : ''}
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="email"
              type="email"
              fullWidth
              variant="standard"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              helperText={touched.email ? errors.email : ''}
            />
            <TextField
              margin="dense"
              id="number"
              name="number"
              type="number"
              fullWidth
              variant="standard"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.number && touched.number}
              helperText={touched.number ? errors.number : ''}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? 'Update' : 'ADD'}</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={contect.contect}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection />
      </div>
    </>
  );
};

export default Contect;
