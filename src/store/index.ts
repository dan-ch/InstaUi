import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import postReducer from './reducers/postReducer';
import authReducer from './reducers/authReducer';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import userReducer from "./reducers/userReducer";

export const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer,
    userReducer: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(store);

export { store, persistor }

export type RootState = ReturnType<typeof rootReducer>;
