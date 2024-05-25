import React, { useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Divider, Image } from "antd";
import imagelogo from '../../assets/images/a6.png'
import {EyeFilled,EyeInvisibleFilled} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as UserService from "../../service/UserService"
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import{ useDispatch} from 'react-redux'
import { updateUser } from "../../redux/slides/userSlide";
const SignInPage = ()=>{
    const [isShowPassWord,setIsShowPassWord] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const{data,isLoading,isSuccess} = mutation
    console.log('location',location);
    useEffect(()=>{
        if(isSuccess){
            if(data?.access_token){
                localStorage.setItem('access_token',JSON.stringify(data?.access_token))
                const decoded = jwtDecode(data?.access_token)
                if(decoded?.id){
                    handleGetDetailsUser(decoded?.id,data?.access_token)
                }
                if(location?.state){
                    navigate(location?.state)
                }else{
                    navigate('/')
                }
            }
        }
    },[isSuccess])

    const handleGetDetailsUser = async (id,token) =>{
        const res = await UserService.getDetailsUser(id,token)
        dispatch(updateUser({...res?.data,access_token:token}))
    } 

    const handleOnchangeEmail = (value) =>{
        setEmail(value)
    }
    const handleOnchangePassword = (value) =>{
        setPassword(value)
    }
    const handleSignIn = ()=>{
        mutation.mutate({
            email,
            password
        })
        console.log('sign-in',email,password)
    }
    const handleNavigateSignUp = () =>{
        navigate('/sign-up')
    }
    const navigate1 = useNavigate()
    const handleNavigateHomePage = () =>{
        navigate1('/')
    }
    return(
        <div style={{display:'flex', alignItems:'center',justifyContent:'center',background:'#efefef', height:"100vh"}}>
            <div style={{width:'800px', height:'445px', borderRadius:'6px', background:'#fff',display:'flex'}}>
            <WrapperContainerLeft>
                <h1 style={{margin:'0px'}}>Xin chào</h1>
                <p>Đăng nhập hoặc tạo tài khoản</p>
                <InputForm style={{marginBottom:'20px'}} placeholder = "abc@gmail.com" value ={email} onChange={handleOnchangeEmail}/>
                <div style={{position:'relative'}}>
                    <span onClick={()=>setIsShowPassWord(!isShowPassWord)} 
                        style={{
                        zIndex:10,
                        position:'absolute',
                        top:'11px',
                        right:'8px',
                    }}
                    >{
                        isShowPassWord ? (
                            <EyeFilled/>
                        ) : (
                            <EyeInvisibleFilled/>
                        )
                    }
                    </span>
                    <InputForm placeholder = "Password" type = {isShowPassWord ? "text": "password"} value ={password} onChange={handleOnchangePassword}/>
                </div>
                {data?.status === 'ERR'&&<span style={{color:'red',marginTop:'10px', display:"block"}}>{data?.message}</span>}
                <Loading isLoading = {false}>
                <ButtonComponent
                    disabled = {!email.length||!password.length}
                    onClick={handleSignIn}
                    size= 'large'
                    styleButton={{
                        background:'rgb(255,57,69)',
                        height:'50px',
                        width:'100%',
                        border:'none',
                        borderRadius:'4px',
                        margin:'26px 0 10px',
                        
                    }}
                    textButton = {'Đăng nhập'}
                    styleTextButton={{color:'#fff', fontSize:'15px' , fontWeight:700 }}
                    >
                    </ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>  
                    <p style={{margin:'0px'}}>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
                <Image src={imagelogo} preview={false} alt="alt-logo" height="300px" width="300px" onClick={handleNavigateHomePage} style={{cursor:"pointer"}}/>
                {/* <h4>Tìm kiếm thú cưng tại</h4> */}
            </WrapperContainerRight>
        </div>
        </div>
    )
}

export default SignInPage