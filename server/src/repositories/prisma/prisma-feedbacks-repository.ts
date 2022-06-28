import { prisma } from "../../prisma";
import { FeedbackData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot, userId }: FeedbackData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
                userId
            },

        })
    };
    async getAll() {
        return await prisma.feedback.findMany()
    }
}