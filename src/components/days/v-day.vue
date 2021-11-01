<template>
	<div class="v-day-box"
		:style="setStyleDay"
		:class="[
			setClassDay,
			setClassInteractive,
			setClassCurrentDay,
			setClassSelectedDay,
			setClassOutsideActiveDay
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
		'interactiveStyles'
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
		setClassInteractive() {
			return this.interactiveStyles
				? 'interactive'
				: null
		},
		setClassSelectedDay() {
			return this.option.isSelected && this.interactiveStyles
				? `v-day-box--selected`
				: null
		},
		setClassCurrentDay() {
			return this.option.isCurrent && this.interactiveStyles
				? `v-day-box--current`
				: null
		},
		setClassOutsideActiveDay() {
			return this.option.outsideActive
				? `v-day-box--outside`
				: null
		}
	},
	methods: {
		selectDay() {
			if (this.option.type === 'curr' || this.option.outsideActive) {
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
		// transition: .2s;

		&--prev,
		&--next {
			opacity: .2;
		}
		&--curr {
			cursor: pointer;
			background-color: #fff;

			&.interactive {
				&:hover {
					border: 2px solid rgba(31, 31, 51, .1);
				}
			}
		}
		&--outside {
			opacity: .4;
			cursor: pointer;

			&.interactive {
				&:hover {
					border: 2px solid rgba(31, 31, 51, .2);
				}
			}
		}
		&--selected {
			font-weight: 700;
			color: #fff;
			background-color: #76768c;

			&.interactive {
				&:hover {
					background: rgba(118, 118, 140, .8);
					border: 2px solid transparent;
				}
			}
		}
		&--current {
			font-weight: 600;
			border: 2px solid rgba(31, 31, 51, .2);

			&.interactive {
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