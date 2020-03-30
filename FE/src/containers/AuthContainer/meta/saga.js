import { all, takeLatest, put, select, call } from 'redux-saga/effects';
import * as constants from "./constants";
import * as actions from "./actions";
import network from 'utils/network';
import { getEndpointURL } from 'utils/endpoint';
import { saveDataToStorage } from 'utils/cookies';
import makeSelectLoginPage from "../../LoginPage/meta/selectors";

function* handleGetAuth() {
    try {
        const loginPage = yield select(makeSelectLoginPage());
        const request = { username: loginPage.username, password: loginPage.password };
        const action = getEndpointURL('AUTHENTICATE');
        const response = yield call(network.postData, action, request);
        yield call(saveDataToStorage, response);
        yield put(actions.getAuthSuccess(response))
    } catch(error) {
        yield put(actions.getAuthError(error))
    }
}

export default function*() {
    yield all([
        yield takeLatest(constants.GET_AUTH, handleGetAuth),
    ]);
}