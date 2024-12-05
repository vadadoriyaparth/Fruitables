import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, deletereview, editreview, getreview } from '../../../redux/action/review.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Review(props) {
    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'review', headerName: 'review', width: 130 },
        { field: 'rating', headerName: 'Rating', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => (handleDelete(params.row.id))}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => (handleEdit(params.row))}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const dispatch = useDispatch();


    const [update, setUpdate] = useState(false)


    const reviews = useSelector(state => state.review)
    console.log(reviews);


    let shopDetailSchema = object({
        name: string().required(),
        email: string().required(),
        review: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: '',
        },

        validationSchema: shopDetailSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editreview(values))
            } else {
                dispatch(getreview(values))
            
            }
            resetForm();

        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;


   
    const handleDelete = (id) => {
        dispatch(deletereview(id))
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setUpdate(true);
      
    }
    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <form onSubmit={handleSubmit}>
                            <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border-bottom rounded">
                                        <input type="text"
                                            className="form-control border-0 me-4"
                                            placeholder="Yur Name *"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="border-bottom rounded">
                                        <input type="email"
                                            className="form-control border-0"
                                            placeholder="Your Email *"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.name && touched.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="border-bottom rounded my-4">
                                        <textarea
                                            id
                                            className="form-control border-0"
                                            cols={30}
                                            rows={8}
                                            placeholder="Your Review *"
                                            spellCheck="false"
                                            // defaultValue={""}
                                            name="review"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.review}
                                        />
                                        {errors.review && touched.review ? <span style={{ color: "red" }}>{errors.review}</span> : null}

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="d-flex justify-content-between py-3 mb-5">
                                        <div className="d-flex align-items-center">
                                            <p className="mb-0 me-3">Please rate:</p>
                                            <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                                <i className="fa fa-star text-muted" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                            </div>
                                        </div>
                                        <button type='submit' className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={reviews.review}
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
            </div>

        </div>
    );
}

export default Review;