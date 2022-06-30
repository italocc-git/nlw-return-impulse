import { api } from "../../../services/api"

async function getFeedbackByUser(userId: string) {
    return await api.get('feedbacksUser', {
        data: {
            userId
        }
    })
}

export { getFeedbackByUser }