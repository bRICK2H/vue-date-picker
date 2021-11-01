<template>
	<div class="v-year-box"
		:style="setStyleYear"
		:class="[
			setClassInteractive,
			setClassOutsideYear,
			setClassCurrentYear,
			setClassSwitchedYear,
		]"
		@click="$emit('switch-year')"
	>
		
		<slot>
			<span class="v-year-item">
				{{ option.year }}
			</span>
		</slot>

	</div>
</template>

<script>
export default {
	name: 'VYear',
	props: [
		'size',
		'option',
		'interactiveStyles'
	],
	computed: {
		setStyleYear() {
			return {
				width: `${(this.size * 7) / 3}px`,
				height: `${(this.size * 7) / 4}px`,
				fontSize: `${this.size / 3}px`
			}
		},
		setClassInteractive() {
			return this.interactiveStyles
				? 'interactive'
				: null
		},
		setClassOutsideYear() {
			return this.option.isOutside
				? 'v-year-box--outside'
				: null
		},
		setClassCurrentYear() {
			return this.option.isCurrent && this.interactiveStyles
				? 'v-year-box--current'
				: null
		},
		setClassSwitchedYear() {
			return this.option.isSwitched && this.interactiveStyles
				? 'v-year-box--switched'
				: null
		},
	},
}
</script>

<style lang="scss">
	.v-year-box {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border: 2px solid transparent;
		border-radius: 12px;
		color: #1f1f33;
		font-weight: 400;
		cursor: pointer;
		transition: .2s;
		position: relative;

		&.interactive {
			&:hover {
				border: 2px solid rgba(31, 31, 51, .1);
			}
		}

		&--outside {
			opacity: .5;
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
		&--switched {
			background: #76768c;
			color: #fff;
			font-weight: 700;

			&.interactive {
				&:hover {
					background: rgba(118, 118, 140, .8);
				}
			}
		}
	}
</style>