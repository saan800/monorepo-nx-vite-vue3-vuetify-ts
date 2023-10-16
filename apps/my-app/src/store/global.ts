import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export default defineStore('global', () => {
  // State

  /** Loading overlay */
  const loading: Ref<boolean> = ref(true)
  /** SnackBar Text */
  const message: Ref<string> = ref('')

  // Actions

  /**
   * Show loading Overlay
   *
   * @param isLoading - visibility
   */
  function setLoading(isLoading: boolean): void {
    loading.value = isLoading
  }

  /**
   * Show snackbar message
   *
   * @param msg - snackbar message
   */
  function setMessage(msg: string = ''): void {
    // put snackbar text
    message.value = msg
  }

  return { loading, message, setLoading, setMessage }
})
