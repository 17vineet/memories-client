import { FETCH_ALL,FETCH_POST, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api';

const getPostActionCreater = (post) =>{
    return {
        type : FETCH_POST , 
        payload : post
    }
}

const getPostsActionCreater = (posts) => {
    return {
        type: FETCH_ALL,
        payload: posts,
    }
}

const getPostsBySearchActionCreater = (posts) => {
    return {
        type: FETCH_BY_SEARCH,
        payload: posts,
    }
}


const createPostActionCreator = (post) => {
    return {
        type: CREATE,
        payload: post
    }
}

const updatePostActionCreator = (post) => {
    return {
        type: UPDATE,
        payload: post
    }
}

const deletePostActionCreator = (currentId) => {
    return {
        type: DELETE,
        payload: currentId
    }
}

export const getPost = (id) => {
    return async function (dispatch) {
        try {
            dispatch({ type:START_LOADING }) ;
            const { data } = await api.fetchPost(id);
            
            dispatch(getPostActionCreater(data));
            dispatch({ type:END_LOADING }) ;
        }
        catch (error) {
            console.log(error);
        }

    }
}
export const getPosts = (page) => {
    return async function (dispatch) {
        try {
            dispatch({ type:START_LOADING }) ;
            const { data } = await api.fetchPosts(page);
            
            dispatch(getPostsActionCreater(data));
            dispatch({ type:END_LOADING }) ;
        }
        catch (error) {
            console.log(error);
        }

    }
}

export const createPost = (post, history) => {
    return async function (dispatch) {
        try {
            dispatch({ type:START_LOADING }) ;
            const { data } = await api.createPosts(post);
            
            history.push(`/posts/${data._id}`) ;

            dispatch(createPostActionCreator(data));
            dispatch({ type:END_LOADING }) ;
        } catch (error) {
            console.log(error);
        }
    }
}

export const updatePost = (currentId, post) => {
    return async function (dispatch) {
        try {
            const { data } = await api.updatePost(currentId, post);

            dispatch(updatePostActionCreator(data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const deletePost = (currentId) => {
    return async function (dispatch) {
        try {
            await api.deletePost(currentId);

            dispatch(deletePostActionCreator(currentId));
        } catch (error) {
            console.log(error);
        }
    }
}

export const likePost = (currentId) => {
    return async function (dispatch) {
        try {
            const { data } = await api.likePost(currentId);

            dispatch(updatePostActionCreator(data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getPostsBySearch = (searchQuery) => {
    return async function (dispatch) {
        try {
            dispatch({ type:START_LOADING }) ;
            const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
            
            dispatch(getPostsBySearchActionCreater(data)) ;
            dispatch({ type:END_LOADING }) ;

        } catch (error) {
            console.log(error);
        }
    }
}

export const commentPost = (finalComment, postId) => {
    return async function (dispatch) {
        try {
            const { data } = await api.comment(finalComment,postId) ;

            dispatch(updatePostActionCreator(data));

            return data.comments ; 
        } catch (error) {
            console.log(error);
        }
    }
}

