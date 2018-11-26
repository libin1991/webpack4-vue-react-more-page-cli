<template>
    <div class="vue-loading">
        <div class="m-loading m-loading-dark">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
        </div> 
        <span class="t-loading">{{loadMsg||'加载中...'}}</span>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                loadMsg:''
            }
        },
        methods:{
            
        }
    }
</script>

<style lang="less" scoped="scoped">
.vue-loading {
    margin:10px 0;
}
.m-loading {
  font-size: 1rem;
  position: relative;
  display: inline-block;
  width: 2.3125em;
  height: 2.3125em;
}
.m-loading span {
position: absolute;
will-change: background-color;
left: 1.10938em;
bottom: 0;
width: 0.09375em;
height: 0.5em;
border-radius: 0.25em;
background-color: transparent;
-webkit-transform-origin: center -0.65625em;
        transform-origin: center -0.65625em;
-webkit-backface-visibility: hidden; }
.m-loading span:nth-child(1) {
-webkit-animation-delay: 0s;
        animation-delay: 0s;
-webkit-transform: rotate(0deg);
        transform: rotate(0deg); }
.m-loading span:nth-child(2) {
-webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
-webkit-transform: rotate(30deg);
        transform: rotate(30deg); }
.m-loading span:nth-child(3) {
-webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
-webkit-transform: rotate(60deg);
        transform: rotate(60deg); }
.m-loading span:nth-child(4) {
-webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
-webkit-transform: rotate(90deg);
        transform: rotate(90deg); }
.m-loading span:nth-child(5) {
-webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
-webkit-transform: rotate(120deg);
        transform: rotate(120deg); }
.m-loading span:nth-child(6) {
-webkit-animation-delay: 0.5s;
        animation-delay: 0.5s;
-webkit-transform: rotate(150deg);
        transform: rotate(150deg); }
.m-loading span:nth-child(7) {
-webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
-webkit-transform: rotate(180deg);
        transform: rotate(180deg); }
.m-loading span:nth-child(8) {
-webkit-animation-delay: 0.7s;
        animation-delay: 0.7s;
-webkit-transform: rotate(210deg);
        transform: rotate(210deg); }
.m-loading span:nth-child(9) {
-webkit-animation-delay: 0.8s;
        animation-delay: 0.8s;
-webkit-transform: rotate(240deg);
        transform: rotate(240deg); }
.m-loading span:nth-child(10) {
-webkit-animation-delay: 0.9s;
        animation-delay: 0.9s;
-webkit-transform: rotate(270deg);
        transform: rotate(270deg); }
.m-loading span:nth-child(11) {
-webkit-animation-delay: 1s;
        animation-delay: 1s;
-webkit-transform: rotate(300deg);
        transform: rotate(300deg); }
.m-loading span:nth-child(12) {
-webkit-animation-delay: 1.1s;
        animation-delay: 1.1s;
-webkit-transform: rotate(330deg);
        transform: rotate(330deg); }
.m-loading-dark span {
-webkit-animation: loading-fade-dark 1.1s infinite linear;
        animation: loading-fade-dark 1.1s infinite linear; }

@-webkit-keyframes loading-fade-dark {
0% {
background-color: #5c5c5c; }
100% {
background-color: rgba(255, 255, 255, 0); } }

@keyframes loading-fade-dark {
0% {
background-color: #5c5c5c; }
100% {
background-color: rgba(255, 255, 255, 0); } }

.m-loading-light span {
-webkit-animation: loading-fade-light 1.1s infinite linear;
        animation: loading-fade-light 1.1s infinite linear; }

@-webkit-keyframes loading-fade-light {
0% {
background-color: #fff; }
100% {
background-color: rgba(255, 255, 255, 0); } }

@keyframes loading-fade-light {
0% {
background-color: #fff; }
100% {
background-color: rgba(255, 255, 255, 0); } }
.t-loading {
    vertical-align: top;
    line-height: 2.3125em;
    display: inline-block;
    height: 2.3125em;
    padding-left:10px;
}
</style>