interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostState {
  posts: Post[];
}

interface Action {
  type: string;
  payload?: Post[];
}

const initialState: PostState = {
  posts: []
};

const postReducer = (state: PostState = initialState, action: Action): PostState => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload || [] 
      };
    default:
      return state;
  }
};

export default postReducer;
