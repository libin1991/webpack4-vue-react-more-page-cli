<template>
	<div>
		<p class="red">{{msg}}</p>
		<Home></Home>
	</div>
</template>

<script>
	import Home from '@/components/Home.vue'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: "Home"
			}
		},
		components: {
			Home
		},
	}
</script>