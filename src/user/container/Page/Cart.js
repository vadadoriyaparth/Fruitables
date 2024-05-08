import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removedata } from '../../../redux/slice/cart.slice';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { applyCoupon, getcoupon } from '../../../redux/slice/coupan.slice';
import Button from '../../component/UI/Button/Button';

function Cart(props) {
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.Addtocart);
  const coupan = useSelector(state => state.coupan);

  const [discount, setDiscount] = useState(0);

  const productdata = cart.cart.map((v) => {
    const product = products.products.find((v1) => v1.id === v.pid);
    return { ...product, qyt: v.qyt };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcoupon());
  }, []);

  const handelincrement = (id) => {
    dispatch(increment(id));
  };

  const handeldencrement = (id) => {
    dispatch(decrement(id));
  };

  const handelremove = (id) => {
    dispatch(removedata(id));
  };

  const totalprice = productdata.reduce((acc, v) => acc + v.price * v.qyt, 0);
  const totalDiscount = totalprice * (discount / 100);
  const discountedTotal = totalprice - totalDiscount;
  const total = discountedTotal + 3;

  const handlecoupan = (data) => {
    let flag = 0;
    coupan.coupan.forEach((v) => {
      const currentDate = new Date();
      const expiryDate = new Date(v.expiryDate);

      if (v.coupan === data.coupan && currentDate <= expiryDate) {
        flag = 1;
        const discountAmount = (totalprice * v.percentage) / 100;
        setDiscount(v.percentage);
      } else if (v.coupan === data.coupan && currentDate > expiryDate) {
        flag = 2;
      }
    });

    if (flag === 0) {
      formik.setFieldError("coupan", "Invalid coupon");
    } else if (flag === 1) {
      formik.setFieldError("coupan", "Coupon applied Successfully");
    } else if (flag === 2) {
      formik.setFieldError("coupan", "Coupon Expired");
    }
  };

  const coupanSchema = object({
    coupan: string().required("Please Enter coupon"),
  });

  const formik = useFormik({
    initialValues: {
      coupan: '',
    },
    validationSchema: coupanSchema,
    onSubmit: (values) => {
      handlecoupan(values);
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;


  return (
    <div>
      <div>
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Cart</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Cart</li>
          </ol>
        </div>
        {/* Single Page Header End */}
        {/* Cart Page Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productdata.map((v) => (
                      console.log(productdata),
                      <tr key={v.id}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img src={v.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">{v.name}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{v.price }$</p>
                        </td>
                        <td>
                          <div className="input-group quantity mt-4" style={{ width: 100 }}>
                            <div className="input-group-btn">
                              <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={()=>handeldencrement(v.id)}>
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                            <span type="text" 
                              className="form-control form-control-sm text-center border-0" >
                                {v.qyt}
                            </span>
                            <div className="input-group-btn">
                              <button className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={() => handelincrement(v.id)}
                              >

                                <i className="fa fa-plus" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{v.price * v.qyt}$</p>
                        </td>
                        <td>
                          <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={()=>handelremove(v.id)}>
                            <i className="fa fa-times text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="coupan"
                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                placeholder="coupan Code"
                value={values.coupan}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                errors.coupan && touched.coupan ? <span>{errors.coupan}</span> : null
              }

              <button
                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                type="submit">
                Apply coupan
              </button>
            </form>

          </div>

            <div className="row g-4 justify-content-end">
              <div className="col-8" />
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div className="bg-light rounded">
                 
                  <div className="p-4">
                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Subtotal:</h5>
                      <p className="mb-0">${totalprice}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Discount:  {discount}%</h5>
                    <p className="mb-0">{totalDiscount}</p>
                  </div>

                    <div className="d-flex justify-content-between">
                      <h5 className="mb-0 me-4">Shipping</h5>
                      <div className>
                        <p className="mb-0">Flat rate: $3.00</p>
                      </div>
                    </div>
                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                  </div>
              
                      
                      <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                    <p className="mb-0 pe-4">${totalprice.toFixed(2)}</p>

                  </div>
                  
                  <Button
                  buttonDisabled={true}
                  onClick={() => console.log('done')}
                  >
                  Proceed Checkout
                  </Button>
                  {/* <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cart Page End */}
      </div>


    </div>
  );
}

export default Cart;