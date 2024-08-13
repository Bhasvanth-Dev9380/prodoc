import React, { useEffect } from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { setLoading, setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,loading} = useSelector(state => state.auth);
   

    useEffect(() => {
        console.log(user)
        if (!user||loading) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleoutClick = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(false));
            const res = await axios.post(`${USER_API_END_POINT}/logout`, null, {
               
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    if(user==null){
        navigate("/login")
     }else{       

    return (
        <div className="boxx">
            <div className="box">
                <div className='h1'>
                    <div className='h1'>Profile : </div>
                    <div className='logout' onClick={handleoutClick}>
                        <LogOut />
                    </div>
                </div>
                <div className='h2'> {user?.name}</div>
                <div className='description'>{user.description}</div>
                <div className='email'>{user.email}</div>
            </div>
        </div>
    );
}}

export default Home;
