import React from "react";
import { NoteBuilderType } from "./model/NoteBuilderModel";
import { FileService } from "architecture/plugin";
import { c } from "architecture";
import { t } from "architecture/lang";

export function WelcomeTutorial(noteBuilderType: NoteBuilderType) {
  const { plugin, modal } = noteBuilderType;
  const { settings } = plugin;
  const { canvasFilePath } = settings;
  return (
    <div className={c("welcome-tutorial")}>
      <h1>{t("welcome_tutorial_welcome_msg")}</h1>
      <span>Steps to configure your workflow</span>
      <ol type="1">
        <li>
          <button
            onClick={() => {
              plugin.app.setting.open();
              plugin.app.setting.openTabById("zettelflow");
            }}
          >
            {t("welcome_tutorial_open_settings")}
          </button>
        </li>
        {canvasFilePath ? (
          <li>
            <button
              onClick={async () => {
                await FileService.openFile(canvasFilePath);
                modal.close();
              }}
            >
              {t("welcome_tutorial_open_canvas")}
            </button>
          </li>
        ) : (
          <p>{t("welcome_tutorial_canvas_not_set")}</p>
        )}
        <li>
          <p>{t("welcome_tutorial_add_steps")}</p>
        </li>
        <li>
          <p>{t("welcome_tutorial_steps_guide")}</p>
        </li>
        <li>
          <a href="https://github.com/RafaelGB/Obsidian-ZettelFlow/tree/main/WorkFlow%20Test">
            {t("welcome_tutorial_steps_examples")}
          </a>
        </li>
      </ol>
    </div>
  );
}
