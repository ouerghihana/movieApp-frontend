import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './MovieSlice';
import userSlice from './UserSlice'
import adminSlice from './AdminSlice';
export default configureStore({
  reducer: {
    movie: movieSlice,
    user:userSlice,
    auth:adminSlice,
  },
});
