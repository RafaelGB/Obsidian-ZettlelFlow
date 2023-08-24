import { HeaderType, SectionType } from "components/core";
import ZettlelFlow from "main";
import { BuilderRoot } from "notes/NoteBuilder";
import { Modal } from "obsidian";
import { ZettelFlowElement } from "zettelkasten";
import { StoreApi, UseBoundStore } from "zustand";

export type NoteBuilderType = {
    plugin: ZettlelFlow;
    modal: Modal;
}

export type NoteBuilderProps = {
    store: NoteBuilderStore;
} & NoteBuilderType;

export type ElementBuilderProps = {
    childen: Record<string, ZettelFlowElement>,
    builder: BuilderRoot;
} & NoteBuilderProps;

export type ActionBuilderProps = {
    action: ZettelFlowElement;
    builder: BuilderRoot;
} & NoteBuilderProps;

export type NoteBuilderState = {
    title: string;
    targetFolder: string;
    section: SectionType;
    header: HeaderType;
    actions: {
        setTitle: (title: string) => void;
        setTargetFolder: (folder: string) => void;
        setHeader: (header: Partial<HeaderType>) => void;
        setSectionElement: (element: JSX.Element, extra?: Partial<Omit<SectionType, "element" | "position">>) => void;
        goPrevious: () => void;
        goNext: () => void;
    }
}

export type NoteBuilderStore = UseBoundStore<StoreApi<NoteBuilderState>>;