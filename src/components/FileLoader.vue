<script setup lang="ts">
const emit = defineEmits<{
  (e: 'load', value: string): void
}>()

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (!file.name.endsWith('.md')) {
    alert('Please upload a valid .md file.')
    return
  }

  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      emit('load', result)
    }
  }
  reader.readAsText(file)
}
</script>

<template>
  <div class="my-2">
    <label
      class="flex px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-700 md:justify-center"
    >
      Upload .md File
      <input type="file" accept=".md" class="hidden" @change="handleFileUpload" />
    </label>
  </div>
</template>
