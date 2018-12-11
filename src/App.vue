<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "app",
		watch: {
			$route(to, from) {
				if (!to.matched.length) {
					this.$router.push("/404");
				}
			}
		}
	};
</script>

