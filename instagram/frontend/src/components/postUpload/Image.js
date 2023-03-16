import React, { useState, useEffect, useContext } from 'react';
import axios from '../../Axios';
import AuthContext from '../../context/ContextAuth';

import './image.css'


function ImageUploader({ url, scope, images }) {
    const [image, setImage] = useState({});
    let [upload, setUpload] = useState({ uploading: 'Upload', color: { backgroundColor: 'rgb(27, 127, 203)' } })
    let [imageTitle, setImageTitle] = useState()
    let [imageDis, setImageDis] = useState()

    const { user, authToken,setUpdated,updated } = useContext(AuthContext)
    let [userData, setUserData] = useState(user.user_id)



    const handleFileSelect = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = () => {

        const formData = new FormData();
        formData.append('post_images', image);
        formData.append('image_title', imageTitle);
        formData.append('image_discription', imageDis);
        formData.append('user', userData);


        // printing the formData object
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }


        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${authToken.access}`
            },
        })
            .then(response => {
                console.log(response.data);
                setUpload({ uploading: 'Uploaded successfully', color: { backgroundColor: 'green' } })
                setUpdated('uploaded file')
            })
            .catch(error => {
                console.error(error);
            });
    };

useEffect(()=>{

},[updated])


    return (
        <div className='image-upload-container'>
            <div incl className="image-upload-inner">
                <div className="image-upload">
                    <div className="row border-bottom">
                        <h5 className='text-center p-3'>{scope}</h5>
                    </div>

                    <div className="bottom-inp">
                        <div className="form-data-inp">
                            {
                                scope === 'Add profile image' ? <div className="p-image mb-5">
                                    <div className="p-inner-image px-5">
                                        <img src={images ? images.image_url : ''} alt="" className="profile-on-image" />
                                    </div>
                                </div> : ''
                            }
                            {
                                scope === 'Create a new post' ? <div className="image-dis">
                                    <input onChange={(e) => setImageTitle(e.target.value)} type="text" className='form-control' placeholder='image-title' name='image_title' />
                                    <input onChange={(e) => setImageDis(e.target.value)} type="text" className='form-control mb-3 mt-3' placeholder='image-discription' name='image_dis' />
                                </div> : ''
                            }
                            <input id='image' type="file" className='input-fld' onChange={handleFileSelect} />
                            <button style={upload.color} className='mt-4 upload-button' onClick={handleUpload}>{upload.uploading}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageUploader;
