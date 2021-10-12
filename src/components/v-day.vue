<template>
	<div class="v-day-container"
		:style="setStyleCell"
		:class="[setClassCell, setClassActiveCell, setClassCurrendCell, setClassHoverOutsideCell]"
		@click="selectDay"
	>

		<slot>
			<span class="v-day-item">
				{{ day }}
			</span>
		</slot>

	</div>
</template>

<script>
export default {
	name: 'VDay',
	props: {
		day: {
			type: Number,
			required: true
		},
		month: {
			type: Number,
			required: true
		},
		year: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		selected: {
			type: Boolean,
			default: false
		},
		cellSize: {
			type: Number,
			required: true
		},
		isActiveOutsideDays: {
			type: Boolean,
			required: true
		},
		initialDate: {
			type: Object,
			defaul: () => ({})
		},
		selectedDate: {
			type: Object,
			defaul: () => ({})
		},
	},
	computed: {
		setStyleCell() {
			return {
				flex: `0 1 calc((100% - ${this.cellSize}px) / 7)`,
				height: `calc((100% - ${this.cellSize}px) / 7)`,
				fontSize: `${(this.cellSize / 3)}px`,
			}
		},
		setClassCell() {
			return `v-day-container--${this.type}`
		},
		setClassActiveCell() {
			const { year, month, day } = this.selectedDate
			return this.year === year && this.month === month && this.day === day
				? `v-day-container--active`
				: null
		},
		setClassCurrendCell() {
			const { year, month, day } = this.initialDate
			return this.year === year && this.month === month && this.day === day
				? `v-day-container--current-dt`
				: null
		},
		setClassHoverOutsideCell() {
			return this.type !== 'curr' && this.isActiveOutsideDays
				? `v-day-container--hover-outside`
				: null
		}
	},
	methods: {
		selectDay() {
			if (this.type === 'curr' || this.isActiveOutsideDays) {
				this.$emit('select-day')
			}
		}
	}
}
</script>

<style lang="scss">
	.v-day-container {
		position: relative;
		border-radius: 50%;
		border: 2.5px solid transparent;
		transition: .2s;

		&--prev,
		&--next {
			opacity: .2;
		}
		&--curr {
			cursor: pointer;
			background-color: #fff;

			&:hover {
				border: 2px solid rgba(31, 31, 51, .1);
			}
		}
		&--hover-outside {
			opacity: .4;
			cursor: pointer;

			&:hover {
				border: 2px solid rgba(31, 31, 51, .2);
			}
		}
		&--active {
			font-weight: 700;
			color: #fff;
			background-color: #76768c;

			&:hover {
				background: rgba(118, 118, 140, .8);
				border: 2.5px solid transparent;
			}
		}
		&--current-dt {
			border: 2.5px solid rgba(31, 31, 51, .2);

			&:hover {
				border: 2.5px solid rgba(31, 31, 51, .1);
			}
		}
	}
	.v-day-container,
	.v-day-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.v-day-item {
		width: 100%;
		height: 100%;
		line-height: 0;
	}
</style>