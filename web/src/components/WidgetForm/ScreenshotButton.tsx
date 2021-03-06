import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

type ScreenshotButtonProps = {
  onScreenshotTook: (screenshot: string | null) => void;
  screenShoot: string | null;
};

export function ScreenshotButton({
  screenShoot,
  onScreenshotTook,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);

    const base64image = canvas.toDataURL("image/png");
    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenShoot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="p-1 h-10 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-500 hover:text-zinc-300 dark:text-zinc-100 dark:hover:text-zinc-400 transition-colors"
        style={{
          backgroundImage: `url(${screenShoot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-brand-500 dark:bg-zinc-200 rounded-md border-transparent hover:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-50" />
      )}
    </button>
  );
}
