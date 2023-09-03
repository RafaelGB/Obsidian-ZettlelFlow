import { AbstractHandlerClass } from "architecture/patterns";
import { Setting } from "obsidian";
import { t } from "architecture/lang";
import { PromptElement, StepBuilderModal } from "zettelkasten";
import { ElementTypeCalendarHandler } from "./ElementTypeCalendarHandler";

export class ElementTypePromptHandler extends AbstractHandlerClass<StepBuilderModal>  {
    name = t('step_builder_element_type_prompt_title');
    description = t('step_builder_element_type_prompt_description');
    handle(modal: StepBuilderModal): StepBuilderModal {
        const { info } = modal;
        const { element, contentEl } = info;
        const { type } = element;
        if (type === 'prompt') {
            const { key, label, zone, placeholder } = element as PromptElement;
            contentEl.createEl('h3', { text: this.name });
            contentEl.createEl('p', { text: this.description });
            new Setting(contentEl)
                .setName(t("step_builder_element_type_zone_title"))
                .setDesc(t("step_builder_element_type_zone_description"))
                .addDropdown(dropdown => {
                    dropdown
                        .addOption('frontmatter', t('step_builder_element_type_zone_frontmatter'))
                        .addOption('body', t('step_builder_element_type_zone_body'))
                        .setValue(zone !== undefined ? zone : 'frontmatter')
                        .onChange(async (value) => {
                            element.zone = value;
                        });
                });

            new Setting(contentEl)
                .setName(t("step_builder_element_type_prompt_key_title"))
                .setDesc(t("step_builder_element_type_prompt_key_description"))
                .addText(text => {
                    text
                        .setValue(key || ``)
                        .onChange(async (value) => {
                            element.key = value;
                        });
                });

            new Setting(contentEl)
                .setName(t("step_builder_element_type_prompt_label_title"))
                .setDesc(t("step_builder_element_type_prompt_label_description"))
                .addText(text => {
                    text
                        .setValue(label || ``)
                        .onChange(async (value) => {
                            element.label = value;
                        });
                });

            new Setting(contentEl)
                .setName(t("step_builder_element_type_prompt_placeholder_title"))
                .setDesc(t("step_builder_element_type_prompt_placeholder_description"))
                .addTextArea(text => {
                    text
                        .setValue(placeholder || ``)
                        .onChange(async (value) => {
                            element.placeholder = value;
                        });
                });
        }

        return this.goNext(modal);
    }

    public manageNextHandler(): void {
        this.nextHandler = new ElementTypeCalendarHandler();
    }
}