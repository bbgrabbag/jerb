export default (state = true, action) => {
    switch (action.type) {
        case "COMPLETE":
            return false;
        default:
            return state;
    }
}

export const loadComplete = () => ({ type: "COMPLETE" });