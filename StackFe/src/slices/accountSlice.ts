import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "@/types";
interface IProps {
  isLoggedIn: boolean;
  user: UserProps | null;
}
const initialState: IProps = {
  isLoggedIn: false,
  user: null
};
const slice = createSlice({
  name: "account-slice",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserProps>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateInfoAction: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    }
  }
});
const { loginAction, logoutAction, updateInfoAction } = slice.actions;
const { reducer } = slice;
export { reducer as accountReducer, loginAction, logoutAction, updateInfoAction };
