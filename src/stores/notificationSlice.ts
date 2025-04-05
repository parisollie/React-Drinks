import {  StateCreator } from 'zustand'
import { FavoritesSliceType } from './favoritesSlice'

//Vid 340 
type Notification = {
    text: string
    error: boolean
    show: boolean
}
//Vid 340
export type NotificationSliceType = {
    //Vid 340 
    notification: Notification
    //Vid 342
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    //Vid 343
    hideNotification: () => void
}

//Vid 342 [], [], no hay parametros adicionales 
export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        //Vid 340 
        text: '',
        error: false,
        show: false
    },
    //Vid 342
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        //Vid 343 
        setTimeout(() => {
            get().hideNotification()
        }, 5000);
    },
    //Vid 343
    hideNotification: () => {
        //Vid 342
        set({
            //Vid 342
            notification: {
                text: '',
                error: false,
                show: false
            },
        })
    }
})