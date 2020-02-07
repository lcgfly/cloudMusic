<template>
    <div class="login-bg">
        <van-field
            class="login-input"
            type="tel"
            v-model="value"
            placeholder="请输入手机号"
            label="账号"
            maxlength="11"
            :error-message="errorMessage"
            v-show="!next"
        />
        <van-button type="default" round @click="toNextStep" v-show="!next">下一步</van-button>
        <van-field
            class="login-input"
            type="password"
            v-model="password"
            placeholder="请输入密码"
            label="密码"
            :error-message="errorMessage"
            v-show="next"
        />
        <van-button type="default" round @click="login" v-show="next" :loading="loading">确认</van-button>
    </div>
</template>
<script>
import api from "@/api";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            value: "",
            password: "",
            errorMessage: "",
            next: false,
            loading: false
        };
    },
    mounted() {},
    methods: {
        validator(val) {
            return /^\d{11}$/.test(val);
        },
        toNextStep() {
            if (this.validator(this.value)) {
                this.next = true;
            } else {
                this.errorMessage = "看不懂中文？输入数字！";
            }
        },
        login() {
            if (this.password == "") {
                this.errorMessage = "我又不是瞎子，密码不能为空";
                return;
            }
            this.errorMessage = "";
            this.loading = true;
            api.loginByPhone(this.value, this.password).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    localStorage.setItem('avatarUrl',res.data.profile.avatarUrl)    //登录成功，本地存储用户名，用户头像，登录状态
                    localStorage.setItem('nickname',res.data.profile.nickname)
                    localStorage.setItem('loginState',1)
                    this.CHECK_LOGIN(1);
                    this.loading = false;
                    this.$router.push("/find");
                    console.log(this.$store.state.LOGIN_STATE)
                } else {
                    this.errorMessage = "账号或密码错误";
                    this.loading = false;
                }
            }).catch(e=>console.log(e));
        },
        ...mapMutations([
            "CHECK_LOGIN"
            ])
              
    }
};
</script>
<style lang="less">
.login-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(to right, #e52d27, #b31217);
    .login-input {
        width: 50vw;
        margin: 50px auto;
        border-radius: 5px;
    }
}
</style>
