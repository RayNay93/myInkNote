import { ItemView, WorkspaceLeaf } from 'obsidian';
import { InteractiveInkSSREditor } from 'iink-ts';
import { text } from 'stream/consumers';


export const VIEW_TYPE_EXAMPLE = 'myInkNoteView';

export class MyInkNoteView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	};

	CONTAINER = this.containerEl.children[1];
	MyScriptContainer = this.CONTAINER.createDiv();
	OPTIONS = {
		configuration: {
			server: {
		// !!! Hier müssen die Keys, die unter https://developer.myscript.com/getting-started/web angefordertwurden anstelle XXX eingefügt werden !!!
				applicationKey: 'XXX',
				hmacKey: 'XXX'
			},
			recognition: {
				lang: "de_DE"
			}
		}
	}
	EDITOR = new InteractiveInkSSREditor(this.MyScriptContainer, this.OPTIONS);
	

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'MyInkNote';
	}

	async onOpen() {
		setTimeout(() => {this.EDITOR.initialize()}, 500);
	}

	async onClose() {
		await this.EDITOR.clear();
	}
}