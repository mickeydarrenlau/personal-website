import { defineStore } from 'pinia'
export const useSocialStore = defineStore('SocialStore', {
    state: () => ({
      item: [
        { name: 'Discord (darrennotfound)', link: 'https://discordapp.com/users/718622831788949575', img: 'discord.ico' },
      ]
     }),
    getters: {
      items: (state) => {
          let prefix = " /src/assets/social_images/"
          if(import.meta.env.PROD) {
            prefix = "/assets/social_images/"
          }
          let items = JSON.parse(JSON.stringify(state.item));
          for(let item in items) {
                  let real_item = items[item]
                  real_item["img"] = prefix + real_item["img"]
          }
          return items
          
      },
    }
  })
