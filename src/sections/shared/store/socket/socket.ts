import { RouletteItem } from '@/modules/roulette/domain/models/RouletteItem';
import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
import { UserData } from '../../../../modules/shared/user/domain/models/UserData';
import { UserProfile } from '@/modules/shared/user/domain/models/UserProfile';

interface RouletteSocketData {
    user: {
        id: string;
        displayName: string;
        avatar: string;
    };
    item: RouletteItem;
}

export const useSocketStore = defineStore('socket', {
    state: () => ({
        socket: null as Socket | null,
        rouletteWinners: [] as RouletteSocketData[],
        userData: { freeSpin: 0, xp: '0', tradeUrl: '' } as UserData, 
        userProfile: { tradeUrl: '', steamId: '', coins: 0 } as UserProfile, 
        messages: [] as any[],
    }),
    actions: {
        setUserData(userData: UserData) {
            this.userData = userData;
        },
        setUserProfile(userProfile: UserProfile) {
            this.userProfile = userProfile;
        },
        connectSocket() {
            if (!this.socket) {
                this.socket = io(import.meta.env.VITE_WEBSOCKET_BASE_URL, {
                    query: {
                        cookie: document.cookie,
                    },
                    path: '/ws/socket.io', // Asegúrate de que el path coincida con el que configuraste en el backend
                    transports: ['websocket']
                });

                this.socket.on('connect', () => {
                });

                this.socket.on('rouletteWinners', (data: RouletteSocketData) => {
                    if (this.userData.id !== data.user.id) {
                        this.rouletteWinners.push(data);
                        this.removeItem(data.item._id);
                    }
                });

                this.socket.on('freeSpin', (data: number) => {
                    this.userData.freeSpin = data;
                });

                this.socket.on('xp', (data: string) => {
                    console.log("xp", data)
                    this.userData.xp = data;
                });

                this.socket.on('coin', (data: number) => {
                    console.log("coin", data)
                    this.userProfile.coins = data;
                });

                this.socket.on('message', (data) => {
                    this.messages.push(data);
                });
            }
        },
        disconnectSocket() {
            if (this.socket) {
                this.socket.disconnect();
                this.socket = null;
            }
        },
        removeItem(itemId: string) {
            setTimeout(() => {
                this.rouletteWinners = this.rouletteWinners.filter(item => item.item._id !== itemId);
                console.log(`Item con id ${itemId} eliminado después de 60 segundos.`);
            }, 60000);
        }
    },
});
