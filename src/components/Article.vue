<script setup lang="ts">
import { ref, watch } from "vue"
import MarkdownIt from "markdown-it"

const props = defineProps<{
  markdown: string
}>()

const loading = ref(false)

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

const renderedMarkdown = ref("")

watch(
  () => props.markdown,
  (newMarkdown) => {
    loading.value = true

    setTimeout(() => {
      renderedMarkdown.value = md.render(newMarkdown)
      loading.value = false
    }, 300)
  },
  { immediate: true }
)
</script>

<template>
  <article
    class="prose bg-white h-[25em] md:w-[27em] md:h-[32em] rounded shadow-md overflow-auto p-4"
  >
    <p v-if="loading" class="text-gray-500 animate-pulse">
      Rendering preview...
    </p>

    <div v-else v-html="renderedMarkdown"></div>
  </article>
</template>
