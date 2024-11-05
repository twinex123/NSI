// Import Firebase
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Récupérer l'instance Firebase initialisée dans le HTML
const app = getApp();
const database = getDatabase(app);

async function getPlayerIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}

async function createOrGetPlayer() {
    try {
        const ip = await getPlayerIP();
        if (!ip) throw new Error('Impossible d\'obtenir l\'IP');

        const playerId = btoa(ip + Date.now()).replace(/[/+=]/g, '');
        
        const playerRef = ref(database, 'players/' + playerId);
        const snapshot = await get(playerRef);
        
        if (!snapshot.exists()) {
            await set(playerRef, {
                id: playerId,
                ip: ip,
                createdAt: Date.now(),
                lastSeen: Date.now()
            });
        } else {
            await update(playerRef, {
                lastSeen: Date.now()
            });
        }
        
        return playerId;
    } catch (error) {
        console.error('Erreur lors de la création/récupération du joueur:', error);
        return null;
    }
}

createOrGetPlayer().then(playerId => {
    if (playerId) {
        console.log('ID du joueur:', playerId);
    }
});


