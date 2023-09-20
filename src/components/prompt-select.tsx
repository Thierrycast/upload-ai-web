import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string
  name: string
  template: string
}

interface PromptSelectedProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelectedProps) {

  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(()=>{
    api.get('/prompts').then(response => {
    
      setPrompts(response.data)
    })
  },[])


  function handlePromptSelected(promptId : String) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

    return(
        <Select onValueChange={handlePromptSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um prompt..."/>
        </SelectTrigger>
        <SelectContent>
          {
            prompts?.map(prompt => {
              return(
                <SelectItem value={prompt.id} key={prompt.id}>
                  {prompt.name}
                </SelectItem>
              )
            })
          }
        </SelectContent>
      </Select>
      
    )
}