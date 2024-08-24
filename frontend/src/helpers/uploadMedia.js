const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadMedia = async (media, upload_preset_name) => {
    const formData = new FormData();
    formData.append("file", media);
    formData.append("upload_preset", upload_preset_name);
    
    const dataResponse = await fetch(url, {
        method: 'post',
        body: formData
    })
    return dataResponse.json();
}

export default uploadMedia;
