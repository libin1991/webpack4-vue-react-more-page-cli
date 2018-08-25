<template>
	<div class="clock" :class="className">
		{{setTime(h)}}: {{setTime(m)}}: {{setTime(s)}}
		<div class="test" @click="test">AA</div>
	</div>
</template>

<script>
	export default {
		name: 'clock',
		data() {
			return {
				h: 0,
				m: 0,
				s: 0
			}
		},
		props: ['className'],
		mounted() {
			this.clock();
			setInterval(() => {
				this.clock();
				//console.log("时间")
			}, 1000);
		},
		methods: {
			setTime(num) {
				return num < 10 ? ("0" + num) : num;
			},
			clock() {
				var oDate = new Date();
				this.h = oDate.getHours();
				this.m = oDate.getMinutes();
				this.s = oDate.getSeconds();
			},
			async test() {
				this.f().then((data)=>{
					console.log(data)
				}).catch(e => console.log(e))
//				import("@/importTest").then(async(
//					data
//				) => {
//					await this.testA()
//					console.log(data.add)
//					console.log(data.add(10, 8))
//				})
			},
			fetchUser() {
				return new Promise((resolve, reject) => {
					setTimeout(() => resolve('done!'), 1000)
				});
			},
			getNum() {
				return 123;
			},
			async testA() {
				let result = await this.fetchUser() // 直到promise返回一个resolve值（*）
				console.log(typeof result)
				console.log(result.then) // 'done!' 
			},
			async f() {
				//return await 123456;
				await Promise.reject('出错了');
			}
		}
	}
</script>

<style scoped>
	.clock {
		display: inline-block;
		font-size: 14px;
	}
</style>