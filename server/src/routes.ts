import { NodeMailerMailAdapter } from './adapters/nodeMailer/node-mailer-adapter'

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'

import express from 'express'

export const routes = express.Router()

routes.post('/feedback', async (req, resp) => {
    const { type, comment, screenshot} = req.body
    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const nodeMailerAdapter = new NodeMailerMailAdapter()
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerAdapter)
   
        await submitFeedbackUseCase.execute({
        type, comment, screenshot
    })

    

    return resp.status(201).send()
}
    catch(err){
        console.log(err)
        return resp.status(500).send()
    }
   
    
})