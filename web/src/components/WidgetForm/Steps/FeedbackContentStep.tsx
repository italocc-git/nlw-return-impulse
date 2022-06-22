import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";
type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};
export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const { title, image } = feedbackTypes[feedbackType];

  const [screenShoot, setScreenShoot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSendingFeedback(true);
    await api.post("/feedback", {
      type: feedbackType,
      comment,
      screenshot: screenShoot,
    });
    setIsSendingFeedback(false);
    onFeedbackSent();
  };

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-700 hover:text-zinc-200 dark:text-zinc-500 "
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <img src={image.source} alt={image.alt} className="w-6 h-6" />
          {title}
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmit}>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 dark:placeholder-zinc-100 text-zinc-900 dark:text-zinc-100 border-zinc-600 dark:border-zinc-100 bg-transparent rounded-md
          focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none
          scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
        />
        <footer className="flex  gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenShoot}
            screenShoot={screenShoot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 text-zinc-50 dark:text-zinc-900 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
      <div className="flex py-8 gap-2 w-full"></div>
    </>
  );
}
