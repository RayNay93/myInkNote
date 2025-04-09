import { Plugin, WorkspaceLeaf } from 'obsidian';
import { MyInkNoteView, VIEW_TYPE_EXAMPLE } from './MyInkNoteView';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		this.registerView(VIEW_TYPE_EXAMPLE,
			(leaf) => new MyInkNoteView(leaf));
		
		await this.loadSettings();

		

		this.addRibbonIcon('dice', 'Sample Plugin', () => {
			this.activateView();
		});

	}

	onunload() {
	
	}

	async activateView(){
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			await leaf?.setViewState({type: VIEW_TYPE_EXAMPLE, active: true});
		}
		
		if (leaf != null){
		workspace.revealLeaf(leaf);
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

