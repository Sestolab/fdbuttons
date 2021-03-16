CKEDITOR.plugins.add('fdbuttons', {
	requires: 'dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'fdbuttons,rmfdbuttons',

	init: function(editor){
		editor.addCommand('fdbuttons', new CKEDITOR.dialogCommand('fdbuttonsDialog', {
			allowedContent: 'button[!class,type]; a[!href,!class,target,aria-disabled]; input[!class,!value,!type]'
		}));
		editor.addCommand('removeFDbuttons', {
			exec: function(editor){
				var re = /button|active|disabled|primary|secondary|success|alert|warning|tiny|small|large|hollow|expanded|clear/g;
				editor.getSelection().getStartElement().rmClass(re).removeAttributes(['role', 'type']);
			}
		});

		editor.ui.addButton('fdbuttons', {
			label: editor.lang.fdbuttons.label,
			command: 'fdbuttons'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('fdbuttonsGroup');
			editor.addMenuItems({
				fdbuttonsItem: {
					label: editor.lang.fdbuttons.label,
					icon: 'fdbuttons',
					command: 'fdbuttons',
					group: 'fdbuttonsGroup'
				},
				fdbuttonsRemove: {
					label: editor.lang.fdbuttons.remove,
					icon: 'rmfdbuttons',
					command: 'removeFDbuttons',
					group: 'fdbuttonsGroup'
				}
			});

			editor.contextMenu.addListener(function(element){
				if (element.is('button', 'a', 'input') && !element.matchClass(/badge|label/))
					return {
						fdbuttonsItem: CKEDITOR.TRISTATE_OFF,
						fdbuttonsRemove: element.hasClass('button') ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
					};
			});
		}

		CKEDITOR.dialog.add('fdbuttonsDialog', this.path + 'dialogs/fdbuttons.js');
	}
});

