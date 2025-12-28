<script setup lang="ts">
import { ref, watch } from 'vue'

import Text from './components/Text.vue'
import Article from './components/Article.vue'
import FileLoader from './components/FileLoader.vue'
import FileSaver from './components/FileSaver.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'

import { useApiPersistence } from './composables/useApiPersistence'

// Markdown state
const markdown = ref<string>(
  localStorage.getItem('markdown') || '# Markdown Preview'
)

// Persist to localStorage whenever markdown changes
watch(markdown, (val) => {
  localStorage.setItem('markdown', val)
})

// API composable
const { loading, saveToApi, loadFromApi } = useApiPersistence(markdown)
</script>

<template>
  <main
    class="h-screen p-4 bg-green-300 text-black flex flex-col md:flex-row gap-6 md:gap-8 text-center md:justify-center"
    >
    <ErrorBoundary>
      <Text
        :markdown="markdown"
        @update-markdown="markdown = $event"
        :onSubmit="(val) => console.log('Markdown submitted:', val)"
      />
    </ErrorBoundary>

    <ErrorBoundary>
      <Article :markdown="markdown" />
    </ErrorBoundary>

    <div class="flex flex-col gap-6 md:justify-end">
      <div class="flex flex-row gap-4 justify-center md:flex-col md:justify-end">
        <FileLoader @load="markdown = $event" />
        <FileSaver :markdown="markdown" />
      </div>

      <div class="flex justify-center gap-4">
        <button
          @click="saveToApi"
          class="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save to API
        </button>
        <button
          @click="loadFromApi"
          class="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {{ loading ? 'Loading...' : 'Load from API' }}
        </button>
      </div>
    </div>
  </main>
 
</template>

