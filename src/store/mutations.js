import { CHECK_LOGIN } from "./mutation-types";

export default {
    /**
     * @param {Number} loginType 0:未登录 1:已登录
     */
    [CHECK_LOGIN](state, loginType) {
        state.LOGIN_STATE = loginType
    }
}