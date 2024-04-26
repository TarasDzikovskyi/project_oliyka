import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import mapReducer from './slices/mapSlice';
import problemReducer from './slices/problemSlice';
import nodeReducer from './slices/nodeSlice';
import usersReducer from './slices/usersSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
    map: mapReducer,
    problem: problemReducer,
    node: nodeReducer,
    users: usersReducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);