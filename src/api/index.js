import axios from 'axios';

const API = axios.create({ baseURL: 'https://memories-1awv.onrender.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('memoriesProfile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('memoriesProfile')).token}`;
    }
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPosts = (posts) => API.post('/posts', posts);

export const updatePost = (currentId, post) => API.patch(`/posts/${currentId}`, post);

export const deletePost = (currentId) => API.delete(`/posts/${currentId}`);

export const likePost = (currentId) => API.patch(`/posts/${currentId}/likePost`);

export const comment = (finalComment, postId) => API.post(`/posts/${postId}/commentPost`,{ finalComment });

export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);


