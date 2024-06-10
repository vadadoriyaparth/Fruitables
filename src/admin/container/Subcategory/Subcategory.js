import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { object, string } from "yup";
import { useFormik } from "formik";
import { getCategories } from "../../../redux/action/category.action";
import { deleteSubcategory, getSubData, handleAdd, handleUpdateData } from "../../../redux/slice/subcategory.slice";

function Subcategory() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subcategories);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubData());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUpdate(null);
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setOpen(true);
    setUpdate(data._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteSubcategory(id));
  };

  const columns = [
    {
      field: 'category_id',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => {
        const category = categories.categories.find((v) => v._id === params.row.category_id);
        return category ? category.name : '';
      }
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const subcategorySchema = object({
    category_id: string().required("Please select a category"),
    name: string().required("Please enter a name"),
    description: string().required("Please enter a description").min(5, "Please enter at least 5 characters"),
  });

  const formik = useFormik({
    initialValues: {
      category_id: "",
      name: "",
      description: "",
    },
    validationSchema: subcategorySchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(handleUpdateData({ ...values, _id: update }));
      } else {
        dispatch(handleAdd(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue } = formik;

  const changeSelect = (event) => {
    setFieldValue("category_id", event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Subcategory
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subcategory</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Categories</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={values.category_id}
                  label="Category"
                  name="category_id"
                  onChange={changeSelect}
                  onBlur={handleBlur}
                  error={errors.category_id && touched.category_id}
                >
                  {categories.categories.map((v) => (
                    <MenuItem key={v._id} value={v._id}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Subcategory Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name}
              helperText={errors.name && touched.name ? errors.name : ""}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Subcategory Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={errors.description && touched.description}
              helperText={errors.description && touched.description ? errors.description : ""}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? "Update" : "Add"}</Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={subcategories.subcategories}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

export default Subcategory;
