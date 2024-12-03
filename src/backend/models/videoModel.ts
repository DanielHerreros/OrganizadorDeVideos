import { QueryResult } from "pg";
import pool from "../config/configDb.js";
import { ApiResult } from "../types/ApiResult.js";
import { Video } from "../types/Video.js";

export async function saveNewVideo(video: Video): Promise<QueryResult> {
    console.log("revision model",video);
    const queryString = `INSERT INTO "videos" ("title", "description", "video_url") VALUES ($1, $2, $3)`;
    const values = [video.title, video.description, video.videoUrl];
    const result = await pool.query(queryString, values);
    return result;
}

export async function getVideos(): Promise<QueryResult> {
    const queryString = `SELECT * FROM "videos"`;
    const result = await pool.query(queryString);
    return result;
}

export async function findVideoById(id: string): Promise<QueryResult> {
    const queryString = `SELECT * FROM "videos" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result;
}

export async function deleteVideoById(id: string): Promise<QueryResult> {
    const queryString = `DELETE FROM "videos" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result;
}

export async function updateVideoById(video: Video): Promise<QueryResult> {
    const queryString = `UPDATE "videos" SET "title" = '${video.title}', "description" = '${video.description}', "file_path" = '${video.videoUrl}' WHERE "id" = ${video.id}`;
    const result = await pool.query(queryString);
    return result;
}