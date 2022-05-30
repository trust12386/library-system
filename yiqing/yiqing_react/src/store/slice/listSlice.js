import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApiList } from '../../server/index';

const initialState = {
  list: {},
  item: [],
  chinaAdd: {},
  chinaTotal: {},
  cityDetail: [],
};

export const getList = createAsyncThunk('cityList/getList', async () => {
  const result = await getApiList();
  return result;
});

export const listSlice = createSlice({
  name: 'cityList',
  initialState,
  reducers: {
    setItem: (state, { payload }) => {
      state.item = payload;
      console.log(state.item)
    },
  },
  extraReducers: {
    [getList.fulfilled](state, { payload }) {
      state.list = payload.data;
      state.chinaAdd = state.list.diseaseh5Shelf.chinaAdd;
      state.chinaTotal = state.list.diseaseh5Shelf.chinaTotal;
      state.cityDetail = state.list.statisGradeCityDetail.slice(0, 8);
    },
  },
});

export const { setItem } = listSlice.actions;
export default listSlice.reducer;
