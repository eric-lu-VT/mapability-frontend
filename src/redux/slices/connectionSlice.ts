import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from 'utils/constants.js';
import axios from 'axios';

export interface ConnectionState {
  isConnected: boolean // is connected to backend; does not necessarily mean user is logged in
  latitude: number,
  longitude: number,
  tempLatitude: number,
  tempLongitude: number,
}

const initialState: ConnectionState = {
  isConnected: false,
  latitude: 43.7348569458618,
  longitude: -72.2519099587406,
  tempLatitude: 43.7348569458618,
  tempLongitude: -72.2519099587406,
};

export const checkConnection = createAsyncThunk(
  'connection',
  async () => {
    return axios
      .get<string>(`${SERVER_URL}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  },
);

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setLatLng: (state, action) => ({ ...state, latitude: action.payload.latitude, longitude: action.payload.longitude }),
    setTempLatLng: (state, action) => ({ ...state, tempLatitude: action.payload.tempLatitude, tempLongitude: action.payload.tempLongitude }),
  },
  extraReducers: (builder) => {
    builder.addCase(checkConnection.fulfilled, (state) => {
      state.isConnected = true;
    });
    builder.addCase(checkConnection.rejected, (state) => {
      state.isConnected = false;
    });
  },
});

export const { setLatLng, setTempLatLng } =
connectionSlice.actions;


export default connectionSlice.reducer;
