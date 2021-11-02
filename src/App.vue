<template>
	<div class="wrapper">

		<VDatePicker
			:value="new Date()"
			:cellSize="50"
			:isMarked="false"
			:isOutsideDays="true"
			@input="input"
		>
			<!-- <template v-slot="item">
				<span style="color:pink;font-size: 12px;border: 1px solid blue">
					{{ item.day }}

					<span class="item"></span>
				</span>
			</template> -->

			<!-- <template v-slot="item">
				<span style="color:pink;">
					{{ item.name }}
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
.item {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 5px;
	height: 5px;
	background: red;
	border-radius: 50%;
}
</style>