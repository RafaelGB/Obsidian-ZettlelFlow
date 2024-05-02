import React, { useEffect, useRef, useState } from "react";
import { ActionAccordionProps } from "./typing";
import { c } from "architecture";
import { Icon } from "architecture/components/icon";
import { actionsStore } from "architecture/api";
import { Input } from "architecture/components/core";
import { Droppable, useDragHandle } from "architecture/components/dnd";
import { ACTIONS_ACCORDION_DND_ID } from "../shared/Identifiers";
import { v4 as uuid4 } from "uuid";

const URL = "https://rafaelgb.github.io/Obsidian-ZettelFlow/actions/";
const ACTION_LABEL_URL: Record<string, string> = {
  script: "Script",
  prompt: "Prompt",
  number: "Number",
  selector: "Selector",
  cssclasses: "CssClasses",
  tags: "Tags",
  checkbox: "Checkbox",
  calendar: "Calendar",
  backlink: "Backlink",
  "task-management": "TaskManagement",
};

export function ActionAccordion(props: ActionAccordionProps) {
  const { action, onRemove, index } = props;
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("entrance");

  const bodyRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useDragHandle(ACTIONS_ACCORDION_DND_ID, measureRef, dragHandleRef, index);

  // LEGACY: This is to keep the id of the action
  useEffect(() => {
    if (!action.id) {
      action.id = uuid4();
    }
    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 300); // Ajusta esto al tiempo de tu animación
    return () => clearTimeout(timer);
  }, []);

  // Gestionar la eliminación con animación
  const handleRemove = () => {
    setAnimationClass("exit");
    setTimeout(() => {
      onRemove();
    }, 300); // Ajusta esto al tiempo de tu animación
  };

  // END LEGACY
  return (
    <div className={`${c("accordion")} ${animationClass}`} ref={measureRef}>
      <Droppable index={index}>
        <div className={c("accordion-header")}>
          <div className={c("accordion-header-info")}>
            <a
              href={`${URL}${ACTION_LABEL_URL[action.type] || action.type}`}
              style={{ color: "inherit", textDecoration: "none" }}
              title={`${action.type} documentation`}
              className={c("accordion-header-label")}
            >
              <label>{action.type}</label>
              <Icon name={actionsStore.getIconOf(action.type)} />
            </a>
          </div>
          <div className={c("accordion-header-actions")}>
            <Input
              value={action.description}
              placeholder="Action description"
              onChange={(inputValue) => {
                action.description = inputValue;
              }}
              required={true}
              disablePlaceHolderLabel={true}
            />
            <button onClick={() => setAccordionOpen(!accordionOpen)}>
              <Icon
                name={accordionOpen ? "up-chevron-glyph" : "down-chevron-glyph"}
              />
            </button>
            <button
              className={c("accordion-header-remove")}
              onClick={() => {
                handleRemove();
              }}
            >
              <Icon name="cross" />
            </button>
            <div
              className="mobile-option-setting-drag-icon clickable-icon"
              aria-label="Drag to rearrange"
              ref={dragHandleRef}
            >
              <Icon name="lucide-grip-horizontal" />
            </div>
          </div>
        </div>
      </Droppable>
      {
        <div
          ref={bodyRef}
          className={`${c("accordion-body")} ${accordionOpen ? "open" : ""}`}
        >
          <AccordionBody {...props} />
        </div>
      }
    </div>
  );
}

function AccordionBody(props: ActionAccordionProps) {
  const { modal, action } = props;
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const body = bodyRef.current;
    if (body) {
      actionsStore
        .getAction(action.type)
        .settings(bodyRef.current, modal, action);
    }
  }, []);
  return <div ref={bodyRef} />;
}
