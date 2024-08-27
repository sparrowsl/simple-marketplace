<script>
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { toast } from "svelte-sonner";
</script>

<section>
	<div class="p-10 shadow-xl max-w-2xl mx-auto">
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					toast.success(String(result.data?.message));
					goto("/");
				};
			}}
		>
			<legend class="font-bold text-xl text-center">
				Checkout - Shipping Information
			</legend>
			<!-- Shipping Information -->
			<fieldset class="grid gap-5">
				<label class="flex items-center gap-2">
					<span class="label-text">Full Name</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter your full name"
						required
					/>
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">Address</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter your address"
						required
					/>
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">City</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter your city"
						required
					/>
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">Zip Code:</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter your zip code"
						required
					/>
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">Country:</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter your country"
						required
					/>
				</label>
			</fieldset>

			<!-- Payment Information -->
			<fieldset class="grid gap-5 mt-5">
				<label class="flex items-center gap-2">
					<span class="label-text">Name on Card:</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter name on card"
						required
					/>
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">Card Number:</span>
					<input
						type="text"
						class="input input-bordered grow"
						placeholder="Enter card number"
						required
					/>
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">Expiry Date:</span>
					<input type="date" class="input input-bordered grow" required />
				</label>

				<label class="flex items-center gap-2">
					<span class="label-text">CVV:</span>
					<input
						type="date"
						class="input input-bordered grow"
						placeholder="Enter CVV"
						minlength="3"
						maxlength="3"
						title="invalid CVV number"
						required
					/>
				</label>
			</fieldset>

			<!-- Submit Button -->
			<button type="submit" class="btn btn-accent mt-5">Submit Payment</button>
		</form>
	</div>
</section>
