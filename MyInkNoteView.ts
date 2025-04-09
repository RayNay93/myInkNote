import { ItemView, WorkspaceLeaf } from 'obsidian';
import { InteractiveInkSSREditor } from 'iink-ts';


export const VIEW_TYPE_EXAMPLE = 'myInkNoteView';

export class MyInkNoteView extends ItemView {

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'MyInkNote';
	}

	async onOpen() {
		const CONTAINER = this.containerEl.children[1].createDiv();
		const OPTIONS = {
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
	};
		let editor = new InteractiveInkSSREditor(CONTAINER, OPTIONS);
		await editor.initialize();
	}

	async onClose() {

	}
}