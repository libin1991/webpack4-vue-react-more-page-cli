<template>
  <div class="about">
    <h1>This is an about page</h1>
    <wb-clock/>
  <!--  <wb-Banner :bannerlist="bannerlist"></wb-Banner>-->
   <wb-haha></wb-haha>
  </div>
</template>
<script>
 	export default {
		name: 'about',
 		data() {
			return {
				msg: '123',
				bannerlist: [{
					linkurl: "https://gw.alicdn.com/tfs/TB1dN9fX3MPMeJjy1XcXXXpppXa-1280-520.jpg_720x720Q30.jpg",
					picurl: "https://gw.alicdn.com/tfs/TB1dN9fX3MPMeJjy1XcXXXpppXa-1280-520.jpg_720x720Q30.jpg"
				}, {
					linkurl: "https://gw.alicdn.com/tfs/TB118acQFXXXXcKXpXXXXXXXXXX-1280-520.jpg_720x720Q30.jpg",
					picurl: "https://gw.alicdn.com/tfs/TB118acQFXXXXcKXpXXXXXXXXXX-1280-520.jpg_720x720Q30.jpg"
				}]
			}
		}
	}
</script>