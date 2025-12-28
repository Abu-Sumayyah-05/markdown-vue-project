import { ref } from 'vue'

export function useApiPersistence(markdown: { value: string }) {
  const loading = ref<boolean>(false)

  const BASE_URL = 'https://api.oluwasetemi.dev/tasks'

  // Save markdown to API
  const saveToApi = async (): Promise<void> => {
    loading.value = true
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: markdown.value }),
      })

      const data = await response.json()
      console.log('Saved:', data)
      alert('Markdown saved remotely!')
    } catch (error) {
      console.error('Error saving:', error)
      alert('Failed to save remotely!')
    } finally {
      loading.value = false
    }
  }

  // Load markdown from API
  const loadFromApi = async (): Promise<void> => {
    loading.value = true
    try {
      const response = await fetch(BASE_URL)
      const data = await response.json()

      markdown.value = data?.body || '# Loaded from API'
      alert('Markdown loaded from remote API!')

      // same logic you had in React
      await saveToApi()
    } catch (error) {
      console.error('Error loading:', error)
      alert('Failed to load from API!')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    saveToApi,
    loadFromApi,
  }
}
