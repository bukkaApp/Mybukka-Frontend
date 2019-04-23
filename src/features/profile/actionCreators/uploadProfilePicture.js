import { UPLOAD_PROFILE_PICTURE } from 'Redux/actionTypes';

import loading from 'Redux/loading';

import axios from 'axios';

const uploadProfilePicture = (file, userData, cb) => async (dispatch) => {
  try {
    dispatch(loading(UPLOAD_PROFILE_PICTURE, true));
    const fd = new FormData();
    fd.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
    fd.append('file', file);
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    };
    const url = process.env.CLOUDINARY_UPLOAD_URL;
    axios.post(url, fd, config)
      .then((res) => {
        const response = res.data;
        const urlStr = response.secure_url;
        const data = {
          ...userData,
          imageUrl: urlStr
        };
        return cb(data);
      })
      .catch((err) => {
        console.log('encounter an error while uploading', err);
      });
    dispatch(loading(UPLOAD_PROFILE_PICTURE, false));
  } catch (error) {
    dispatch(loading(UPLOAD_PROFILE_PICTURE, false));
  }
};

export default uploadProfilePicture;
