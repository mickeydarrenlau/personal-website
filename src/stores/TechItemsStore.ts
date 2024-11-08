import { defineStore } from 'pinia'
export const useTechItems = defineStore('TechItems', {
    state: () => ({
      item: [
        { name: 'Space Travel', type: 'Earbuds 🎧', maker: 'Moondrop', img: 'moondrop_space_travel.png' }
      ]
     }),
    getters: {
      items: (state) => {
          let prefix = " /src/assets/tech_images/"
          if(import.meta.env.PROD) {
            prefix = "/assets/tech_images/"
          }
          let items = state.item
          for(let item in items) {
                  item = items[item]
                  item["img"] = prefix + item["img"]
          }
          return items
          
      },
    }
  })
