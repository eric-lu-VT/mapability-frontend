import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from 'utils/constants.js';
import axios from 'axios';

export interface GoogleState {
  formatted_address: string,
  name: string,
  place_id: string,
  vicinity: string,
}

const initialState: GoogleState = {
  formatted_address: '',
  name: '',
  place_id: '',
  vicinity: '',
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

export const googleSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    resetGooglePlace: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder.addCase(googleReverseGeocode.fulfilled, (state, action) => {
      const res = action.payload as any; // Not great casting but whatever
      state.formatted_address = res.result?.formatted_address || '';
      state.name = res.result?.name || '';
      state.place_id = res.result?.place_id || '';
      state.vicinity = res.result?.vicinity || '';
    });
  },
});

export const { resetGooglePlace } =
  googleSlice.actions;

export default googleSlice.reducer;
