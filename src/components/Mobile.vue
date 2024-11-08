<template>
    <BContainer fluid>
    <BRow>
        <BCol>
            <h1 style="color: white;">Welcome to my website</h1>
    <h2 style="color: white;"> About Me</h2>
    <h3 style="color: white;">I am a 16 year old student from Malaysia that likes to create interesting projects.</h3>
    <h1 style="color: white;">Here's what am I listening to currently</h1>
    <div style="display: flex;"> 
        <BCard
            :title="PresenceStore.devicename"
            :img-src="PresenceStore.songimg"
            :img-alt="PresenceStore.songname"
            style="max-width: 20rem; background-color: black; color: white;"
        >
            <BCardText>
                <h1 style="color:white;"> {{ PresenceStore.songname }} </h1>
                
            </BCardText>
        
    </BCard>
    <div>
        
        <BCard
        title="Playback History"
        style="background-color: black; color: white;"
        >
                <BTable show-empty :items="PresenceStore.play_history" style="" :fields="TableFieldStore.songs_field" :table-class="'table-dark .th-lg'" responsive>
                <template #cell(songimg)="row">
                    <img :alt="row.item.songname" :src="row.value" style="width: 70px; height: 70px;">
                </template>
                <template #cell(songname)="row">
                    {{row.value}} 
                </template>
                <template #cell(artistname)="row">
                    {{row.value}}
                </template>
                <template #cell(devicename)="row">
                    {{row.value}}
                </template>
                <template v-slot:empty>
                    <h1 style="font-style: bold; color: white;">No songs played yet!</h1>
                </template>
                
            </BTable>
        </BCard>
            </div>
    </div>
    <h2 style="color: white;">Tech gadgets that I own</h2>
    <BTable show-empty :items="TechItems.items" style="width: 95%" :fields="TableFieldStore.tech_field" :table-class="'table-dark .th-lg'" responsive>
        <template #cell(img)="row">
                    <img :alt="row.item.name" :src="row.value" style="width:100px; height: 100px;">
                </template>
    </BTable>
    <h2 style="color: white;">Projects</h2>
    <BTable show-empty :items="repos" style="width: 95%" :fields="TableFieldStore.repos_field" :table-class="'table-dark .th-lg'" responsive>
        <template #cell(html_url)="row">
         <a :href="row.item.html_url" target="_blank">Github</a>
        </template>
    </BTable>
</BCol>
</BRow>
</BContainer>
</template>

<script setup>
import "../assets/main.css"



import { usePresenceStore } from '/src/stores/PresenceStore.ts';
const PresenceStore = usePresenceStore();

import { useTechItems } from '@/stores/TechItemsStore';
const TechItems = useTechItems();

import { useTableFieldStore } from '@/stores/TableFieldStore';
const TableFieldStore = useTableFieldStore();

let userid = ''
    userid = await fetch('https://discord-plex.darrenmc.dev/api/userid')
    PresenceStore.setUID(await userid.text())

let appid = ''
    appid = await fetch('https://discord-plex.darrenmc.dev/api/appid')
    PresenceStore.setAID(await appid.text())


let play_history = await fetch('https://discord-plex.darrenmc.dev/api/prevsong')
PresenceStore.setHistory(await play_history.json())

let repos = []
    repos = await fetch('https://api.github.com/users/Darren-project/repos')
    repos = await repos.json()

let webSocket = new WebSocket("wss://api.lanyard.rest/socket");

function reconnectWss() {
clearInterval(PresenceStore.heartbeat_timer)
webSocket = new WebSocket("wss://api.lanyard.rest/socket");
}

webSocket.onclose = (event) => {
reconnectWss()
}

webSocket.onmessage = async (event) => {
const data = JSON.parse(event.data);
if (data.op === 1) {
    let ht_int = data["d"]["heartbeat_interval"];
    let htid = setInterval(() => {
       try {
        webSocket.send(
            JSON.stringify({
                op: 3,
            })
        );
        console.log("Heartbeat sent");
       } catch {
         reconnectWss()
       }
    }, ht_int - 100);
    PresenceStore.setHeartbeatTimer(htid)
    console.log("Connected to Lanyard API")
    webSocket.send(
            JSON.stringify({
                op: 2,
                d: {
                    subscribe_to_id: PresenceStore.user_id,
                }
            })
    )
}
if (data.op === 0) {
    let pre = data.d
    let pre2 = pre["activities"]
    let real = {}

    let trip = false

    for(let search in pre2){
        if(!trip) {
        if(pre2[search].application_id === PresenceStore.app_id){
            real = pre2[search]
            trip = true
        }
    }
    }

    try {
    let songimg = real["assets"]["large_image"]
    if(songimg.substr(0,3) == "mp:") {
        let whole = songimg.length
        songimg = songimg.substr(3, whole)
        songimg = "https://media.discordapp.net/" + songimg
    } else {
        songimg = "https://cdn.discordapp.com/app-assets/" + PresenceStore.app_id + "/" + songimg + ".png"
    }
    let songname = real["state"]
    let devicename = real["details"]
    PresenceStore.setPresence(songimg, songname, devicename);
    console.log("Presence Updated");
    let quickc = await fetch('https://discord-plex.darrenmc.dev/api/prevsong')
    PresenceStore.setHistory(await quickc.json())
    
    } catch (error) {
        console.log(error);
    }
}
}
</script>
