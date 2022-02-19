import React from 'react'
import {useDropzone} from 'react-dropzone'
import Button from '@mui/material/Button';

interface DropzoneProps {
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}


export const Dropzone: React.FC<DropzoneProps> = ({setFile}) => {
    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            console.log(file)
            setFile(file);
        });
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({onDrop, accept: 'image/png, image/jpg, image/jpeg', multiple: false,
        maxFiles: 1,});

    const test = () => {
        if(isDragReject){
            return 'icon--drag-reject';
        }
        if(isDragAccept){
            return 'icon--drag-accept';
        }
    }

    return (
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()}/>
                <i className={`far fa-images icon ${test()}`} />
                {isDragAccept && (<p className="dropzone__info">File will be accepted</p>)}
                {isDragReject && (<p className="dropzone__info">File will be rejected</p>)}
                {!isDragActive && (<p className="dropzone__info">Drop photo here</p>)}
                <Button variant="contained">Choose from device</Button>

            </div>
    );
}