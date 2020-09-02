import { configureStore } from '@reduxjs/toolkit';
import chatAppReducer from '../features/slice/chatAppSlice';

export default configureStore({
  reducer: {
    chatApp: chatAppReducer,
  },
});
