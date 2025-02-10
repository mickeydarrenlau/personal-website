import { defineStore } from 'pinia'
export const useSocialStore = defineStore('SocialStore', {
    state: () => ({
      item: [
        [
            { link: 'https://discordapp.com/users/718622831788949575', img: 'discord.ico' },
            { link: 'https://github.com/mickeydarrenlau', img: 'github.png' },
            { link: 'https://www.instagram.com/mickeydarrenlau/', img: 'instagram.ico' },
            { link: 'https://www.reddit.com/user/RoundAccident3943', img: 'reddit.png'},
            { link: 'mailto:darrenwjlau@gmail.com', img: 'gmail.png' },
            { link: 'https://discordapp.com/users/718622831788949575', img: 'discord.ico' },
            { link: 'https://github.com/mickeydarrenlau', img: 'github.png' },
            { link: 'https://www.instagram.com/mickeydarrenlau/', img: 'instagram.ico' },
            { link: 'https://www.reddit.com/user/RoundAccident3943', img: 'reddit.png'},
            { link: 'mailto:darrenwjlau@gmail.com', img: 'gmail.png' },
            { link: 'https://www.instagram.com/mickeydarrenlau/', img: 'instagram.ico' },
            { link: 'https://www.reddit.com/user/RoundAccident3943', img: 'reddit.png'},
            { link: 'mailto:darrenwjlau@gmail.com', img: 'gmail.png' },
        ],
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
                for(let item in items) {
                    let real = items[item]
                    for(let item in real) {
                        let real_item = real[item]
                        if(real_item["img"].search(prefix) != -1) {
                            continue
                        }
                        real_item['img'] = prefix + real_item['img']
                }
          }
        }
          return items
          
      },
    }
  })
