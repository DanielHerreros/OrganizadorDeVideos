import { QueryResult } from "pg";
import pool from "../config/configDb.js";
import { ApiResult } from "../types/ApiResult.js";
// Corrected the import statement for User to match the file name case
import { User } from "../types/user.js";

export async function saveNewUser(user:User):Promise<QueryResult>{

        const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ($1, $2, $3, $4, $5)`;
        const values = [user.userName, user.name, user.first_surname, user.password, user.email];
        console.log(queryString,values);
        console.log(user);
        console.log(pool);
        const result = await pool.query(queryString, values);
        return result;
   
}

export async function getUsers():Promise<QueryResult>{  
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result;
}

export async function findUserById(id:string):Promise<QueryResult>{ 
    const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result;
}

export async function findUserByUsername(username:string):Promise<QueryResult>{ 
    const queryString = `SELECT * FROM "user" WHERE "userName" = '${username}'`;
    const result = await pool.query(queryString);
    return result;
}

export async function deleteUserById(id: string): Promise<QueryResult> {
   
        const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        return result;
}   

export async function updateUserById(user: User): Promise<QueryResult> {
    const queryString = `UPDATE "user" SET "name" = '${user.name}', "first_surname" = '${user.first_surname}', "password" = '${user.password}', "email" = '${user.email}', "userName" = '${user.userName}' WHERE "id" = ${user.id};`;
    const result = await pool.query(queryString);
    return result;
}   