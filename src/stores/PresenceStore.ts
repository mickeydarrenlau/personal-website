import { defineStore } from 'pinia'
export const usePresenceStore = defineStore('Presence', {
    state: () => ({ songimg: 0, songname: '', devicename: '', history: [], uid: "", aid: "", heartbeat_timer_id: 0 }),
    getters: {
      img: (state) => state.songimg,
      name: (state) => state.songname,
      device: (state) => state.devicename,
      play_history: (state) => state.history,
      user_id: (state) => state.uid,
      app_id: (state) => state.aid,
      heartbeat_timer: (state) => state.heartbeat_timer_id
    },
    actions: {
        setPresence(songimg: number, songname: string, devicename: string) {
            this.songimg = songimg
            this.songname = songname
            this.devicename = devicename
        },
        setHistory(history: any) {
            this.history = history
        },
        setUID(uid: string) {
            this.uid = uid
        },
        setAID(aid: string) {
            this.aid = aid
        },
        setHeartbeatTimer(ht: number) {
          this.heartbeat_timer_id  = ht
        }
    },
  })