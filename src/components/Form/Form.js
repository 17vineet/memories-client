import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const Form = ({ currentId, setCurrentId }) => {

    const post = useSelector((state) => currentId ? state.posts.posts.find((post)=>post._id === currentId) : null) ; 
    const user = JSON.parse(localStorage.getItem('memoriesProfile')) ;
    const history = useHistory() ;

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(post)    setPostData(post) ;
    },[currentId])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {...postData , name : user?.result?.name }));
        }
        else {
            dispatch(createPost({...postData , name : user?.result?.name } , history ));
        }
        clear() ;
    }

    const clear = () => {
        setCurrentId(null) ; 
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        }) ;
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant='h6' align='center'>
                    Please Sign in to create your own memories and like posts
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{ currentId ? 'Editing':'Creating' } a Memory</Typography>
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({
                        ...postData,
                        title: event.target.value
                    })}
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({
                        ...postData,
                        message: event.target.value
                    })}
                />
                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tags'
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({
                        ...postData,
                        tags: event.target.value.split(',')
                    })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    )
};

export default Form; 