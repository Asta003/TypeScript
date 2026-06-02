import axios from 'axios';

const API_URL = 'http://localhost:5000';


export interface SignResponse {
    id: number;
    message: string;
}

export interface CheckResponse {
    exists: boolean;
    id?: number;
    message: string;
}

export interface CreateResponse {
    id: number;
    name: string;
    surname: string;
    message: string;
}

export interface PetResponse {
    id: number;
    name: string;
    pets: string[];
    message: string;
}

export interface ColorsResponse {
    id: number;
    name: string;
    colors: string[];
    message: string;
}

export interface ErrorResponse {
    error: string;
}


export async function sign(name: string): Promise<SignResponse | ErrorResponse> {
    try {
        const response = await axios.post(`${API_URL}/sign`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return { error: error.response.data.error };
        }
        return { error: 'Ошибка соединения с сервером' };
    }
}

export async function check(name: string): Promise<CheckResponse | ErrorResponse> {
    try {
        const response = await axios.post(`${API_URL}/check`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return { error: error.response.data.error };
        }
        return { error: 'Ошибка соединения с сервером' };
    }
}

export async function createUser(name: string, surname: string): Promise<CreateResponse | ErrorResponse> {
    try {
        const response = await axios.post(`${API_URL}/create`, { name, surname });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return { error: error.response.data.error };
        }
        return { error: 'Ошибка соединения с сервером' };
    }
}

export async function addPet(id: number, pet: string): Promise<PetResponse | ErrorResponse> {
    try {
        const response = await axios.post(`${API_URL}/pet`, { id, pet });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return { error: error.response.data.error };
        }
        return { error: 'Ошибка соединения с сервером' };
    }
}

export async function addColors(id: number, colors: string[]): Promise<ColorsResponse | ErrorResponse> {
    try {
        const response = await axios.post(`${API_URL}/colors`, { id, colors });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return { error: error.response.data.error };
        }
        return { error: 'Ошибка соединения с сервером' };
    }
}