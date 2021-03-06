import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import { STATUS } from '~config/constants';



const initialState = {
	data: [],
	status: STATUS.IDLE,
	error: null,
};

export const transactionsKey = 'Transactions';

export const fetchTransactions = createAsyncThunk(
	`${transactionsKey}/fetch`,
	async ({ items_per_page = 10, page = 1 }) => {
		return await dataProvider.getList(resources.transactions, { items_per_page, page })
			.then(res => {
				let data = [];
				Object.keys(res).forEach(el => {
					data.push(res[el]);
				});
				return data;
			});
	}
);

export const getTransactionsSlice = createSlice({
	name: transactionsKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTransactions.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchTransactions.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchTransactions.rejected]: (state, action) => {
			state.status = STATUS.REJECTED;
			state.data = null;
			state.error = action.payload;
		}
	}
});

export const selectTransactions = (state) => state[transactionsKey];

export default getTransactionsSlice.reducer;