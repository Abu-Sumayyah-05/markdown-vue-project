<script setup lang="ts">
const props = defineProps<{
  markdown: string
}>()

const handleSave = () => {
  const blob = new Blob([props.markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'document.md'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button
    @click="handleSave"
    class="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
  >
    Download .md File
  </button>
</template>
