import { saveNewVideo, getVideos, findVideoById, deleteVideoById, updateVideoById } from "../models/videoModel.js";
import { ApiResult } from "../types/ApiResult.js";
// Corrected the import statement for Video to match the correct file name
import { Video } from "../types/Video.js";
import { ApiResultGenerator } from "../utils/ApiResultGenerator.js";

export async function newVideo(video: Video): Promise<ApiResult> {
    let apiResult: ApiResult;
    console.log("revision controller",video);
    try {
        const result = await saveNewVideo(video);
        apiResult = ApiResultGenerator.postResult(result);
    } catch (error) {
        apiResult = ApiResultGenerator.postResult(error instanceof Error ? error : new Error('Error desconocido'));
    }
    return apiResult;
}

export async function getAllVideos(): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
        const result = await getVideos();
        apiResult = ApiResultGenerator.getResult(result);
    } catch (error) {
        apiResult = ApiResultGenerator.getResult(error instanceof Error ? error : new Error('Error desconocido'));
    }
    return apiResult;
}

export async function getVideo(id: string): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
        const result = await findVideoById(id);
        apiResult = ApiResultGenerator.getResult(result);
    } catch (error) {
        apiResult = ApiResultGenerator.getResult(error instanceof Error ? error : new Error('Error desconocido'));
    }
    return apiResult;
}

export async function deleteVideo(id: string): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
        const result = await deleteVideoById(id);
        apiResult = ApiResultGenerator.deleteResult(result);
    } catch (error) {
        apiResult = ApiResultGenerator.deleteResult(error instanceof Error ? error : new Error('Error desconocido'));
    }
    return apiResult;
}

export async function updateVideo(video: Video): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
        const result = await updateVideoById(video);
        apiResult = ApiResultGenerator.putResult(result);
    } catch (error) {
        apiResult = ApiResultGenerator.putResult(error instanceof Error ? error : new Error('Error desconocido'));
    }
    return apiResult;
}