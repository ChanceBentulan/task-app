<template>
    <div v-if="show" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="$emit('close')">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        v-model="formData.title"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        v-model="formData.description"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div class="flex justify-end gap-3">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        {{ submitText }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    title: {
        type: String,
        default: 'Add Task'
    },
    submitText: {
        type: String,
        default: 'Add Task'
    },
    task: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
    title: '',
    description: ''
})

watch(() => props.task, (newTask) => {
    if (newTask) {
        formData.value = {
            title: newTask.title || '',
            description: newTask.description || ''
        }
    } else {
        formData.value = {
            title: '',
            description: ''
        }
    }
}, { immediate: true })

const handleSubmit = () => {
    emit('submit', { ...formData.value })
    formData.value = {
        title: '',
        description: ''
    }
}
</script>
