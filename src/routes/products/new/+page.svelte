<script lang="ts">
	import { enhance, applyAction } from "$app/forms";
	import Icon from "@iconify/svelte";
	import { toast } from "svelte-sonner";

	let loading = false;
	let image: string;

	const previewImage = (file: File) => {
		if (file.size > 0) {
			image = URL.createObjectURL(file);

			setTimeout(() => URL.revokeObjectURL(image), 200);
		}
	};
</script>

<section class="min-h-[50vh] max-w-4xl mx-auto">
	<div class="flex items-center gap-5">
		<form
			method="post"
			class="flex-1 shadow-xl p-14 rounded"
			enctype="multipart/form-data"
			use:enhance={() => {
				loading = true;

				return async ({ result }) => {
					if (result.type === "failure") {
						toast.error(String(result.data?.message));
					} else {
						await applyAction(result);
					}

					loading = false;
				};
			}}
		>
			<legend class="font-bold text-xl text-center">Upload Product</legend>

			<fieldset class="grid gap-5">
				<div class="form-control w-full mt-5">
					<input
						type="file"
						accept="image/*"
						class="file-input file-input-bordered"
						name="image"
						required
						on:change={(e) => previewImage(e.target?.files[0])}
					/>
				</div>

				<div class="form-control w-full">
					<span class="label label-text">Title</span>
					<label class="input input-bordered flex items-center gap-2">
						<Icon icon="mdi:pencil" />
						<input
							type="text"
							class="grow input border-0 placeholder:italic"
							name="title"
							placeholder="apple"
							required
						/>
					</label>
				</div>

				<div class="form-control w-full">
					<span class="label label-text">Price</span>
					<label class="input input-bordered flex items-center gap-2">
						<Icon icon="mdi:money" />
						<input
							type="text"
							class="grow input border-0 placeholder:italic"
							name="price"
							placeholder="2.55"
							required
						/>
					</label>
				</div>

				<div class="form-control w-full">
					<label class="label label-text !justify-start" for="description">
						<Icon icon="mdi:text" class="mr-2" /> Description
					</label>
					<textarea
						id="description"
						class="textarea textarea-bordered w-full min-h-10 resize-none"
						placeholder="learn, earn and enjoy your craft..."
						name="description"
						required
					></textarea>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="btn btn-success text-white disabled:btn-disabled"
				>
					{#if loading}
						<span class="loading loading-spinner loading-xs"></span>
					{/if}
					Share Product
				</button>
			</fieldset>
		</form>

		<img
			src={image || "https://placehold.co/300x250"}
			alt="upload preview"
			class="aspect-auto object-fill min-w-80"
		/>
	</div>
</section>
