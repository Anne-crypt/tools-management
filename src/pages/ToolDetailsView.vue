<template>
	<div class="p-6">
		<div v-if="loading" class="rounded-xl border border-slate-200 p-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
			Loading tool details...
		</div>

		<div v-else-if="errorMessage" class="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
			{{ errorMessage }}
		</div>

		<div
			v-else-if="tool"
			class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-black"
		>
			<div class="mb-6 flex items-center justify-between gap-4">
				<div class="flex min-w-0 items-center gap-3">
					<img
						v-if="tool.iconUrl"
						:src="tool.iconUrl"
						:alt="tool.name"
						class="h-10 w-10 shrink-0 object-contain"
					/>
					<div>
						<h2 class="truncate text-xl font-semibold text-slate-900 dark:text-white">{{ tool.name }}</h2>
						<p class="text-sm text-slate-500 dark:text-slate-400">{{ tool.category }}</p>
					</div>
				</div>
				<ToolStatus :status="tool.status" />
			</div>

			<p class="mb-6 text-sm text-slate-700 dark:text-slate-300">{{ tool.description }}</p>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Vendor</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">{{ tool.vendor || "-" }}</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Owner Department</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">{{ tool.ownerDepartment }}</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Monthly Cost</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">€{{ tool.monthlyCost }}</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Previous Month Cost</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">€{{ tool.previousMonthCost ?? 0 }}</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Active Users</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">{{ tool.activeUsersCount }}</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Website</p>
					<a
						v-if="tool.websiteUrl"
						:href="tool.websiteUrl"
						target="_blank"
						rel="noreferrer"
						class="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
					>
						{{ tool.websiteUrl }}
					</a>
					<p v-else class="text-sm font-medium text-slate-900 dark:text-white">-</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Created At</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">{{ formatDate(tool.createdAt) }}</p>
				</div>
				<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
					<p class="text-xs text-slate-500 dark:text-slate-400">Updated At</p>
					<p class="text-sm font-medium text-slate-900 dark:text-white">{{ formatDate(tool.updatedAt) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ToolStatus from "../components/ui/badge/ToolStatus.vue";
import { toolService } from "../api/api";
import type { Tool } from "../interfaces/tools";
import { mapApiToolToTool } from "../interfaces/tools";

const route = useRoute();
const tool = ref<Tool | null>(null);
const loading = ref(false);
const errorMessage = ref("");

function formatDate(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return value;
	}
	return new Intl.DateTimeFormat("fr-FR", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

async function fetchToolDetails() {
	loading.value = true;
	errorMessage.value = "";

	try {
		const id = route.params.id;
		if (!id) {
			throw new Error("Tool id is missing in route params.");
		}

		const response = await toolService.getToolById(id as string);
		tool.value = mapApiToolToTool(response.data);
	} catch (error) {
		console.error("Erreur lors du chargement du tool :", error);
		errorMessage.value = "Impossible de charger les informations du tool.";
	} finally {
		loading.value = false;
	}
}

onMounted(fetchToolDetails);
</script>