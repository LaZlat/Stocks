import { configureStore } from "@reduxjs/toolkit";
import {cryptoApi} from '../services/cryptoAPI';
import {financeApi} from '../services/financeAPI';
import { investNewsApi } from "../services/investNewsAPI";
import { investNewsVideoApi } from "../services/investNewsVideoAPI";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [financeApi.reducerPath]: financeApi.reducer,
        [investNewsApi.reducerPath]: investNewsApi.reducer,
        [investNewsVideoApi.reducerPath]: investNewsVideoApi.reducer,
    },
});