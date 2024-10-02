import { configureStore,combineReducers } from '@reduxjs/toolkit'
import themeReducer from "./reducers/themeSlice";
import userReducer from "./reducers/userSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const combinedReducers = combineReducers({
    theme: themeReducer,
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version:1
  }

  const persistedReducer = persistReducer(persistConfig,combinedReducers);


  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware({serializableCheck:false})
    }
  });


  export const persistor = persistStore(store);