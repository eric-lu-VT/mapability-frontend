import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';
import { IBathroom } from 'types/bathrooms.jsx';

export interface BathroomState {
  loading: boolean
  all: Record<string, IBathroom>
  indices: {
    byValue: Record<number, string> // value => id
  }
}

const initialState: BathroomState = {
  loading: false,
  all: {},
  indices: {
    byValue: {},
  },
};

export const getAllBathrooms = createAsyncThunk(
  'bathrooms/getAllBathrooms',
  async (req: unknown, { dispatch }) => {
    dispatch(startBathroomLoading());
    return axios
      .get<IBathroom[]>(`${SERVER_URL}bathrooms/`)
      .finally(() => dispatch(stopBathroomLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all bathrooms', error);
        return false;
      });
  },
);

export const createBathroom = createAsyncThunk(
  'bathrooms/createBathroom',
  async (req: { title: string, description: string, value: number }, { dispatch }) => {
    dispatch(startBathroomLoading());
    return axios
      .post(`${SERVER_URL}bathrooms/`, req)
      .finally(() => dispatch(stopBathroomLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating bathroom', error);
        return false;
      });
  },
);

export const getBathroom = createAsyncThunk(
  'bathrooms/getBathroom',
  async (id: string, { dispatch }) => {
    dispatch(startBathroomLoading());
    return axios
      .get(`${SERVER_URL}bathrooms/${id}`)
      .finally(() => dispatch(stopBathroomLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting bathroom', error);
        return false;
      });
  },
);

export const updateBathroom = createAsyncThunk(
  'bathrooms/updateBathroom',
  async (req: IBathroom, { dispatch }) => {
    dispatch(startBathroomLoading());
    return axios
      .patch(`${SERVER_URL}bathrooms/${req.id}`, req)
      .finally(() => dispatch(stopBathroomLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when updating bathroom', error);
        return false;
      });
  },
);

export const deleteBathroom = createAsyncThunk(
  'bathrooms/deleteBathroom',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startBathroomLoading());
    return axios
      .delete(`${SERVER_URL}bathrooms/${req.id}`)
      .finally(() => dispatch(stopBathroomLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when deleting bathroom', error);
        return false;
      });
  },
);

export const bathroomSlice = createSlice({
  name: 'bathrooms',
  initialState,
  reducers: {
    startBathroomLoading: (state) => ({ ...state, loading: true }),
    stopBathroomLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBathrooms.fulfilled, (state, action) => {
      const bathrooms: IBathroom[] = action.payload as IBathroom[];
      bathrooms.forEach((bathroom: IBathroom) => {
        state.all[bathroom.id] = bathroom;
        state.indices.byValue[bathroom.value] = bathroom.id;
      });
    });
    builder.addCase(createBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      state.all[bathroom.id] = bathroom;
      state.indices.byValue[bathroom.value] = bathroom.id;
      alert('Created bathroom as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      state.all[bathroom.id] = bathroom;
      state.indices.byValue[bathroom.value] = bathroom.id;
      alert('Retrieved bathroom as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      state.all[bathroom.id] = bathroom;
      state.indices.byValue[bathroom.value] = bathroom.id;
      alert('Updated bathroom to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      delete state.all[bathroom.id];
      delete state.indices.byValue[bathroom.value];
      alert('Deleted bathroom with id ' + bathroom.id);
    });
  },
});

export const { startBathroomLoading, stopBathroomLoading } =
  bathroomSlice.actions;

export default bathroomSlice.reducer;