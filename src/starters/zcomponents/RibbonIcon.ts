import { PluginComponent } from "architecture";
import { log } from "architecture";
import { t } from "architecture/lang";
import { canvas } from "architecture/plugin/canvas";
import ZettelFlow from "main";
import { addIcon } from "obsidian";
import { SelectorMenuModal } from "zettelkasten";

export class RibbonIcon extends PluginComponent {
    public static ID = 'zettelflow-ribbon-icon';
    public static BRIDGE = 'zettelflow-bridge-icon';
    public static LEAF = 'zettelflow-leaf-icon';
    public static TEMPLATE = 'zettelflow-template-icon';
    public static ACTION = 'zettelflow-action-icon';
    private ribbonTitle = 'Create a new Zettel Note';
    constructor(private plugin: ZettelFlow) {
        super(plugin);
    }

    onLoad(): void {
        addIcon(RibbonIcon.ID, '<g transform="translate(0,95) scale(0.025,-0.0275)" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M904 3256 l6 -233 -59 -22 c-77 -28 -108 -50 -252 -178 -66 -60 -144 -125 -172 -146 -29 -21 -79 -64 -111 -95 -33 -31 -78 -70 -101 -87 -24 -16 -81 -64 -128 -105 l -86 -75 -1 -1145 c0 -879 3 -1149 12 -1158 9 -9 455 -12 1945 -12 l1933 0 17 27 c17 26 18 107 21 1433 2 937 -1 1417 -7 1440 -6 20 -24 49 -41 65 l -31 30 -352 5 -352 5 -3 243 -2 242 -1122 0 -1121 0 7 -234z m2124 -428 l2 -547 -22 -3 c -13 -2 -58 -2 -100 0 l -78 4 0 364 0 364 -805 0 -805 0 0 -365 0 -365 -95 0 -95 0 0 550 0 550 998 -2 997 -3 3 -547z m572 -1004 l0 -115 -57 -52 c -32 -28 -119 -110 -193 -181 -367 -352 -331 -323 -380 -301 -45 21 -168 17 -196 -5 -13 -12 -24 -4 -77 56 -34 38 -90 96 -124 129 -35 33 -63 65 -63 71 0 7 9 31 20 55 39 86 17 196 -48 251 -18 15 -56 32 -85 38 -45 11 -62 10 -110 -4 -119 -35 -157 -112 -135 -276 10 -79 10 -91 -5 -112 -17 -23 -40 -55 -145 -204 -91 -129 -143 -189 -161 -186 -68 13 -122 13 -149 -1 -30 -15 -31 -14 -73 32 -73 79 -219 251 -229 270 -7 13 -4 35 10 74 27 75 25 123 -5 183 -35 70 -86 99 -177 99 -58 0 -72 -4 -109 -30 -61 -43 -78 -72 -85 -141 -5 -45 -2 -76 11 -116 l17 -55 -71 -109 c -38 -60 -99 -154 -134 -209 -35 -55 -90 -140 -123 -189 -32 -49 -73 -116 -90 -148 -17 -32 -40 -68 -51 -81 -12 -12 -31 -40 -43 -61 -12 -21 -38 -60 -59 -85 -21 -25 -53 -73 -71 -106 -38 -67 -45 -75 -77 -75 l -23 0 0 850 0 850 1645 0 1645 0 0 -116z m0 -926 l0 -671 -182 6 c -99 4 -804 7 -1566 7 -1364 0 -1384 0 -1371 19 44 61 155 227 158 236 5 16 53 88 76 115 12 14 34 48 50 75 15 28 53 88 84 135 30 47 94 148 142 225 48 77 96 154 106 170 13 20 25 29 39 26 10 -2 52 -3 91 -4 l73 0 52 -57 c49 -53 78 -86 198 -222 l42 -47 -12 -49 c -17 -65 -6 -131 31 -182 49 -67 81 -81 174 -78 94 4 120 18 159 88 35 65 41 109 22 174 l -16 56 28 53 c16 30 57 91 91 136 34 45 73 99 86 119 14 20 42 59 63 87 l39 49 94 -3 c52 -1 99 -6 105 -9 6 -4 38 -38 71 -77 33 -38 83 -94 111 -124 l51 -55 -6 -68 c -7 -86 13 -146 65 -186 102 -79 224 -64 296 36 29 41 31 50 31 129 l1 85 54 49 c30 27 64 58 75 70 11 11 46 46 78 77 33 31 94 92 138 135 44 42 83 77 87 77 4 0 23 16 42 35 19 19 38 35 43 35 4 0 7 -302 7 -672z"/> </g>');
        addIcon(RibbonIcon.BRIDGE, `<g transform="translate(-15,125) scale(0.025,-0.025)" stroke="none"> <path d="M640 2875 l0 -745 -215 0 -215 0 0 -210 0 -210 215 0 215 0 0 -215 0 -215 215 0 215 0 0 215 0 215 1490 0 1490 0 0 -215 0 -215 215 0 215 0 0 215 0 215 215 0 215 0 0 210 0 210 -215 0 -215 0 0 745 0 745 -215 0 -215 0 0 -152 0 -153 -78 -61 c-238 -188 -531 -331 -836 -409 -211 -53 -343 -69 -576 -69 -233 0 -365 16 -576 69 -304 78 -591 219 -841 414 l-72 56 -1 153 0 152 -215 0 -215 0 0 -745z m556 83 c60 -40 151 -93 202 -118 l92 -44 0 -333 0 -333 -210 0 -210 0 0 456 c0 250 3 453 8 451 4 -3 57 -38 118 -79z m2854 -373 l0 -455 -210 0 -210 0 0 333 1 332 91 45 c97 47 203 111 277 167 24 18 45 33 47 33 2 0 4 -205 4 -455z m-2221 80 c48 -14 134 -36 191 -49 l105 -23 3 -232 2 -231 -210 0 -210 0 0 286 c0 261 1 286 16 280 9 -4 56 -18 103 -31z m1581 -250 l0 -285 -210 0 -210 0 2 232 3 232 45 9 c71 13 271 65 315 81 22 8 43 15 48 15 4 1 7 -127 7 -284z m-640 -67 l0 -218 -210 0 -210 0 0 218 0 217 210 0 210 0 0 -217z"/></g>`);
        addIcon(RibbonIcon.LEAF, '<g transform="translate(-15,110) scale(0.50,-0.50)" stroke="none"> <path d="M113 205 c-73 -31 -100 -86 -68 -132 10 -14 12 -24 5 -28 -13 -8 -13 -25 -1 -25 16 0 73 62 87 95 10 22 13 25 13 10 0 -11 -6 -31 -14 -45 -8 -14 -14 -31 -15 -37 0 -22 40 -14 67 13 22 22 25 32 20 70 -5 47 -30 94 -50 94 -6 -1 -27 -7 -44 -15z" /></g>');
        addIcon(RibbonIcon.TEMPLATE, '<g transform = "translate(-10,110) scale(0.115,-0.115)" stroke = "none" > <path d="M84 907 c-2 -7 -3 -60 -2 -118 l3 -104 415 0 415 0 0 115 0 115 -413 3 c -336 2 -413 0 -418 -11z m796 -107 l0 -80 -380 0 -380 0 0 80 0 80 380 0 380 0 0 -80z" /> <path d="M85 628 c-3 -8 -4 -132 -3 -278 l3 -265 255 0 255 0 0 275 0 275 -253 3 c -198 2 -254 0 -257 -10z m475 -268 l0 -240 -220 0 -220 0 0 240 0 240 220 0 220 0 0 -240z"/> <path d="M644 627 c-3 -8 -4 -43 -2 -78 l3 -64 135 0 135 0 0 75 0 75 -133 3c -105 2 -133 0 -138 -11z m236 -67 l0 -40 -100 0 -100 0 0 40 0 40 100 0 100 0 0 -40z" /> <path d="M644 427 c-3 -8 -4 -43 -2 -78 l3 -64 135 0 135 0 0 75 0 75 -133 3c -105 2 -133 0 -138 -11z m236 -67 l0 -40 -100 0 -100 0 0 40 0 40 100 0 100 0 0 -40z" /><path d="M644 227 c-3 -8 -4 -43 -2 -78 l3 -64 135 0 135 0 0 75 0 75 -133 3c -105 2 -133 0 -138 -11z m236 -67 l0 -40 -100 0 -100 0 0 40 0 40 100 0 100 0 0 -40z"/></g>');
        addIcon(RibbonIcon.ACTION, '<g transform = "translate(-10,120) scale(0.135,-0.135)" stroke = "none"><path d="M807 862 c-16 -17 -15 -20 11 -45 28 -27 29 -27 46 -8 10 11 16 30 14 43 -4 30 -47 37 -71 10z" /><path d="M614 667 c-174 -176 -216 -246 -132 -218 22 7 87 65 186 164 l153 153 -29 27 -28 27 -150 -153z"/> <path d="M195 765 l-25 -24 0 -261 0 -261 25 -24 24 -25 261 0 261 0 24 25 25 24 0 222 0 223 -30 -29 -30 -29 0 -188 0 -188 -250 0 -250 0 0 250 0 250 190 0 190 0 32 30 33 29 -228 1 -228 0 -24 -25z" /></g>');
        this.plugin.addRibbonIcon(RibbonIcon.ID, this.ribbonTitle, this.ribbonIconCallback);
        this.plugin.addCommand({
            id: 'open-workflow',
            name: t('command_open_workflow'),
            callback: async () => {
                this.ribbonIconCallback();
            }
        });
        log.info('RibbonIcon loaded');
    }
    private ribbonIconCallback = async () => {
        if (this.plugin.settings.canvasFilePath) {
            await canvas.flows.update(this.plugin.settings.canvasFilePath);
        }
        new SelectorMenuModal(this.plugin.app, this.plugin).open();
    }
}