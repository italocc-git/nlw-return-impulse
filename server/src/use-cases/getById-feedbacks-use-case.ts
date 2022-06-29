
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

export class GetByIdFeedbacksUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository
    ) {

    }
    execute(userId: string) {
        const feedbacksData = this.feedbacksRepository.getById(userId)

        return feedbacksData
    }
}