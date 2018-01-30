<template>
	<div class="cartcontrol-wrapper">
		<div class="cartcontrol">
			<transition name="fadeRotate">
				<div class="cart-decrease" v-show="counter>0" v-on:click="decreaseCart()" >
					<span class="icon-remove_circle_outline inner"></span>
				</div>
			</transition>
			<div class="cart-count" v-show="counter>0" >{{counter}}</div>
			<div class="cart-add" v-on:click="addCart()">
				<i class="icon-add_circle"></i>
			</div>
	
		</div>
	</div>
</template>

<script>
export default{
	data() {
	 	return {
    		counter: 0,
  		}
	},
	// props:{
	// 	'item':Object,
	// },
	methods: {
	    addCart: function(){
	      this.counter++;
	      this.notify();
	    },
	    decreaseCart: function(){
	    	if(this.counter) this.counter--;
	      this.notify();
	    },
		notify () {
			// this.$emit('input',this.counter);
			this.$emit('listenToChildEvent','event');
		}
  }
}	
</script>