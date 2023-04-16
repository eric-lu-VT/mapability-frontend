import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from 'utils/constants.js';
import axios from 'axios';

export interface GoogleState {
  test: boolean // is connected to backend; does not necessarily mean user is logged in
}

const initialState: GoogleState = {
  test: false,
};

export const googleReverseGeocode = createAsyncThunk(
  'googleReverseGeocode',
  async (req: { latitude: number, longitude: number }) => {
    return axios
      .get<string>(`${SERVER_URL}google/reverse-geocode?latitude=${req.latitude}&longitude=${req.longitude}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  },
);

export const connectionSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    setSelectedGooglePlace: (state, action) => ({ ...state, selectedBathroomId: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(googleReverseGeocode.fulfilled, (state, action) => {

    });
  },
});

export default connectionSlice.reducer;
