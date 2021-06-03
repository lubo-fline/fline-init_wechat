<template>
    <view class="index">
        <view class="index">
            <AtNoticebar marquee> 欢迎使用 Taro UI Vue </AtNoticebar>
            <AtButton type="primary" :on-click="handleClick">
                AtButton
            </AtButton>
            <AtToast
                :is-opened="show"
                :text="msg"
                :on-close="handleClose"
            ></AtToast>
        </view>
    </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtButton, AtToast, AtNoticebar } from "taro-ui-vue";
import "./index.less";
export default {
    components: {
        AtButton,
        AtToast,
        AtNoticebar,
    },
    data() {
        return {
            msg: "Hello world!",
            show: false,
        };
    },
    mounted(){
        this.getData()
    },
    methods: {
        handleClick() {
            this.show = true;
        },
        handleClose() {
            this.show = false;
        },
        async getData(){
            let datas = await this.$http.get(this.$api.login,{username:'admin',password:'admin'})
            console.log(datas)
        }
    },
};
</script>
