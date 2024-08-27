<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { PageServerData } from "./$types";
	import { cart } from "$lib/cart";
	import { invalidateAll } from "$app/navigation";

	export let data: PageServerData;

	function inCart(id: string) {
		const found = $cart.find((item) => item.id === id);

		if (found) {
			return true;
		}
		return false;
	}
</script>

<article class="rounded bg-white/30 max-w-3xl p-2 py-10">
	<h2 class="font-semibold text-xl mb-5 text-gray-700 text-center">
		Product Details
	</h2>

	<section class="">
		<figure class="card card-side bg-base-100 shadow">
			<img
				src="data:image/webp;base64,{data.product.image}"
				alt={data.product.title}
				loading="lazy"
				class="min-w-[20rem] h-[20rem] object-cover bg-center"
			/>
			<figcaption class="card-body">
				<h4 class="card-title">
					{data.product?.title}
				</h4>
				<span class="flex items-center mt-2">
					{#each { length: data.product.rating || 5 } as _}
						<Icon class="text-yellow-400 text-lg" icon="mdi:star" />
					{/each}
				</span>

				<p class="flex-grow-0">
					<span class="font-semibold">Price: </span>
					<span class="text-xs">SLE </span>
					{data.product?.price}
				</p>

				<p class="flex-grow-0 text-gray-600 whitespace-pre-wrap">
					{data.product?.description}
				</p>

				{#if data.user}
					<div class="card-actions justify-end mt-auto">
						<button
							class="btn btn-primary"
							disabled={inCart(data.product.id)}
							on:click={() => {
								$cart = [...$cart, data.product];
								invalidateAll();
							}}
						>
							{inCart(data.product.id) ? "Already in cart" : "Add to cart"}
						</button>
					</div>
				{/if}
			</figcaption>
		</figure>
	</section>
</article>
