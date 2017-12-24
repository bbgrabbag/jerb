let defaultState = {
    isAuthenticated: false,
    user: null,
    token: ""
}

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}