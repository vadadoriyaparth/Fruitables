import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counter.slice';

function Counter(props) {
    const countervall = useSelector(state=>state.counter);
    console.log(countervall);

    const dispatch=useDispatch()
        const handelincrement = () =>{
            dispatch(increment())
        }
        const handeldecrement = () =>{
            dispatch(decrement())
        }
    return (
        <div>
            <div>
            <button onClick={handelincrement}>+</button>
            {countervall.count}
            <button onClick={handeldecrement}>-</button>

        </div> 
        </div>
    );
}

export default Counter;