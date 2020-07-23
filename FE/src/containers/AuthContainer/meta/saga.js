import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import * as constants from "./constants";
import * as actions from "./actions";
import networkService from "utils/network";
import { getEndpointURL } from "utils/endpoint";
import makeSelectLoginPage from '../../LoginPage/meta/selectors'
import { saveDataToStorage, clearDataFromStorage } from 'utils/cookies'

function* handleGetAuth() {
    try {
        const loginPage = yield select(makeSelectLoginPage())
        const request = {
            username: loginPage.username,
            password: loginPage.password,
        }
        const action = getEndpointURL('AUTHENTICATE')
        const res = yield call(networkService.postData, action, request);
        yield call(saveDataToStorage, res)
        yield put(actions.getAuthSuccess(res))
    } catch(error) {
        yield put(actions.getAuthError(error))
    }
}

function* handleLogout() {
    yield call(clearDataFromStorage)
}

export default function*() {
    yield all([
        yield takeLatest(constants.GET_AUTH, handleGetAuth),
        yield takeLatest(constants.LOGOUT, handleLogout),
    ]);
}
