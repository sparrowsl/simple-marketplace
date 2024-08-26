<script lang="ts">
	import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<section class="min-h-[90vh]">
	<figure>
		<img
			src="data:image/webp;base64,{data.product.image}"
			alt={data.product.title}
			class="w-full max-h-60 object-cover"
			loading="lazy"
		/>
	</figure>
</section>
