import { axios } from "./index";

let defaultState = {
    data: [],
    filterBy: (post, i) => {
        return post;
    },
    sortBy: (post1, post2, i) => {
        let first = new Date(post1.createdAt).getTime();
        let sec = new Date(post2.createdAt).getTime();
        return sec - first;
    }
}

export default (state = defaultState, action) => {
    let newData = [...state.data];
    switch (action.type) {
        case "LOAD_DATA":
            return {
                ...state,
                data: action.data,
            }
        case "REMOVE_POSTING":
            return {
                ...state,
                data: newData.filter((post) => {
                    return post._id !== action.id
                })
            }
        case "UPDATE_POSTING":
            return {
                ...state,
                data: newData.map((post) => {
                    console.log(action.updatedPost)
                    return post._id === action.updatedPost._id ?
                        action.updatedPost :
                        post;
                })
            }
        default:
            return state;
    }
}

const postingUrl = "http://localhost:8080/api/postings/"

export const loadData = () => {
    return dispatch => {
        axios.get(postingUrl)
            .then((response) => {
                dispatch({
                    type: "LOAD_DATA",
                    data: response.data.postings
                });
            })
            .catch((err) => {
                console.error(err);
            })
    }
}

export const submitPosting = (info, history) => {
    return dispatch => {
        axios.post(postingUrl, info)
            .then((response) => {
                history.push("/view-posts");
            })
            .catch((err) => {
                console.error(err);
            })
    }
}
export const removePosting = id => {
    return dispatch => {
        axios.delete(postingUrl + id)
            .then((response) => {
                dispatch({
                    type: "REMOVE_POSTING",
                    id: response.data.id
                });
            })
            .catch((err) => {
                console.error(err);
            })
    }
}
export const updatePosting = (info, id) => {
    return dispatch => {
        axios.put(postingUrl + id, info)
            .then((response) => {
                console.log(response);
                dispatch({
                    type: "UPDATE_POSTING",
                    updatedPost: response.data.post
                })
            })
            .catch((err) => {
                console.error(err);
            });
    }
}