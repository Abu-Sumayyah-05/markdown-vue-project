<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

// Props & emits
const props = defineProps<{
  markdown: string
  onSubmit?: (value: string) => void
}>()
const emit = defineEmits<{
  (e: 'update-markdown', value: string): void
}>()

// Ref for container div
const editorContainer = ref<HTMLDivElement | null>(null)
let editor: EditorView

// Initialize CodeMirror
onMounted(() => {
  if (editorContainer.value) {
    editor = new EditorView({
      state: EditorState.create({
        doc: props.markdown,
        extensions: [
          markdown(),
          oneDark,
          EditorView.updateListener.of((v) => {
            if (v.docChanged) {
              const value = v.state.doc.toString()
              emit('update-markdown', value)
            }
          }),
        ],
      }),
      parent: editorContainer.value,
    })
  }
})

// Sync external markdown changes to editor
watch(
  () => props.markdown,
  (newMarkdown) => {
    if (editor && editor.state.doc.toString() !== newMarkdown) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: newMarkdown,
        },
      })
    }
  }
)


// Optional: handle form submit
const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (props.onSubmit && editor) {
    props.onSubmit(editor.state.doc.toString())
  }
}
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col gap-4">
   <div
  ref="editorContainer"
  class="h-48 md:h-96 w-full border border-gray-300 rounded-md overflow-hidden bg-neutral-900"
></div>
    <button
      type="submit"
      class="bg-black text-white p-2 rounded-md md:w-[280px] md:justify-center"
    >
      Save Markdown
    </button>
  </form>
</template>
