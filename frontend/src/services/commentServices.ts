import { API_URL } from "../constants";

export const getComments = async (postId: string) => {
    console.log(postId)
    const res = await fetch(`${API_URL}/comment/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({postId}),
    });
    const data = await res.json();
    return data;
}

export const getComment = async (id: number) => {
    const res = await fetch(`${API_URL}/comment/${id}`);
    const data = await res.json();
    return data;
}

export const deleteComment = async (id: number) => {
    const res = await fetch(`${API_URL}/comment/${id}`, {
        method: "DELETE",
    });
    const data = await res.json();
    return data;
}

export const createComment = async (content: string, postId: string, authorId: string) => {
    const res = await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, postId, authorId }),
    });
    const data = await res.json();
    return data;
}

export const updateComment = async (content: string, id: string) => {
    const res = await fetch(`${API_URL}/comment/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    });
    const data = await res.json();
    return data;
}

