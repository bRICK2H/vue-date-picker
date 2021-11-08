<template>
	<div class="v-year-box"
		:style="setStyleYear"
		:class="[
			setClassMarked,
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
		'isMarked'
	],
	computed: {
		setStyleYear() {
			return {
				width: `${(this.size * 7) / 3}px`,
				height: `${(this.size * 7) / 4}px`,
				fontSize: `${this.size / 3}px`
			}
		},
		setClassMarked() {
			return this.isMarked
				? 'marked'
				: null
		},
		setClassCurrentYear() {
			return this.option.isCurrent && this.isMarked
				? 'v-year-box--current'
				: null
		},
		setClassSwitchedYear() {
			return this.option.isSwitched && this.isMarked
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
		position: relative;

		&.marked {
			&:hover {
				border: 2px solid rgba(31, 31, 51, .1);
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
		&--switched {
			background: #76768c;
			color: #fff;
			font-weight: 700;

			&.marked {
				&:hover {
					background: rgba(118, 118, 140, .8);
				}
			}
		}
	}
</style>