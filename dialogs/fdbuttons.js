CKEDITOR.dialog.add('fdbuttonsDialog', function(editor){
	var lang = editor.lang.fdbuttons;

	return {
		title: lang.title,
		minWidth: 450,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				label: lang.tabBasic,
				elements: [
					{
						id: 'txt',
						type: 'text',
						required: true,
						label: lang.txtLabel,
						setup: function(element){
							this.setValue(element.getText().trim());
						},
						commit: function(element){
							element.setText(this.getValue() || 'Button');
						}
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'style',
								type: 'select',
								label: lang.styleLabel,
								items: [
									[lang.btnDefault, ''],
									[lang.btnPrimary, 'primary'],
									[lang.btnSecondary, 'secondary'],
									[lang.btnSuccess, 'success'],
									[lang.btnAlert, 'alert'],
									[lang.btnWarning, 'warning']
								],
								setup: function(element){
									this.setValue(element.matchClass(new RegExp(this.getValues().join('|'))) || '');
								},
								commit: function(element){
									if (!element.hasClass(this.getValue()))
										element.toggleClass(this.getValue(), this.getValues());
								}
							},
							{
								id: 'size',
								type: 'select',
								label: lang.sizeLabel,
								items: [
									[lang.btnN, ''],
									[lang.btnTiny, 'tiny'],
									[lang.btnSmall, 'small'],
									[lang.btnLarge, 'large']
								],
								setup: function(element){
									this.setValue(element.matchClass(new RegExp(this.getValues().join('|'))) || '');
								},
								commit: function(element){
									if (!element.hasClass(this.getValue()))
										element.toggleClass(this.getValue(), this.getValues());
								}
							}
						]
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'disabled',
								type: 'checkbox',
								label: lang.disabled,
								setup: function(element){
									this.setValue(element.hasClass('disabled') || element.hasAttribute('disabled'));
								}
							},
							{
								id: 'hollow',
								type: 'checkbox',
								label: lang.hollowLabel,
								setup: function(element){
									this.setValue(element.hasClass('hollow'));
								},
								commit: function(element){
									element.toggleClass(element.hasClass('hollow') != this.getValue() ? 'hollow' : null);
								}
							}
						]
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'expanded',
								type: 'checkbox',
								label: lang.expandedLabel,
								setup: function(element){
									this.setValue(element.hasClass('expanded'));
								},
								commit: function(element){
									element.toggleClass(element.hasClass('expanded') != this.getValue() ? 'expanded' : null);
								}
							},
							{
								id: 'clearStyle',
								type: 'checkbox',
								label: lang.clear,
								setup: function (element){
									this.setValue(element.hasClass('clear'));
								},
								commit: function (element){
									element.toggleClass(element.hasClass('clear') != this.getValue() ? 'clear' : null);
								}
							}
						]
					}
				]
			},

			{
				id: 'tab-link',
				label: lang.tabLink,
				elements: [
					{
						id: 'url',
						type: 'text',
						label: 'URL',
						setup: function(element){
							this.setValue(element.getAttribute('href'));
						},
						commit: function(element){
							if (this.getValue()){
								element.renameNode('a');
								element.setAttribute('href', this.getValue());
								element.removeAttributes(['value', 'disabled']);
								if (this.getDialog().getValueOf('tab-basic', 'disabled') != element.hasClass('disabled'))
									element.toggleClass('disabled').toggleAttribute('aria-disabled');
							}
						}
					},
					{
						id: 'target',
						type: 'select',
						label: lang.targetLabel,
						items: [
							[lang.notSet, ''],
							[lang.targetBlank, '_blank'],
							[lang.targetTop, '_top'],
							[lang.targetSelf, '_self'],
							[lang.targetParent, '_parent']
						],
						setup: function(element){
							this.setValue(element.getAttribute('target') || '');
						},
						commit: function(element){
							if (element.is('a') && element.getAttribute('target') != (this.getValue() || null))
								element.toggleAttribute('target', this.getValue());
						}
					},
					{
						id: 'download',
						type: 'checkbox',
						label: lang.downloadLabel,
						setup: function(element){
							this.setValue(element.hasAttribute('download'));
						},
						commit: function(element){
							if (element.is('a') && element.hasAttribute('download') != this.getValue())
								element.toggleAttribute('download');
						}
					}
				]
			},

			{
				id: 'tab-advanced',
				label: lang.tabAdvanced,
				elements: [
					{
						id: 'icon',
						type: 'text',
						label: lang.icon,
						setup: function(element){
							if (element.getFirst().$.nodeName == 'SPAN')
								this.setValue(element.getFirst().getAttribute('class'));
						},
						commit: function(element){
							if(this.getValue() && !this.getDialog().getValueOf('tab-advanced', 'input')){
								var icon = editor.document.createElement('i');
								icon.setHtml('&nbsp;');
								icon.insertBefore(element.getFirst());
								icon.setAttribute('class', this.getValue());
							}
						}
					},
					{
						type: 'hbox',
						children: [
							{
								id: 'id',
								type: 'text',
								label: 'id',
								setup: function(element){
									this.setValue(element.getId() || '');
								},
								commit: function(element){
									if (element.getId() != (this.getValue() || null))
										element.toggleAttribute('id', this.getValue());
								}
							},
							{
								id: 'name',
								type: 'text',
								label: 'name',
								setup: function(element){
									this.setValue(element.getNameAtt() || '');
								},
								commit: function(element){
									if (element.getNameAtt() != (this.getValue() || null))
										element.toggleAttribute('name', this.getValue());
								}
							},
							{
								id: 'type',
								type: 'select',
								width: '100%',
								label: 'type',
								items: [
									['button'],
									['submit'],
									['reset'],
									['checkbox'],
									['radio'],
								],
								default: 'button',
								setup: function(element){
									this.setValue(element.getAttribute('type') || 'button');
								},
								commit: function(element){
									if (element.getAttribute('type') != (this.getValue() || null))
										element.toggleAttribute('type', this.getValue());
								}
							}
						]
					},
					{
						type: 'hbox',
						widths: ['25%', '75%'],
						children: [
							{
								id: 'event',
								type: 'select',
								widths: ['0', '100%'],
								labelLayout: 'horizontal',
								items: [
									['onchange'],
									['onclick'],
									['onmouseover'],
									['onmouseout'],
									['onkeydown'],
									['onload']
								],
								default: 'onclick',
								setup: function(element){
									this.setValue(element.matchAttribute(new RegExp(this.getValues().join('|'))) || 'onclick');
								},
								onChange: function(){
									this.getDialog().getContentElement('tab-advanced', 'evalue').setup(this.getDialog().element);
								}
							},
							{
								id: 'evalue',
								type: 'text',
								label: '=',
								labelLayout: 'horizontal',
								labelStyle: 'display:block;padding: 4px 6px;',
								widths: ['1%', '99%'],
								setup: function(element){
									this.setValue(element.getAttribute(this.getDialog().getValueOf('tab-advanced', 'event')) || '');
								},
								commit: function(element){
									var event = this.getDialog().getValueOf('tab-advanced', 'event');
									if (element.getAttribute(event) != (this.getValue() || null))
										element.toggleAttribute(event, this.getValue());
								},
								onChange: function(){
									this.commit(this.getDialog().element);
								}
							}
						]
					},
					{
						id: 'input',
						type: 'checkbox',
						label: lang.inputTagLabel,
						setup: function(element){
							this.setValue(element.is('input'));
						},
						commit: function(element){
							if (this.getDialog().getValueOf('tab-link', 'url'))
								return;
							if (this.getValue()){
								element.renameNode('input');
								element.setAttribute('value', element.getText());
							}else{
								element.removeAttribute('value');
								element.renameNode('button');
							}
							element.removeAttributes(['href', 'role', 'target', 'aria-disabled']);
							if (this.getDialog().getValueOf('tab-basic', 'disabled') != element.hasAttribute('disabled'))
									element.removeClass('disabled').toggleAttribute('disabled');
						},
						onChange: function(){
							if (this.hasFocus() || this.isChanged())
								this.getDialog().getContentElement('tab-advanced', 'icon').toggleState();
						}
					}
				]
			}
		],

		onShow: function(){
			var element = editor.getSelection().getStartElement();
			if (element)
				element = element.getAscendant({'button':1, 'a':1, 'input':1}, true);
			if (!element){
				element = editor.document.createElement('button');
				this.insertMode = true;
			}else
				this.insertMode = false;
			this.element = element;
			if (!this.insertMode)
				this.setupContent(this.element);
		},

		onOk: function(){
			this.element.toggleClass(!this.element.hasClass('button') ? 'button' : null);
			this.commitContent(this.element);
			if (this.insertMode)
				editor.insertElement(this.element);
		}
	};
});

