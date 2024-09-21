import { API_URL } from "../constants";

export const getPosts = async () => {
    const res = await fetch(`${API_URL}/post`);
    const data = await res.json();
    return data;
}

export const getPost = async (id: number) => {
    const res = await fetch(`${API_URL}/post/${id}`);
    const data = await res.json();
    return data;
}

export const createPost = async (title: string, content: string) => {
    const res = await fetch(`${API_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, titleColor: "default", authorId: "cm1c8suis0000qzne8w1jp7lu" })
    });
    const data = await res.json();
    return data;
}

export const updatePost = async (id: number, title: string, content: string) => {
    const res = await fetch(`${API_URL}/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });
    const data = await res.json();
    return data;
}

export const deletePost = async (id: number) => {
    const res = await fetch(`${API_URL}/post/${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data;
}

