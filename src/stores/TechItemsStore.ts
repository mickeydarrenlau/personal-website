import { defineStore } from 'pinia'
export const useTechItems = defineStore('TechItems', {
    state: () => ({
      item: [
        { name: 'Space Travel', type: 'Earbuds 🎧', maker: 'Moondrop', img: '/src/assets/tech_images/moondrop_space_travel.png' }
      ]
     }),
    getters: {
      items: (state) => state.item,
    }
  })