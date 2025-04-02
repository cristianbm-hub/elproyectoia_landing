<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-8 text-center">Flujos de n8n Disponibles</h2>
    
    <!-- Grid de flujos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="workflow in workflows" :key="workflow.id" 
           class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h3 class="text-xl font-semibold mb-2">{{ workflow.title }}</h3>
        <p class="text-gray-600 mb-4">{{ workflow.description }}</p>
        <button @click="openDownloadModal(workflow)"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Descargar
        </button>
      </div>
    </div>

    <!-- Modal de descarga -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h3 class="text-2xl font-bold mb-4">Descargar Flujo</h3>
        <p class="text-gray-600 mb-6">{{ selectedWorkflow?.title }}</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="userName" 
                   type="text" 
                   class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Tu nombre">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="userEmail" 
                   type="email" 
                   class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="tu@email.com">
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-4">
          <button @click="showModal = false"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancelar
          </button>
          <button @click="handleDownload"
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Descargar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WorkflowGrid from './WorkflowGrid'

export default defineComponent({
  name: 'WorkflowGridComponent',
  components: {
    WorkflowGrid
  }
})
</script> 