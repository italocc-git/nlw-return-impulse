import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn() /* spy function */
const getFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy, getById: getFeedbackSpy },
    { sendMail: sendMailSpy }
)



describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,auau2878sxsadb',
            userId: '123'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback without type', async () => {


        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,auau2878sxsadb',
            userId: '123'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without comment', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,auau2878sxsadb',
            userId: '123'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without userId', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,auau2878sxsadb',
            userId: ''
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback with an invalid screenshot', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comment test',
            screenshot: 'test.jpg',
            userId: '123'
        })).rejects.toThrow()
    })
})