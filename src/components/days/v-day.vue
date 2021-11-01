<template>
	<div class="v-day-box"
		:style="setStyleDay"
		:class="[
			setClassDay,
			setClassMarked,
			setClassCurrentDay,
			setClassSelectedDay,
			setClassOutsideDays
		]"
		@click="selectDay"
	>

		<slot>
			<span class="v-day-item">
				{{ option.day }}
			</span>
		</slot>

	</div>
</template>

<script>
export default {
	name: 'VDay',
	props: [
		'size',
		'option',
		'isMarked'
	],
	computed: {
		setStyleDay() {
			return {
				flex: `0 1 calc((100% - ${this.size}px) / 7)`,
				height: `calc((100% - ${this.size}px) / 7)`,
				fontSize: `${(this.size / 3)}px`,
			}
		},
		setClassDay() {
			return `v-day-box--${this.option.type}`
		},
		setClassMarked() {
			return this.isMarked
				? 'marked'
				: null
		},
		setClassSelectedDay() {
			return this.option.isSelected && this.isMarked
				? 'v-day-box--selected'
				: null
		},
		setClassCurrentDay() {
			return this.option.isCurrent && this.isMarked
				? 'v-day-box--current'
				: null
		},
		setClassOutsideDays() {
			const { isOutsideDays } = this.option
	
			return isOutsideDays === false
				? `v-day-box--outside`
				: null
		}
	},
	methods: {
		selectDay() {
			if (this.option.type === 'curr' || this.option.isOutsideDays) {
				this.$emit('select-day')
			}
		}
	}
}
</script>

<style lang="scss">
	.v-day-box {
		position: relative;
		border-radius: 50%;
		border: 2px solid transparent;
		transition: border .3s;
		cursor: pointer;

		&.marked {
			&:hover {
				border: 2px solid rgba(31, 31, 51, .1);
			}
		}

		&--prev,
		&--next {
			opacity: .3;
		}
		&--outside {
			opacity: 0;
			cursor: default;

			&.marked {
				&:hover {
					border: 2px solid rgba(31, 31, 51, .2);
				}
			}
		}
		&--selected {
			font-weight: 700;
			color: #fff;
			background-color: #76768c;

			&.marked {
				&:hover {
					background: rgba(118, 118, 140, .8);
					border: 2px solid transparent;
				}
			}
		}
		&--current {
			font-weight: 600;
			border: 2px solid rgba(31, 31, 51, .2);

			&.marked {
				&:hover {
					border: 2px solid rgba(31, 31, 51, .1);
				}
			}
		}
	}
	.v-day-box,
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