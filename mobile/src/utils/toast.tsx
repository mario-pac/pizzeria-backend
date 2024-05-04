import Toast from "react-native-root-toast"
import { theme } from "styles/theme"

export const showToast = (type: 'success' | 'warning' | 'error', message: string) => {


    Toast.show(message, {
        backgroundColor: type === 'success' ? theme.colors.status.active : type === 'warning' ? theme.colors.status.warning : theme.colors.status.error
    })
}