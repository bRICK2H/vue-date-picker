<template>
	<div class="wrapper">

		<VDatePicker
			:date="new Date()"
			:cellSize="36"
		>
			<!-- <template v-slot:item="item">
				<span style="color:red">
					{{ item.day }}
				</span>
			</template> -->
		</VDatePicker>
		
	</div>
</template>

<script>
import VDatePicker from './components/v-date-picker.vue'

export default {
	name: 'VDatePickerWrapper',
	components: {
		VDatePicker
	}
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
}
</style>