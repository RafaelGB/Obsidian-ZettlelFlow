import React, { useMemo } from "react";
import { ElementBuilderProps } from "./model/NoteBuilderModel";
import { callbackElementBuilder } from "./callbacks/CallbackNote";
import { Select, SelectMapper } from "components/select";
import { useNoteBuilderStore } from "./state/NoteBuilderState";

export function ElementSelector(info: ElementBuilderProps) {
  const { childen } = info;
  const actions = useNoteBuilderStore((state) => state.actions);
  const data = useNoteBuilderStore((state) => state.data);
  const position = useNoteBuilderStore((state) => state.position);
  const callbackMemo = useMemo(() => {
    return callbackElementBuilder(
      {
        actions,
        data,
      },
      info
    );
  }, []);
  return (
    <Select
      key={`selector-element-${position}`}
      options={SelectMapper.flowNodes2Options(childen)}
      callback={(selected) => {
        const selectedStep = childen.find((step) => step.id === selected);
        if (!selectedStep) throw new Error("Selected step not found");
        callbackMemo(selectedStep.id);
      }}
      autofocus={true}
    />
  );
}
