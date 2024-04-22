import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addCoupon, getCoupon, removeCoupon, updateCoupon } from '../../../redux/slice/coupan.slice';
import { object, string, number, date } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Coupon = () => {
  const dispatch = useDispatch();
  const couponIsHere = useSelector(state => state.couponInCart);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false); // Reset the update state
  };

  const couponSchema = object({
    couponename: string().required(),
    percentage: number().required().positive().integer().min(1).max(100),
    date: date().required(),
  });

  const formik = useFormik({
    initialValues: {
      couponename: '',
      percentage: '',
      date: '',
      createdOn: new Date().toISOString().split('T')[0],
    },
    validationSchema: couponSchema,
    onSubmit: (values) => {
      if (update) {
        dispatch(updateCoupon(values.id, values));
      } else {
        dispatch(addCoupon({ ...values }));
      }

      handleClose();
      formik.resetForm();
    },
  });

  const columns = [
    { field: 'couponename', headerName: 'Coupon Name', width: 130 },
    { field: 'percentage', headerName: 'Percentage', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'createdOn', headerName: 'CreatedOn', width: 130 },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 130,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => handleRemove(params.row.id)}>
          Remove
          <DeleteIcon />
        </Button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="success" onClick={() => handleEdit(params.row)}>
          Edit
          <BorderColorIcon />
        </Button>
      ),
    },
  ];

  const handleRemove = (id) => {
    dispatch(removeCoupon(id));
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(true);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <>
      <h1>Coupon Page</h1>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Coupon Code</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="couponename"
              name="couponename"
              label="Enter Coupon Name"
              type="name"
              fullWidth
              variant="standard"
              value={values.couponename}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.couponename && touched.couponename}
              helperText={touched.couponename ? errors.couponename : ''}
            />
            <TextField
              margin="dense"
              id="percentage"
              name="percentage"
              label="percentage"
              type="number"
              fullWidth
              variant="standard"
              value={values.percentage}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.percentage && touched.percentage}
              helperText={touched.percentage ? errors.percentage : ''}
            />
            <TextField
              margin="dense"
              id="date"
              name="date"
              type="date"
              fullWidth
              variant="standard"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.date && touched.date}
              helperText={touched.date ? errors.date : ''}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={couponIsHere.coupon || []}
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
  );
};

export default Coupon;
