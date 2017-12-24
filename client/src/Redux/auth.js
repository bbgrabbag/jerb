import { axios } from "./index";
import { loadComplete } from "./loading";

let defaultState = {
    isAuthenticated: false,
    user: null,
    errMsg: {
        signup: "",
        login: ""
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case "AUTHORIZE":
            return {
                isAuthenticated: action.success,
                user: action.user,
                errMsg: {
                    ...defaultState.errMsg
                }
            }
        case "HANDLE_ERR":
            let errMsg = { ...state.errMsg };
            errMsg[action.form] = action.errMsg
            return {
                isAuthenticated: false,
                user: null,
                errMsg
            }
        default:
            return state;
    }
}

const profileUrl = "http://localhost:8080/api/profile/";
const authUrl = "http://localhost:8080/api/auth/"

function authorize(success, user) {
    return {
        type: "AUTHORIZE",
        success,
        user
    }
}
function handleErr(errMsg, form) {
    return {
        type: "HANDLE_ERR",
        errMsg,
        form
    }
}

export const verify = () => {
    return dispatch => {
        axios.get(profileUrl)
            .then((response) => {
                let { success, user } = response.data;
                dispatch(authorize(success, user))
                dispatch(loadComplete());
            })
            .catch((err) => {
                console.error(err);
                dispatch(loadComplete());
            })
    }
}

export const signup = (credentials, history) => {
    return dispatch => {
        axios.post(authUrl + "signup", credentials)
            .then((response) => {
                let { success, user, token } = response.data;
                localStorage.setItem("token", token);
                dispatch(authorize(success, user));
                history.push("/profile-page");
            })
            .catch((err) => {
                console.error(err);
                let msg = "That user already exists!";
                dispatch(handleErr(msg, "signup"));
            });
    }
}
export const login = (credentials, history) => {
    return dispatch => {
        axios.post(authUrl + "login", credentials)
            .then((response) => {
                let { success, user, token } = response.data;
                localStorage.setItem("token", token);
                dispatch(authorize(success, user));
                history.push("/profile-page");
            })
            .catch((err) => {
                console.error(err);
                let msg = "Invalid username or password!";
                dispatch(handleErr(msg, "login"));
            });
    }
}


