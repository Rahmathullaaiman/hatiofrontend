import { baseUrl } from "./Baseurl"
import { commonAPI } from "./commonapi"

//register api
export const registerapi = async(user)=>{
    return await commonAPI('POST',`${baseUrl}/user/register`,user,"")
}
//Login Api
export const loginapi = async(user)=>{
    return await commonAPI('POST',`${baseUrl}/user/login`,user,"")
}
//ADD
export const AddText = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${baseUrl}/addText`,reqBody,reqHeader)
}
//GET
export const Gettodos = async(reqHeader)=>{
    return await commonAPI('GET',`${baseUrl}/get`,"",reqHeader)
}
//DELETE
export const deletetodos = async(todoid,reqHeader)=>{
    return await commonAPI('DELETE',`${baseUrl}/delete/${todoid}`,{},reqHeader)
}
//UPDATE
export const Edittodos = async(todoid,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${baseUrl}/update/${todoid}`,reqBody,reqHeader)
}
//completed status
export const editstatus = async(todoid,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${baseUrl}/todos/${todoid}`,reqBody,reqHeader)
}