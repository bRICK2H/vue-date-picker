<template>
	<div class="v-year-container"
		:class="[setClassSelectedYear, setClassCurrentYear]"
		:style="setStyleYear"
		@click="$emit('select-year')"
	>
		
		<slot>
			<span class="v-year-item">
				{{ month }}
			</span>
		</slot>

	</div>
</template>

<script>
export default {
	name: 'VYear',
	props: {
		currMonth: {
			type: Number,
			required: true
		},
		currYear: {
			type: Number,
			require: true
		},
		selectedDate: {
			type: Object,
			defaul: () => ({})
		},
		initialDate: {
			type: Object,
			defaul: () => ({})
		},
		monthId: {
			type: Number,
			required: true
		},
		month: {
			type: String,
			required: true
		},
		cellSize: {
			type: Number,
			required: true
		},
	},
	computed: {
		setStyleYear() {
			return {
				width: `${(this.cellSize * 7) / 3}px`,
				height: `${(this.cellSize * 7) / 4}px`,
				fontSize: `${this.cellSize / 3}px`
			}
		},
		setClassSelectedYear() {
			const { year } = this.selectedDate
			return year === this.currYear && this.currMonth === this.monthId
				? 'v-year-container--mn_selected'
				: null
		},
		setClassCurrentYear() {
			const { year, month } = this.initialDate
			return year === this.currYear && month === this.monthId
				? 'v-year-container--mn_current'
				: null
		}
	}
}
</script>

<style lang="scss">
	.v-year-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border: 2.5px solid transparent;
		border-radius: 12px;
		color: #1f1f33;
		font-weight: 400;
		cursor: pointer;
		transition: .2s;

		&:hover {
			border: 2px solid rgba(31, 31, 51, .1);
		}
		&--mn_selected {
			background: #76768c;
			color: #fff;
			font-weight: 700;

			&:hover {
				background: rgba(118, 118, 140, .8);
			}
		}
		&--mn_current {
			border: 2.5px solid rgba(31, 31, 51, .2);

			&:hover {
				border: 2.5px solid rgba(31, 31, 51, .1);
			}
		}
		
	}
</style>