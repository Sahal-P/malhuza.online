import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"

export const makeStore = () =>
    configureStore({
        reducer: {
            auth: authReducer
        },
        middleware: getDefaultMiddleware,
        devTools: true
    })

export type Appstore = ReturnType<typeof makeStore>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']