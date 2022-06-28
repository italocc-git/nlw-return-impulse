import { MailAdapter } from '../adapters/mail-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

interface SubmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot?: string
    userId: string
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {

    }
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot, userId } = request

        if (!type) {
            throw new Error('Type is required.')
        }
        if (!comment) {
            throw new Error('Comment is required.')
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
            userId
        })
        const typeColorStyle = type === 'BUG' ? "red" : "limegreen"


        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: monospace;">`,
                `<p style="font-size:1.5rem; box-shadow:rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px"> Tipo do feedback: <b style="color:${typeColorStyle}"> ${type} </b></p>`,
                `<p> Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" width="100%" alt="screenshot" style="border-radius:10px"/>` : ``,
                `</div>`

            ].join('\n')
        })
    }
}