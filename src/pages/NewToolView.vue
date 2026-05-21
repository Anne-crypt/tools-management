<template>
	<div class="p-6">
		<ToolForm title="New Tool" submit-label="Save Tool" @submit="handleSubmit" />
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ToolForm from "../components/toolManagement/ToolForm.vue";

const router = useRouter();

function handleSubmit(form: object) {
	console.log("New tool form payload:", form);
	// TODO: Implement API call to create a new tool using the form data
	goBack();
}

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/tools");
  }
}
</script>