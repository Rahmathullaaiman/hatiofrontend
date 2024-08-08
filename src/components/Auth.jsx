import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  Form } from 'react-bootstrap'
import { loginapi, registerapi,  } from '../Services/Allapi'
import Swal from 'sweetalert2'

function Auth({ Register }) {


    
    const[userdata,Setuserdata] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const regform = Register ? true : false
    console.log(userdata);
    const handleregister = async(e)=>{
        e.preventDefault()
        const{username,email,password}=userdata
        if(!username){
            Swal.fire({
                title: "ENTER USERNAME",
           
                icon: "error"
              });  
        }
        if(!email){
            Swal.fire({
                title: "ENTER E-MAIL",
           
                icon: "error"
              });  
        }
        if(!password){
            Swal.fire({
                title: "ENTER PASSWORD",
           
                icon: "error"
              });  
        }
        else{
            const result = await registerapi(userdata)
            console.log(result.data); 
            if(result.status===200){
 Swal.fire({
                title: "REGISTERED",
           
                icon: "success"
              });                
                Setuserdata({

                   
                    email:"",
                    password:""

                })
                navigate('/login')
            }
            else{
                alert(result.response.data)
            }
        }
    }

     const handlelogin = async (e)=>{
         e.preventDefault()
        const{email,password}=userdata
        if( !email){
            Swal.fire({
                title: "ENTER EMAIL",
           
                icon: "error"
              });  
         }
         if( !password){
            Swal.fire({
                title: "ENTER PASSWORD",
           
                icon: "error"
              });  
         }
         else{
             const result = await loginapi(userdata)
           console.log(result); 

           if(result.status===200){
            
            Swal.fire({
                title: "LOGGED IN ",
           
                icon: "success"
              });            
            

            sessionStorage.setItem('existuser',JSON.stringify(result.data.existuser))
            sessionStorage.setItem("token",result.data.token)
            

            Setuserdata({

            
              email:"",
              password:""

            })

            navigate('/todo')
           }
           else{
            alert(result.response.data)
           }
       
    }
  }



    return (
        <div style={{ width: "100%", height: "80vh" }} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <Link className='fs-2' style={{ color: "blue" }} to={'/'}>
                    

                </Link>
               
                <div className=' bg-white p-5 '>
                    <div className='row align-items-center'>
                    <div style={{marginTop:"2%"}} className='d-flex justify-content-center align-items-center'>
                    <h2 className="text-center mb-3 fw-bolder fs-1">Wel<span className='text-primary'>come!</span></h2>

                          </div>
                        <div className='col-lg-6'>
                          
                        <img style={{ width: '100%',borderRadius:"30px" }} src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg" alt="no img" />


                        </div>
                        <div className='col-lg-6 p-4'>
                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                <h1 style={{ color: "white" }}><i class="fa-brands fa-stack-overflow fa-2x"></i></h1>
                                <h5 className='text-light ms-5'>
                                    {
                                        regform ? <div className='d-flex justify-content-center align-items-center'>
                                          <h2 className='fw-bolder' style={{color:"black",marginLeft:"-160%"}}>SIGN <span className='text-primary'>UP</span></h2>

                                        </div>:
                                        <div className='d-flex justify-content-center align-items-center'>
                                        <h2 className='fw-bolder' style={{color:"black",marginLeft:"-160%"}}>SIGN <span className='text-primary'>IN</span></h2>

                                      </div>
                                        
                                    }
                                </h5>
                                <Form className='mt-3 w-100'>
                                    {regform &&
                                        <Form.Group className="mb-3  w-75" controlId="formBasicEmail">
                                            <Form.Control type="text" placeholder="Enter username" value={userdata.username}onChange={(e)=>Setuserdata({...userdata,username:e.target.value})} />

                                        </Form.Group>
                                    }
                                    <Form.Group className="mb-3  w-75" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email" value={userdata.email}onChange={(e)=>Setuserdata({...userdata,email:e.target.value})} />

                                    </Form.Group>
                                    <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
                                        <Form.Control type="password" placeholder="Enter Password" value={userdata.password}onChange={(e)=>Setuserdata({...userdata,password:e.target.value})} />

                                    </Form.Group>
                                    {regform ?
                                       <div className='d-flex justify-content-center align-items-center'>
                                         <div className=''>
                                            <button onClick={handleregister} className='btn btn-primary'>Register</button>
                                            <div style={{marginLeft:"-50%"}} className='d-flex justify-content-center align-items-center mt-4'>
                                            <p>Already a user?Click here to <Link style={{textDecoration:"none"}} to={'/login'}>Login</Link></p>
                                            </div>

                                        </div>
                                       </div> :
                                      <div className='d-flex justify-content-center align-items-center'>
                                          <div style={{marginLeft:"5%"}}>
                                            <button onClick={handlelogin} className='btn btn-primary'>Login</button>
                                            <div  style={{marginLeft:"-50%"}} className='d-flex justify-content-center align-items-center mt-4'>
                                            <p>New User?Click here to <Link style={{textDecoration:"none"}} to={'/'}>Register</Link></p>
                                            </div>
                                            

                                        </div>
                                      </div>
                                    }



                                </Form>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Auth