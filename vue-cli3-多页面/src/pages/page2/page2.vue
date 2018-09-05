<template>
	<div>
		<p class="red">{{msg}}</p>
		<dataNull></dataNull>
	</div>
</template>

<script>
	import dataNull from '@/components/Home.vue'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: "page451111"
			}
		},
		components: {
			dataNull
		},
	}
</script>