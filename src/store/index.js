import {configureStore} from "@reduxjs/toolkit";
import createReducer from "./rootReducers";

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducers', () => {
        const newRootReducer = require('./rootReducers').default;
        store.replaceReducer(newRootReducer.createReducer());
    });
}

const middlewares = [];

if (process.env.NODE_ENV === "development") {
    const {logger} = require(`redux-logger`)
    middlewares.push(logger)
}

const store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    'dialog/openDialog',
                    'dialog/closeDialog',
                    'message/showMessage',
                    'message/hideMessage'
                ]
            },
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === "development"
});

store.asyncReducers = {};

export const injectReducers = (key, reducer) => {
    if (store.asyncReducers[key]) {
        return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
}

export default store;