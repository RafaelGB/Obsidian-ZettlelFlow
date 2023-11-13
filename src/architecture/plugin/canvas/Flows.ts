import { ObsidianApi, log } from "architecture";
import { Flow, FlowNode, Flows } from "./typing";
import { AllCanvasNodeData, CanvasData, CanvasFileData, CanvasTextData } from "obsidian/canvas";
import { FileService } from "../services/FileService";
import { Notice, TFile } from "obsidian";
import { YamlService } from "../services/YamlService";
import { FrontmatterService } from "../services/FrontmatterService";
import { StepSettings } from "zettelkasten";
import { getCanvasColor } from "./shared/Color";

type EdgeInfo = {
    key: string;
    tooltip: string | undefined
}

export class FlowsImpl implements Flows {
    private flows: Map<string, Flow>;

    constructor() {
        this.flows = new Map();
    }

    get = (id: string) => {
        const potentialFlow = this.flows.get(id);
        if (!potentialFlow) {
            log.error(`Flow ${id} not found`);
            throw new Error(`Flow ${id} not found`);
        }
        return potentialFlow;
    }

    add = async (canvasPath: string) => {
        const canvasFile = await FileService.getFile(canvasPath);
        if (!canvasFile) {
            throw new Error(`Canvas file ${canvasPath} not found`);
        }
        const content = await FileService.getContent(canvasFile);
        const data: CanvasData = JSON.parse(content);
        const flow = new FlowImpl(data, canvasFile);
        this.flows.set(canvasFile.path, flow);
        return flow;
    }

    update = async (canvasPath: string) => {
        const flow = this.flows.get(canvasPath);
        if (!flow) {
            log.info(`Flow ${canvasPath} not found, loading...`);
            return await this.add(canvasPath);
        }
        return flow;
    }

    delete = (id: string) => {
        return this.flows.delete(id);
    }
}

export class FlowImpl implements Flow {
    private nodes: Map<string, AllCanvasNodeData>;
    constructor(public data: CanvasData, private file: TFile) {
        this.nodes = data.nodes.reduce((map, obj) => {
            map.set(obj.id, obj);
            return map;
        }, new Map<string, AllCanvasNodeData>());
    }


    get = async (nodeId: string) => {
        const node = this.nodes.get(nodeId);
        if (!node) {
            throw new Error(`Node ${nodeId} not found`);
        }
        switch (node.type) {
            case "text":
                const textNode = YamlService.instance(node.text);
                return this.populateNode(node, textNode.getZettelFlowSettings());
            case "file":
                const file = await FileService.getFile(node.file);
                if (!file) {
                    throw new Error(`File ${node.file} not found`);
                }
                const fileNode = FrontmatterService.instance(file);
                return this.populateNode(node, fileNode.getZettelFlowSettings());
            default:
                throw new Error(`Node ${nodeId} not supported`);
        }
    }

    editTextNode = async (nodeId: string, text: string) => {
        const node = this.data.nodes.find(node => node.id === nodeId);
        if (!node) {
            throw new Error(`Node ${nodeId} not found`);
        }
        node.text = text;
        await this.save();
    }

    childrensOf = async (nodeId: string) => {
        const { edges } = this.data;
        const childrenKeys: EdgeInfo[] = edges.filter(edge => edge.fromNode === nodeId).map(edge => ({ key: edge.toNode, tooltip: edge.label }));
        return this.nodesFrom(childrenKeys);
    }

    parentsOf = async (nodeId: string) => {
        const { edges } = this.data;
        const parentKeys = edges.filter(edge => edge.toNode === nodeId).map(edge => ({ key: edge.fromNode, tooltip: edge.label }));
        return this.nodesFrom(parentKeys);
    }

    rootNodes = async () => {
        // Map nodes to check if they are root
        const rootNodes: FlowNode[] = [];
        const { nodes } = this.data;
        nodes.forEach(async node => {
            switch (node.type) {
                case "text":
                    const textNode = YamlService.instance(node.text);
                    if (textNode.isRoot()) {
                        const flowNode = textNode.getZettelFlowSettings();
                        rootNodes.push(this.populateNode(node, flowNode));
                    }
                    break;
                case "file":
                    const file = await FileService.getFile(node.file);
                    if (!file) {
                        throw new Error(`File ${node.file} not found`);
                    }
                    const fileNode = FrontmatterService.instance(file);
                    if (fileNode.equals("zettelFlowSettings.root", true)) {
                        const flowNode = fileNode.getZettelFlowSettings();
                        rootNodes.push(this.populateNode(node, flowNode));
                    }
            }
        });
        return rootNodes;
    }

    copy = async (nodeId: string) => {

    }

    paste = async (nodeId: string) => {

    }

    private nodesFrom(edgeInfo: EdgeInfo[]): FlowNode[] {
        const flowNodes: FlowNode[] = [];
        edgeInfo.forEach(async edge => {
            const node = this.nodes.get(edge.key);
            if (node) {
                switch (node.type) {
                    case "text":
                        const textNode = YamlService.instance(node.text);
                        flowNodes.push(this.populateNode(node, textNode.getZettelFlowSettings(), edge.tooltip));
                        break;
                    case "file":
                        const file = await FileService.getFile(node.file);
                        if (file) {
                            const fileNode = FrontmatterService.instance(file);
                            flowNodes.push(this.populateNode(node, fileNode.getZettelFlowSettings(), edge.tooltip));
                        }
                        break;
                }
            }
        });
        return flowNodes;
    }

    private async save() {
        await ObsidianApi.vault()
            .modify(this.file, JSON.stringify(this.data, null, 2))
            .catch(error => {
                const errorString = `Error saving canvas on ${this.file.path}: ${error}`;
                log.error(errorString);
                new Notice(errorString);
            });
    }

    private populateNode(data: CanvasTextData | CanvasFileData, node: StepSettings, tooltip?: string): FlowNode {
        return {
            ...node,
            type: data.type,
            color: getCanvasColor(data.color),
            id: data.id,
            path: data.type === "file" ? data.file : undefined,
            tooltip
        }
    }
}