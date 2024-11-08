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
            style="max-width: 10rem; background-color: black; color: white;"
        >
            <BCardText>
                <h1 style="color:white;"> {{ PresenceStore.songname }} </h1>
                
            </BCardText>
        
    </BCard>
        
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
    <h2 style="color: white;">Tech gadgets that I own</h2>
    <BTable show-empty :items="TechItems.items" style="width: 95%" :fields="TableFieldStore.tech_field" :table-class="'table-dark .th-lg'" responsive>
        <template #cell(img)="row">
             <img style="width:100px; height: 100px;" :srcset="row.value" :alt="row.item.name">
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
import { ref, onMounted } from 'vue';
import { usePresenceStore } from '/src/stores/PresenceStore.ts';
import { useTechItems } from '@/stores/TechItemsStore';
import { useTableFieldStore } from '@/stores/TableFieldStore';
import { BTable } from 'bootstrap-vue-next';

const TechItems = useTechItems();

const PresenceStore = usePresenceStore();
const TableFieldStore = useTableFieldStore();

window.ll = PresenceStore

const repos = ref([]);

onMounted(async () => {
    const useridResponse = await fetch('https://discord-plex.darrenmc.dev/api/userid');
    PresenceStore.setUID(await useridResponse.text());

    const appidResponse = await fetch('https://discord-plex.darrenmc.dev/api/appid');
    PresenceStore.setAID(await appidResponse.text());

    const playHistoryResponse = await fetch('https://discord-plex.darrenmc.dev/api/prevsong');
    PresenceStore.setHistory(await playHistoryResponse.json());

    const reposResponse = await fetch('https://api.github.com/users/Darren-project/repos');
    repos.value = await reposResponse.json();

    let webSocket = new WebSocket("wss://api.lanyard.rest/socket");

    function reconnectWss() {
        clearInterval(PresenceStore.heartbeat_timer);
        webSocket = new WebSocket("wss://api.lanyard.rest/socket");
    }

    webSocket.onclose = () => {
        reconnectWss();
    };

    webSocket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        if (data.op === 1) {
            const ht_int = data.d.heartbeat_interval;
            const htid = setInterval(() => {
                try {
                    webSocket.send(JSON.stringify({ op: 3 }));
                    console.log("Heartbeat sent");
                } catch {
                    reconnectWss();
                }
            }, ht_int - 100);
            PresenceStore.setHeartbeatTimer(htid);
            console.log("Connected to Lanyard API");
            webSocket.send(JSON.stringify({
                op: 2,
                d: { subscribe_to_id: PresenceStore.user_id }
            }));
        }
        if (data.op === 0) {
            const pre = data.d;
            const pre2 = pre.activities;
            let real = {};
            let trip = false;

            for (const search in pre2) {
                if (!trip && pre2[search].application_id === PresenceStore.app_id) {
                    real = pre2[search];
                    trip = true;
                }
            }

            try {
                let songimg = real.assets.large_image;
                if (songimg.startsWith("mp:")) {
                    songimg = `https://media.discordapp.net/${songimg.slice(3)}`;
                } else {
                    songimg = `https://cdn.discordapp.com/app-assets/${PresenceStore.app_id}/${songimg}.png`;
                }
                const songname = real.state;
                const devicename = real.details;
                PresenceStore.setPresence(songimg, songname, devicename);
                console.log("Presence Updated");
                const quickc = await fetch('https://discord-plex.darrenmc.dev/api/prevsong');
                PresenceStore.setHistory(await quickc.json());
            } catch (error) {
                console.log(error);
            }
        }
    };
});
</script>
