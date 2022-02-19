import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Dropzone} from "../../components/Dropzone";
import StepLabel from '@mui/material/StepLabel';
import {PostForm} from "./PostForm";
import {AddPostModel} from 'models/PostModel';
import axios from "../../utils/axiosInstance";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setLoadingPost} from "../../store/actions/postAction";
import imageCompression from 'browser-image-compression';
import {setLoadingAuth} from "../../store/actions/authActions";
import CircularProgress from "@mui/material/CircularProgress";
import {setLoadingUser} from "../../store/actions/userActions";


interface AddPostProps {
}

const steps = ['Add image', 'Create post'];

export const AddPost: React.FC<AddPostProps> = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { userLoading } = useSelector((state: RootState) => state.userReducer);

    const [file, setFile] = useState<File | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState<AddPostModel>({
        photo: null,
        description: '',
        tags: ''
    });
    const action = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
    }, [file, post]);

    const handleOpen = () => {
        setIsOpen(true);
    }


    const stepsElements = [
        {
             htmlElement: !file ? <Dropzone setFile={setFile}/> : <img src={URL.createObjectURL(file)} alt="post" onClick={handleOpen} className="add-post__image"/>
        },
        {
            htmlElement: <PostForm setPost={setPost} post={post} file={file}/>
        }
    ]
    const handleNext = () => {setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const removeImage = () => {
        setFile(null);
    }

    const handleAddPost = async () => {
        action(setLoadingUser(true));
        const fData = new FormData();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        file && imageCompression(file, options)
            .then((compressedFile) => {
                console.log(compressedFile);
                fData.append('photo', compressedFile);
                post.description && fData.append('description', post.description);
                post.tags && fData.append('tags', post.tags);

                axios.post(`./posts`,
                    fData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((res) => {
                    console.log(res.data);
                    navigate(`/profile/${user!.id}`);
                    action(setLoadingUser(false));
                }).catch((error) => console.log(error))
            }).catch((error) => console.log(error))
        console.log(post.photo);
    }

    if(userLoading){
        return <div className="add-post__loading"><CircularProgress size={40} /></div>
    }

    return (
        <main className='add-post'>
            <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/*{post.photo && <img src={URL.createObjectURL(post.photo)} alt="post" />}*/}
                    {/*{isEditMode && post.photo ? <img src={URL.createObjectURL(post.photo)} alt="post" /> : stepsElements[activeStep].htmlElement}*/}
                    {stepsElements[activeStep].htmlElement}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={!file && activeStep === 0}
                            onClick={activeStep === steps.length - 1 ? handleBack : removeImage}
                            sx={{ mr: 1 }}
                        >
                            {activeStep === steps.length - 1 ? 'Back' : 'Remove photo'}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={activeStep === steps.length - 1 ? handleAddPost : handleNext} disabled={!file}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
            </Box>
        </main>
    );
}