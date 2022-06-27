
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

export class GetAllFeedbacksUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository
    ) {

    }
    execute() {
        const feedbacksData = this.feedbacksRepository.getAll()

        return feedbacksData
    }
}