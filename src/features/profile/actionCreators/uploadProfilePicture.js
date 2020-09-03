import { UPLOAD_PROFILE_PICTURE } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'axios';

const uploadProfilePicture = (file, cb) => async (dispatch) => {
  try {
    dispatch(loading(UPLOAD_PROFILE_PICTURE, true));
    const fd = new FormData();
    fd.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    fd.append('file', file);
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    };
    const url = process.env.CLOUDINARY_UPLOAD_URL;
    await axios.post(url, fd, config)
      .then(res => cb({ imageUrl: res.data.secure_url }))
      .catch(err => console.log('encounter an error while uploading', err));
    dispatch(loading(UPLOAD_PROFILE_PICTURE, false));
  } catch (error) {
    dispatch(loading(UPLOAD_PROFILE_PICTURE, false));
  }
};

export default uploadProfilePicture;
