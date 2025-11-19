// third-party
import { accountReducer, loadingReducer } from "@/slices";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
// project imports

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    account: accountReducer
  }
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();
export { store, useAppDispatch, useAppSelector };
