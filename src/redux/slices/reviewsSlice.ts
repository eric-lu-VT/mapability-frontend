import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import axios from 'axios';
import { IReview } from 'types/reviews';

export interface ReviewState {
  loading: boolean
  all: Record<string, IReview>
}

const initialState: ReviewState = {
  loading: false,
  all: {},
};

export const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async (req: unknown, { dispatch }) => {
    dispatch(startReviewLoading());
    return axios
      .get<IReview[]>(`${SERVER_URL}reviews/`)
      .finally(() => dispatch(stopReviewLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting all reviews', error);
        return false;
      });
  },
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (req: { title: string, description: string, value: number }, { dispatch }) => {
    dispatch(startReviewLoading());
    return axios
      .post(`${SERVER_URL}reviews/`, req)
      .finally(() => dispatch(stopReviewLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating review', error);
        return false;
      });
  },
);

export const getReview = createAsyncThunk(
  'reviews/getReview',
  async (id: string, { dispatch }) => {
    dispatch(startReviewLoading());
    return axios
      .get(`${SERVER_URL}reviews/${id}`)
      .finally(() => dispatch(stopReviewLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting review', error);
        return false;
      });
  },
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (req: IReview, { dispatch }) => {
    dispatch(startReviewLoading());
    return axios
      .patch(`${SERVER_URL}reviews/${req.id}`, req)
      .finally(() => dispatch(stopReviewLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting review', error);
        return false;
      });
  },
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (req: { id: string }, { dispatch }) => {
    dispatch(startReviewLoading());
    return axios
      .delete(`${SERVER_URL}reviews/${req.id}`)
      .finally(() => dispatch(stopReviewLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting review', error);
        return false;
      });
  },
);

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    startReviewLoading: (state) => ({ ...state, loading: true }),
    stopReviewLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      const reviews: IReview[] = action.payload as IReview[];
      reviews.forEach((review: IReview) => {
        state.all[review.id] = review;
      });
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      const review: IReview = action.payload as IReview;
      state.all[review.id] = review;
      alert('Created review as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(getReview.fulfilled, (state, action) => {
      const review: IReview = action.payload as IReview;
      state.all[review.id] = review;
      alert('Retrieved review as: ' + JSON.stringify(action.payload));
    });
    builder.addCase(updateReview.fulfilled, (state, action) => {
      const review: IReview = action.payload as IReview;
      state.all[review.id] = review;
      alert('Updated review to: ' + JSON.stringify(action.payload));
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      const review: IReview = action.payload as IReview;
      delete state.all[review.id];
      alert('Deleted review with id ' + review.id);
    });
  },
});

export const { startReviewLoading, stopReviewLoading } =
  reviewSlice.actions;

export default reviewSlice.reducer;