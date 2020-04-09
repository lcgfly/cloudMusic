<template>
    <div class="welcome">
        <h1>cloud</h1>
        <p>
            本应用仅供学习交流使用
            请勿用于商业及非法用途
        </p>
    </div>
</template>
<script>
import api from "@/api";
export default {
    data() {
        return {};
    },
    created() {
        //验证cookie是否过期，过期需重新登录
        this.getLoginStatus()
        if (sessionStorage.getItem("first") !== null) {
            this.$router.push("/find");
        }
    },
    mounted() {
        this.ifShowWelcome();
    },
    methods: {
        ifShowWelcome() {
            if (sessionStorage.getItem("first") == null) {
                sessionStorage.setItem("first", true);
                setTimeout(() => {
                    this.$router.push("/find");
                }, 3000);
            }
        },
        getLoginStatus() {
            api.getLoginStatus()
                .then(res => {
                    if (res.data.code == 200) {
                        localStorage.setItem("loginState", 1);
                        this.$store.commit("CHECK_LOGIN", 1);
                        console.log("执行了");
                    } else {
                        this.$store.commit("CHECK_LOGIN", 0);
                        localStorage.removeItem("loginState");
                        console.log("过期了");
                    }
                })
                .catch(e => e);
        }
    }
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);

div.welcome {
    width: 100vw;
    height: 100vh;
    position: relative;
}

h1 {
    color: hsla(0, 0%, 0%, 0.9);
    font: normal 70px Varela Round, sans-serif;
    height: 140px;
    top: 50px;
    left: 0;
    letter-spacing: 5px;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    animation: move linear 2000ms infinite alternate;
}
p{
    color: hsla(0,100%,0%,.6);
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    
}

@keyframes move {
    0% {
        text-shadow: 4px -4px 0 hsla(0, 100%, 50%, 1),
            3px -3px 0 hsla(0, 100%, 50%, 1), 2px -2px 0 hsla(0, 100%, 50%, 1),
            1px -1px 0 hsla(0, 100%, 50%, 1), -4px 4px 0 hsla(180, 100%, 50%, 1),
            -3px 3px 0 hsla(180, 100%, 50%, 1),
            -2px 2px 0 hsla(180, 100%, 50%, 1),
            -1px 1px 0 hsla(180, 100%, 50%, 1);
    }
    25% {
        text-shadow: -4px -4px 0 hsla(180, 100%, 50%, 1),
            -3px -3px 0 hsla(180, 100%, 50%, 1),
            -2px -2px 0 hsla(180, 100%, 50%, 1),
            -1px -1px 0 hsla(180, 100%, 50%, 1), 4px 4px 0 hsla(0, 100%, 50%, 1),
            3px 3px 0 hsla(0, 100%, 50%, 1), 2px 2px 0 hsla(0, 100%, 50%, 1),
            1px 1px 0 hsla(0, 100%, 50%, 1);
    }
    50% {
        text-shadow: -4px 4px 0 hsla(0, 100%, 50%, 1),
            -3px 3px 0 hsla(0, 100%, 50%, 1), -2px 2px 0 hsla(0, 100%, 50%, 1),
            -1px 1px 0 hsla(0, 100%, 50%, 1), 4px -4px 0 hsla(180, 100%, 50%, 1),
            3px -3px 0 hsla(180, 100%, 50%, 1),
            2px -2px 0 hsla(180, 100%, 50%, 1),
            1px -1px 0 hsla(180, 100%, 50%, 1);
    }
    75% {
        text-shadow: 4px 4px 0 hsla(180, 100%, 50%, 1),
            3px 3px 0 hsla(180, 100%, 50%, 1), 2px 2px 0 hsla(180, 100%, 50%, 1),
            1px 1px 0 hsla(180, 100%, 50%, 1), -4px -4px 0 hsla(0, 100%, 50%, 1),
            -3px -3px 0 hsla(0, 100%, 50%, 1), -2px -2px 0 hsla(0, 100%, 50%, 1),
            -1px -1px 0 hsla(0, 100%, 50%, 1);
    }
    100% {
        text-shadow: 4px -4px 0 hsla(0, 100%, 50%, 1),
            3px -3px 0 hsla(0, 100%, 50%, 1), 2px -2px 0 hsla(0, 100%, 50%, 1),
            1px -1px 0 hsla(0, 100%, 50%, 1), -4px 4px 0 hsla(180, 100%, 50%, 1),
            -3px 3px 0 hsla(180, 100%, 50%, 1),
            -2px 2px 0 hsla(180, 100%, 50%, 1),
            -1px 1px 0 hsla(180, 100%, 50%, 1);
    }
}
</style>