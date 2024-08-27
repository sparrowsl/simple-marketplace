<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

{#if data.products}
	<section class="min-h-[80vh] grid gap-7 grid-cols-4 py-10">
		{#each data.products as product (product.id)}
			<figure class="shadow-xl h-fit">
				<img
					src="data:image/webp;base64,{product.image}"
					alt={product.title}
					class="w-full max-h-60 object-cover"
					loading="lazy"
				/>
				<figcaption class="p-2">
					<h3 class="text-sm flex items-center gap-2">
						<Icon icon="pajamas:title" />
						{product.title}
					</h3>
					<p class="flex items-center gap-1 mt-2">
						<Icon icon="mdi:attach-money" /><span class="text-xs">SLE</span>
						{product.price}
					</p>

					<a
						class="block w-fit border text-sm px-4 rounded-full bg-teal-500 text-white !ml-auto"
						href="/products/{product.id}"
					>
						view &rightarrow;
					</a>
				</figcaption>
			</figure>
		{/each}
	</section>
{:else}
	<div class="py-10">
		<p class="text-gray-500 italic">No products has been posted for sale...</p>
	</div>
{/if}
