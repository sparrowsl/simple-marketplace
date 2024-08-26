<script lang="ts">
	import { enhance, applyAction } from "$app/forms";
	import Icon from "@iconify/svelte";
	import universities from "$lib/universities.json";
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
			<legend class="font-bold text-xl text-center">Upload photo</legend>

			<fieldset class="grid gap-5">
				<div class="form-control w-full">
					<span class="label label-text">Image</span>
					<input
						type="file"
						accept="image/*"
						class="file-input file-input-bordered"
						name="blob"
						required
						on:change={(e) => previewImage(e.target?.files[0])}
					/>
				</div>

				<div class="form-control w-full">
					<label class="label flex justify-start gap-2" for="university">
						<Icon icon="mdi:lead-pencil" /> University
					</label>
					<select
						name="university"
						class="select select-bordered"
						id="university"
						required
					>
						{#each universities as university (university)}
							<option value={university}>{university}</option>
						{/each}
					</select>
				</div>

				<div class="form-control w-full">
					<span class="label label-text">Class Year</span>
					<label class="input input-bordered flex items-center gap-2">
						<Icon icon="bi:calendar-date-fill" />
						<input
							type="number"
							class="grow input border-0 placeholder:italic"
							name="classYear"
							placeholder="2023"
							minlength="4"
							maxlength="4"
							required
						/>
					</label>
				</div>

				<div class="form-control w-full">
					<label class="label label-text !justify-start" for="caption">
						<Icon icon="mdi:text" class="mr-2" /> Caption
					</label>
					<textarea
						id="caption"
						class="textarea textarea-bordered w-full min-h-10 resize-none"
						placeholder="learn, earn and enjoy your craft..."
						name="caption"
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
					Share Image
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
