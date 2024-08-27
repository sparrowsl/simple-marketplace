<script lang="ts">
	import { goto } from "$app/navigation";
	import { cart } from "$lib/cart";

	function removeFromCart(id: string) {
		const filteredCart = $cart.filter((item) => item.id !== id);
		$cart = filteredCart;
	}
</script>

<section class="min-h-96 p-10">
	<div class="p-5 flex items-center justify-evenly">
		<p>
			Total Amount: {$cart.reduce((prev, curr) => prev + curr.price, 0)}
		</p>

		<button
			type="button"
			disabled={$cart.length <= 0}
			class="btn btn-sm btn-success"
			on:click={() => goto("/checkout")}
		>
			checkout
		</button>
	</div>

	<h2 class="text-center font-semibold">Cart Items</h2>

	<div class="grid grid-cols-3">
		{#each $cart as item (item.id)}
			<figure class="flex gap-4 items-center shadow-lg p-3 rounded">
				<img
					src="data:image/webp;base64,{item.image}"
					alt={item.title}
					class="max-w-32"
				/>
				<figcaption>
					<h3 class="font-semibold capitalize">{item.title}</h3>
					<p class="text-gray-600">${item.price}</p>

					<button
						type="button"
						class="btn-sm btn-error btn mt-4"
						on:click={() => removeFromCart(String(item.id))}
					>
						remove from cart
					</button>
				</figcaption>
			</figure>
		{:else}
			<p class="italic text-gray-500">cart is empty</p>
		{/each}
	</div>
</section>
