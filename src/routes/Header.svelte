<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { cart } from "$lib/cart";
	import Icon from "@iconify/svelte";
</script>

<header class="sticky top-0 bg-white shadow py-3 z-30">
	<div class="navbar bg-base-100 container mx-auto">
		<div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl">SM</a>
		</div>

		<div class="navbar-end gap-5">
			<a href="/">Home</a>
			{#if $page.data.user}
				<a href="/products/new" class="btn btn-sm btn-success">Add Product</a>

				<div class="flex-none">
					<div class="dropdown dropdown-end">
						<div class="btn btn-ghost btn-circle">
							<a class="indicator" href="/cart">
								<Icon icon="mdi:cart" class="text-lg" />
								<span class="badge badge-sm indicator-item">
									{$cart?.length || 0}
								</span>
							</a>
						</div>
					</div>
					<div class="dropdown dropdown-end">
						<div class="btn btn-ghost btn-circle avatar">
							<div class="w-10 rounded-full">
								<img
									alt={$page.data.user?.name}
									src="https://robohash.org/{$page.data.user?.email}"
								/>
							</div>
						</div>
					</div>
				</div>

				<form
					action="/?/logout"
					method="post"
					class="btn btn-sm btn-error"
					use:enhance
				>
					<button type="submit">logout</button>
				</form>
			{:else}
				<a href="/login" class="btn btn-sm">Login</a>
				<a href="/signup" class="btn btn-sm">Signup</a>
			{/if}
		</div>
	</div>
</header>
