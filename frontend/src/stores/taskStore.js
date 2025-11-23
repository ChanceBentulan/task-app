import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:8000/tasks/'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  const completedTasks = computed(() =>
    tasks.value.filter(task => task.completed)
  )

  const pendingTasks = computed(() =>
    tasks.value.filter(task => !task.completed)
  )

  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(API_URL)
      tasks.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createTask = async (taskData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(API_URL, taskData)
      tasks.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleTask = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.patch(`${API_URL}${id}/`)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (id, taskData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.put(`${API_URL}${id}/`, taskData)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id) => {
    loading.value = true
    error.value = null
    try {
      await axios.delete(`${API_URL}${id}/`)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    completedTasks,
    pendingTasks,
    fetchTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask
  }
})
