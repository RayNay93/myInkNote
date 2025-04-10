import { ItemView, WorkspaceLeaf } from 'obsidian';
import { InteractiveInkSSREditor } from 'iink-ts';


export const VIEW_TYPE_EXAMPLE = 'myInkNoteView';

export class MyInkNoteView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	};

	CONTAINER = this.containerEl.children[1].createDiv();
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
	EDITOR = new InteractiveInkSSREditor(this.CONTAINER, this.OPTIONS);
	

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'MyInkNote';
	}

	async onOpen() {
		await this.EDITOR.initialize();
	}

	async onClose() {
		await this.EDITOR.clear();
	}
}