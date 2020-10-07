import { SIGN_IN, SIGN_OUT, RESTORE_USER } from "../actions/user";

//State được lưu trữ
const initalState = {
    currentUser: null,
}

//Các hàm được thực hiện qua type và luôn trả về 1 state mới
const userReducer = (state = initalState, action) => {
    switch (action.type) {

        //Set user when sign in
        case SIGN_IN: {

            //Giữ nguyên các state khác
            //Set user mặc định
            return {
                ...state,
                currentUser: action.payload,
            }

        }
        //Delete user when logout
        case SIGN_OUT: {
            return {
                ...state,
                currentUser: null
            };

        }
        //Restore user
        case RESTORE_USER: {
            return {
                ...state,
                currentUser: action.payload
            };
        }
        default: {
            return state;
        }

    }
}

export default userReducer;