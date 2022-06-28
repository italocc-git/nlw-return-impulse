import { ChatTeardropDots, CircleNotch } from "phosphor-react";

import { Popover } from "@headlessui/react";
import { WidgetForm } from "./WidgetForm";
import { useAuth } from "../hooks/useAuth";

export function Widget() {
  const {loading} = useAuth()
  const { Panel, Button } = Popover;

   if(loading) { 
    return(
      <Popover className="min-h-screen flex flex-col items-center justify-center gap-2">
        <span className="text-2xl">Carregando </span>
        <CircleNotch size={32} className="animate-spin"/>
      </Popover>
    )
   } 


      return (
      <Popover className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
        <Panel>
          <WidgetForm />
        </Panel>
        <Button className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
          <ChatTeardropDots className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
            <span className="pl-2"></span>
            Feedback
          </span>
        </Button>
      </Popover>
    )  
 
  
}
