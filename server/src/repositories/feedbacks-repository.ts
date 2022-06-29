export interface FeedbackData {
    type: string
    comment: string;
    screenshot?: string
    userId: string
}

export interface FeedbacksRepository {
    create: (data: FeedbackData) => Promise<void>
    getById: (userId: string) => Promise<any[]>
}