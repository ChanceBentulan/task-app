<template>
    <div class="container mx-auto p-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold mb-6">My Tasks</h1>
            <button @click="showModal = true" class="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500">
                Add Task
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr class="bg-gray-100 border-b">
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                        <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="taskStore.loading">
                        <td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading...</td>
                    </tr>
                    <tr v-else-if="taskStore.error">
                        <td colspan="6" class="px-6 py-4 text-center text-red-500">{{ taskStore.error }}</td>
                    </tr>
                    <tr v-else-if="taskStore.tasks.length === 0">
                        <td colspan="6" class="px-6 py-4 text-center text-gray-500">No tasks found</td>
                    </tr>
                    <tr v-else v-for="task in taskStore.tasks" :key="task.id" class="border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm text-gray-900">{{ task.title }}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{{ task.description }}</td>
                        <td class="px-6 py-4 text-sm">
                            <span :class="statusClass(task.completed)" class="px-2 py-1 rounded text-xs font-medium">
                                {{ task.completed ? 'completed' : 'pending' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(task.created_at) }}</td>
                        <td class="flex gap-3 px-6 py-4 text-sm">
                            <button @click="handleEdit(task)" class="bg-blue-600 text-white px-2 py-1 rounded-md">Edit</button>
                            <button @click="handleDelete(task.id)" class="bg-red-600 text-white px-2 py-1 rounded-md">Delete</button>
                            <button
                                v-if="!task.completed"
                                @click="handleComplete(task.id)" class="bg-green-600 text-white px-2 py-1 rounded-md">Complete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <TaskModal
            :show="showModal"
            :title="editingTask ? 'Edit Task' : 'Add Task'"
            :submitText="editingTask ? 'Update Task' : 'Add Task'"
            :task="editingTask"
            @close="handleCloseModal"
            @submit="handleSubmitTask"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskModal from '../components/TaskModal.vue'

const taskStore = useTaskStore()
const showModal = ref(false)
const editingTask = ref(null)

onMounted(() => {
    taskStore.fetchTasks()
})

const statusClass = (completed) => {
    return completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
}

const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
        await taskStore.deleteTask(id)
    }
}

const handleEdit = (task) => {
    editingTask.value = task
    showModal.value = true
}

const handleCloseModal = () => {
    showModal.value = false
    editingTask.value = null
}

const handleComplete = async (id) => {
    await taskStore.toggleTask(id)
}

const handleSubmitTask = async (taskData) => {
    if (editingTask.value) {
        await taskStore.updateTask(editingTask.value.id, taskData)
    } else {
        await taskStore.createTask(taskData)
    }
    handleCloseModal()
}
</script>

<style scoped>
</style>