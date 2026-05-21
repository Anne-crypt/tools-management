<template>
	<div class="p-6">
		<form
			class="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-black"
			@submit.prevent="handleSubmit"
		>
			<h2 class="mb-6 text-xl font-semibold text-slate-900 dark:text-white">New Tool</h2>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="md:col-span-2">
					<label for="name" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
					<input
						id="name"
						v-model="form.name"
						type="text"
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div class="md:col-span-2">
					<label for="description" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
					<textarea
						id="description"
						v-model="form.description"
						required
						rows="4"
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="vendor" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Vendor</label>
					<input
						id="vendor"
						v-model="form.vendor"
						type="text"
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="category" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
					<input
						id="category"
						v-model="form.category"
						type="text"
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="department" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Owner Department</label>
					<input
						id="department"
						v-model="form.ownerDepartment"
						type="text"
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="status" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
					<select
						id="status"
						v-model="form.status"
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					>
						<option value="Active">Active</option>
						<option value="Expiring">Expiring</option>
						<option value="Unused">Unused</option>
					</select>
				</div>

				<div>
					<label for="monthlyCost" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Monthly Cost</label>
					<input
						id="monthlyCost"
						v-model.number="form.monthlyCost"
						type="number"
						min="0"
						step="0.01"
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="activeUsers" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Active Users</label>
					<input
						id="activeUsers"
						v-model.number="form.activeUsersCount"
						type="number"
						min="0"
						step="1"
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="website" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Website URL</label>
					<input
						id="website"
						v-model="form.websiteUrl"
						type="url"
						placeholder="https://..."
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>

				<div>
					<label for="icon" class="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Icon URL</label>
					<input
						id="icon"
						v-model="form.iconUrl"
						type="url"
						placeholder="https://..."
						required
						class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-black dark:text-white"
					/>
				</div>
			</div>

			<div class="mt-6 flex justify-end">
				<button
					type="submit"
					class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
				>
					Save Tool
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { Tool } from "../interfaces/tools";
import { useRouter } from "vue-router";

const router = useRouter();

type NewToolForm = Pick<
	Tool,
	| "name"
	| "description"
	| "vendor"
	| "category"
	| "monthlyCost"
	| "ownerDepartment"
	| "status"
	| "websiteUrl"
	| "activeUsersCount"
	| "iconUrl"
>;

const form = reactive<NewToolForm>({
	name: "",
	description: "",
	vendor: "",
	category: "",
	monthlyCost: 0,
	ownerDepartment: "",
	status: "Active",
	websiteUrl: "",
	activeUsersCount: 0,
	iconUrl: "",
});

function handleSubmit() {
	console.log("New tool form payload:", { ...form });
    // TODO: Implement API call to create a new tool using the form data

    goBack()
}

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/tools");
  }
}
</script>