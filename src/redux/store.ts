import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import connectionReducer from './slices/connectionSlice';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import usersReducer from './slices/usersSlice';
import bathroomsReducer from './slices/bathroomsSlice';
import reviewsReducer from './slices/reviewsSlice';
import googleReducer from './slices/googleSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    auth: authReducer,
    resources: resourcesReducer,
    users: usersReducer,
    bathrooms: bathroomsReducer,
    reviews: reviewsReducer,
    google: googleReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
