import { toast } from 'react-toastify'


const config = {
    autoClose: 3000
}
const notification = {
    success(description: string) {
        toast.success(description, config)
    },
    error(description: string) {
        toast.error(description, config)
    },
    info(description: string) {
        toast.info(description, config)
    },
    warning(description: string) {
        toast.warning(description, config)
    }
}
export default notification