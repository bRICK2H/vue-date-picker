<template>
	<div class="v-day-container"
		:style="setStyleDay"
		:class="[setClassDay, setClassSelectedDay, setClassCurrentDay, setClassOutsideActiveDay]"
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
		year: {
			type: Number,
			required: true
		},
		month: {
			type: Number,
			required: true
		},
		day: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		cellSize: {
			type: Number,
			required: true
		},
		dt_selected: {
			type: Boolean,
			required: true
		},
		dt_current: {
			type: Boolean,
			required: true
		},
		dt_outside_active: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		setStyleDay() {
			return {
				flex: `0 1 calc((100% - ${this.cellSize}px) / 7)`,
				height: `calc((100% - ${this.cellSize}px) / 7)`,
				fontSize: `${(this.cellSize / 3)}px`,
			}
		},
		setClassDay() {
			return `v-day-container--${this.type}`
		},
		setClassSelectedDay() {
			return this.dt_selected
				? `v-day-container--dt_selected`
				: null
		},
		setClassCurrentDay() {
			return this.dt_current
				? `v-day-container--dt_current`
				: null
		},
		setClassOutsideActiveDay() {
			return this.type !== 'curr' && this.dt_outside_active
				? `v-day-container--dt_outside_active`
				: null
		}
	},
	methods: {
		selectDay() {
			if (this.type === 'curr' || this.dt_outside_active) {
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
		border: 2px solid transparent;
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
		&--dt_outside_active {
			opacity: .4;
			cursor: pointer;

			&:hover {
				border: 2px solid rgba(31, 31, 51, .2);
			}
		}
		&--dt_selected {
			font-weight: 700;
			color: #fff;
			background-color: #76768c;

			&:hover {
				background: rgba(118, 118, 140, .8);
				border: 2px solid transparent;
			}
		}
		&--dt_current {
			font-weight: 600;
			border: 2px solid rgba(31, 31, 51, .2);

			&:hover {
				border: 2px solid rgba(31, 31, 51, .1);
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
	}
</style>