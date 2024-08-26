<script>
	import { page } from "$app/stores";
</script>

<div class="grid place-content-center min-h-[50vh]">
	<h1 class="font-bold text-3xl">{$page.error?.message}</h1>
	<a href="/" class="text-center link text-sm mt-2">back home</a>
</div>
