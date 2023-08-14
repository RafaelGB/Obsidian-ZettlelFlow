import { HeaderType, SectionType } from "components/core";
import ZettlelFlow from "main";
import { Modal } from "obsidian";
import { StoreApi, UseBoundStore } from "zustand";

export type NoteBuilderType = {
    plugin: ZettlelFlow;
    modal: Modal;
}

export type NoteBuilderProps = {
    store: NoteBuilderStore;
} & NoteBuilderType;

export type NoteBuilderState = {
    title: string;
    targetFolder: string;
    section: SectionType;
    header: HeaderType;
    actions: {
        setTitle: (title: string) => void;
    }
}

export type NoteBuilderStore = UseBoundStore<StoreApi<NoteBuilderState>>;