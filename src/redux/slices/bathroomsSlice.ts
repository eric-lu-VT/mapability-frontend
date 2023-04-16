import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';
import { IBathroom } from 'types/bathrooms';
import { IReview } from 'types/reviews';
import { getReview } from './reviewsSlice';

export interface BathroomState {
  loading: boolean
  all: Record<string, IBathroom>
  selectedBathroomId: string,
}

const initialState: BathroomState = {
  loading: false,
  all: {},
  selectedBathroomId: '',
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
  async (req: Omit<IBathroom, 'id'>, { dispatch }) => {
    dispatch(startBathroomLoading());
    console.log(req);
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

export const getBathroomsByLocationRange = createAsyncThunk(
  'bathrooms/getBathroomsByLocationRange',
  async (req: { latitude: number, longitude: number }, { dispatch }) => {
    dispatch(startBathroomLoading());
    return axios
      .get(`${SERVER_URL}bathrooms?searchLng=${req.longitude}&searchLat=${req.latitude}&searchRadius=${10}`)
      .then(async (response) => {
        if (response.data != null) {

        } else {
          console.log('response.data null');
        }
        
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting bathrooms', error);
        return false;
      })
      .finally(() => dispatch(stopBathroomLoading()));
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
    setSelectedBathroom: (state, action) => ({ ...state, selectedBathroomId: action.payload }),
    resetBathroomState: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBathrooms.fulfilled, (state, action) => {
      const bathrooms: IBathroom[] = action.payload as IBathroom[];
      bathrooms?.forEach((bathroom: IBathroom) => {
        state.all[bathroom.id] = bathroom;
      });
    });
    builder.addCase(createBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      state.all[bathroom.id] = bathroom;
      alert('Created bathroom as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      state.all[bathroom.id] = bathroom;
      alert('Retrieved bathroom as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getBathroomsByLocationRange.fulfilled, (state, action) => {
      const bathrooms: IBathroom[] = action.payload as IBathroom[];
      bathrooms?.forEach((bathroom: IBathroom) => {
        state.all[bathroom.id] = bathroom;
      });
    });
    builder.addCase(updateBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      state.all[bathroom.id] = bathroom;
      alert('Updated bathroom to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteBathroom.fulfilled, (state, action) => {
      const bathroom: IBathroom = action.payload as IBathroom;
      delete state.all[bathroom.id];
      alert('Deleted bathroom with id ' + bathroom.id);
    });
  },
});

export const { startBathroomLoading, stopBathroomLoading, setSelectedBathroom, resetBathroomState } =
  bathroomSlice.actions;

export default bathroomSlice.reducer;