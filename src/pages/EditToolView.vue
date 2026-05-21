<template>
  <div class="p-6">
    <div
      v-if="loading"
      class="rounded-xl border border-slate-200 p-6 text-slate-600 dark:border-slate-800 dark:text-slate-300"
    >
      Loading tool...
    </div>
    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
    >
      {{ errorMessage }}
    </div>
    <ToolForm
      v-else
      title="Edit Tool"
      submit-label="Save Changes"
      :initial-data="initialData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toolService } from "../api/api";
import { mapApiToolToTool } from "../interfaces/tools";
import ToolForm from "../components/toolManagement/ToolForm.vue";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const initialData = ref({});

async function fetchTool() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await toolService.getToolById(route.params.id as string);
    const tool = mapApiToolToTool(response.data);
    initialData.value = {
      name: tool.name,
      description: tool.description,
      vendor: tool.vendor ?? "",
      category: tool.category,
      monthlyCost: tool.monthlyCost,
      ownerDepartment: tool.ownerDepartment,
      status: tool.status,
      websiteUrl: tool.websiteUrl ?? "",
      activeUsersCount: tool.activeUsersCount,
      iconUrl: tool.iconUrl,
    };
  } catch (error) {
    console.error("Erreur lors du chargement du tool :", error);
    errorMessage.value = "Impossible de charger les informations du tool.";
  } finally {
    loading.value = false;
  }
}

function handleSubmit(form: object) {
  console.log("Edit tool form payload:", form);
  // TODO: Implement API call to update the tool
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/tools");
  }
}

onMounted(fetchTool);
</script>
