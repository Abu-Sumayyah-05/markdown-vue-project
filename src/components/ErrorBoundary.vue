<script setup lang="ts">
import { ref, onErrorCaptured } from "vue"

const hasError = ref(false)

onErrorCaptured((error, instance, info) => {
  console.error("Error caught in ErrorBoundary:", error, info)
  hasError.value = true

  // returning false prevents the error from propagating further
  return false
})

const resetError = () => {
hasError.value = false
}
</script>

<template>
  <div v-if="hasError" class="p-4 bg-red-100 text-red-700 rounded-md shadow-md text-center">
    <h2 class="font-bold text-lg">⚠️ Something went wrong.</h2>
    <p>Please try again or check the console for details.</p>

     <button
      @click="resetError"
      class="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
    >
      Retry
    </button>
  </div>

  <slot v-else />
</template>
