import store from "../store";

export const fetch_post = () => {
  return {
    type: "FETCH_USER"
  };
};
export const receive_post = post => {
  return {
    type: "FETCHED_USER",
    data: post
  };
};
export const receive_error = () => {
  return {
    type: "RECEIVE_ERROR"
  };
};

export const thunk_action_creator = username => {
  const user = username.replace(/\s/g, "");
  store.dispatch(fetch_post());
  // thunk함수가 리턴하는 함수
  // 인자로 dispatch, getState를 받아서 활용할수있다
  return function(dispatch, getState) {
    console.log("disfet :", dispatch);
    return fetch(`https://api.github.com/users/${user}`)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else dispatch(receive_post(data));
      })
      .catch(err => {
        console.log("err :", err);
        dispatch(receive_error());
      });
  };
};
