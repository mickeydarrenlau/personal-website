import { defineStore } from 'pinia'
export const useTechItems = defineStore('TechItems', {
    state: () => ({
      item: [
        { name: 'Space Travel', type: 'Earbuds 🎧', maker: 'Moondrop', img: '/src/assets/tech_images/moondrop_space_travel.png' }
      ]
     }),
    getters: {
      items: (state) => {
          if(import.meta.env.PROD) {
              let items = state.item
              for(let item in items) {
                  item = items[item]
                  item["img"].replace("src","")
              }
              return items
          }
          return state.item
      },
    }
  })
