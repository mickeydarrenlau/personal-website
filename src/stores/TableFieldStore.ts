import { defineStore } from 'pinia'
export const useTableFieldStore = defineStore('TableFieldStore', {
    state: () => ({
      tech_table_field: [
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'maker', label: 'Manufacturer' },
        { key: 'img', label: 'Image' }
      ],
      repos_table_field: [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'language', label: 'Language' },
        { key: 'html_url', label: 'Link' }
    ],
    songs_table_field: [
        { key: 'songimg', label: 'Cover Art' },
        { key: 'songname', label: 'Song Name' },
        { key: 'artistname', label: 'Artist' },
        ]
     }),
    getters: {
      tech_field: (state) => state.tech_table_field,
      repos_field: (state) => state.repos_table_field,
      songs_field: (state) => state.songs_table_field
    }
  })