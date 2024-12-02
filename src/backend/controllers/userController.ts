import { argon2Config } from "../config/configData.js";
import { deleteUserById, findUserById, getUsers, saveNewUser, updateUserById } from "../models/userModel.js";
import { ApiResult } from "../types/ApiResult.js";
import { User } from "../types/user.js";
import { ApiResultGenerator } from "../utils/ApiResultGenerator.js";
import argon2 from 'argon2';

export async function newUser(user: User):Promise<ApiResult>{
    let apiResult: ApiResult; 
    user.password = await argon2.hash(user.password, argon2Config);   
    try{
        console.log(user);
        const result = await saveNewUser(user);
        console.log(result);
        apiResult =  ApiResultGenerator.postResult(result);
        console.log(apiResult);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.postResult(error);
        } else {
            apiResult =  ApiResultGenerator.postResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}

export async function getAllUsers():Promise<ApiResult>{

    let apiResult: ApiResult;    
    try{
        const result = await getUsers();
        apiResult =  ApiResultGenerator.getResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.getResult(error);
        } else {
            apiResult =  ApiResultGenerator.getResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}

export async function getUser(id:string):Promise<ApiResult>{
    let apiResult: ApiResult;    
    try{
        const result = await findUserById(id);
        apiResult =  ApiResultGenerator.getResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.getResult(error);
        } else {
            apiResult =  ApiResultGenerator.getResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}

export async function deleteUser(id:string):Promise<ApiResult>{
    let apiResult: ApiResult;    
    try{
        const result = await deleteUserById(id);
        apiResult =  ApiResultGenerator.deleteResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.deleteResult(error);
        } else {
            apiResult =  ApiResultGenerator.deleteResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}

export async function updateUser(user:User):Promise<ApiResult>{
    let apiResult: ApiResult;    
    try{
        const result = await updateUserById(user);
        apiResult =  ApiResultGenerator.putResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.putResult(error);
        } else {
            apiResult =  ApiResultGenerator.putResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}