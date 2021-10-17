<template>
	<div class="v-month-box"
		:style="setStyleMonth"
		:class="[
			setClassOutsideMonth,
			setClassCurrentMonth,
			setClassSwitchedMonth,
		]"
		@click="$emit('select-month')"
	>
		
		<slot>
			<span class="v-month-item">
				{{ month.name }}
			</span>
		</slot>

	</div>
</template>

<script>
export default {
	name: 'VMonth',
	props: {
		month: {
			type: Object,
			required: true
		},
		size: {
			type: Number,
			required: true
		},
	},
	computed: {
		setStyleMonth() {
			return {
				width: `${(this.size * 7) / 3}px`,
				height: `${(this.size * 7) / 4}px`,
				fontSize: `${this.size / 3}px`
			}
		},
		setClassOutsideMonth() {
			return this.month.is_outside
				? 'v-month-box--outside'
				: null
		},
		setClassCurrentMonth() {
			return this.month.is_current
				? 'v-month-box--current'
				: null
		},
		setClassSwitchedMonth() {
			return this.month.is_switched
				? 'v-month-box--switched'
				: null
		},
	},
}
</script>

<style lang="scss">
	.v-month-box {
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

		&:hover {
			border: 2px solid rgba(31, 31, 51, .1);
		}

		&--outside {
			opacity: .5;
		}
		&--current {
			font-weight: 600;
			border: 2px solid rgba(31, 31, 51, .2);

			&:hover {
				border: 2px solid rgba(31, 31, 51, .1);
			}
		}
		&--switched {
			background: #76768c;
			color: #fff;
			font-weight: 700;

			&:hover {
				background: rgba(118, 118, 140, .8);
			}
		}
	}
</style>