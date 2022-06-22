import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

export function CloseButton() {
  return (
    <Popover.Button
      className="top-5 right-5 absolute text-zinc-700 hover:text-zinc-300 dark:text-zinc-100 dark:hover:text-zinc-400"
      title="Fechar Formulário de feedback"
    >
      <X className="w-4 h-4" weight="bold" />
    </Popover.Button>
  );
}
