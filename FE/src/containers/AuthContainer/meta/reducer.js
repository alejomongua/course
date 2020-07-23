import produce from 'immer';
import * as constants from "./constants";
import { getDataFromStorage } from 'utils/cookies'

const { token, user } = getDataFromStorage()

const getUser = userString => userString && JSON.parse(userString)

export const initialState = {
    token,
    user: getUser(user),
    isAuthenticated: !!token
};

/* eslint-disable no-param-reassign */
const Auth = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case constants.GET_AUTH_SUCCESS:
                draft.token = action.payload.token
                draft.user = action.payload.user
                draft.isAuthenticated = true
                break;
            case constants.GET_AUTH_ERROR:
                delete draft.token
                delete draft.user
                draft.isAuthenticated = false
                break;
            case constants.LOGOUT:
                break;
            default:
                break;
        }
    });

export default Auth;
