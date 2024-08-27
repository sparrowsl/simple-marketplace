<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { cart } from "$lib/cart";

	function removeFromCart(id: string) {
		const filteredCart = $cart.filter((item) => item.id !== id);
		$cart = filteredCart;
		// invalidateAll();
	}
</script>

<section class="min-h-96 p-10">
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
