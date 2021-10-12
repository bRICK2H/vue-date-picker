<template>
	<div class="wrapper">

		<VDatePicker
			:value="new Date()"
			:cellSize="36"
			:dt_outside_active="true"
			@input="input"
		>
			<!-- <template v-slot="item">
				<span style="color:pink;font-size: 12px">
					{{ item.day }}
				</span>
			</template> -->

			<!-- <template v-slot="item">
				<span style="color:pink">
					{{ item.month }}
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
	},
	methods: {
		input(val) {
			console.warn('input', val)
		}
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;

	&__v-date-picker-container {
		font-family: 'Inter', sans-serif;
		font-weight: 400;
	}
}
</style>