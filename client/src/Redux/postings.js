let defaultState = {
    data: [],
    filterBy: (post, i) => {
        return post;
    },
    sortBy: (post1, post2, i) => {
        return 0;
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}