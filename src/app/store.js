import { configureStore } from "@reduxjs/toolkit";
import {cryptoApi} from '../services/cryptoAPI';
import {financeApi} from '../services/financeAPI';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [financeApi.reducerPath]: financeApi.reducer,
    },
});