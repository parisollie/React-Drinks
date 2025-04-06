import { StateCreator } from 'zustand'
import { FavoritesSliceType } from './favoritesSlice'

//Paso 7.6 
type Notification = {
    text: string
    error: boolean
    show: boolean
}
//V-340,paso 7.4
export type NotificationSliceType = {
    //Paso 7.7
    notification: Notification
    //V-342,paso 7.12, el payload requiere texto y error
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    //Paso 7.20
    hideNotification: () => void
}

//Paso 7.17 [], [], no hay parametros adicionales 
export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        //Paso 7.8
        text: '',
        error: false,
        show: false
    },
    //Paso 7.13
    showNotification: (payload) => {
        set({
            //Paso 7.14
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        //paso 7.24, quitar la notificacion 
        setTimeout(() => {
            get().hideNotification()
        }, 5000);
    },
    //V-343,paso 7.19
    hideNotification: () => {
        //Paso 7.21
        set({
            notification: {
                text: '',
                error: false,
                show: false
            },
        })
    }
})