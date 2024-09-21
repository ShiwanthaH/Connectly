import { API_URL } from "../constants";

export const getPosts = async () => {
    const res = await fetch(`${API_URL}/comments`);
    const data = await res.json();
    return data;
}

export const getPost = async (id: number) => {
    const res = await fetch(`${API_URL}/comments/${id}`);
    const data = await res.json();
    return data;
}

export const deletePost = async (id: number) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data;
}

export const createPost = async (name: string, content: string) => {
    const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
    });
    const data = await res.json();
    return data;
}

export const updatePost = async (id: number, name: string, content: string) => {
    const res = await fetch(`${API_URL}/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
    });
    const data = await res.json();
    return data;
}

