import {
    DomEditor,
    type ISelectMenu,
    type IDomEditor,
    t,
    SlateEditor,
    SlateElement,
    SlateTransforms,
    SlateNode,
} from '@wangeditor-next/editor';
import { type ScaleParagraphElement } from '../custom-types';

const CHECK_BOX_SVG =
    '<svg t="1744036376801" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2676" width="200" height="200"><path d="M896 128h-341.333333v85.333333h170.666666v85.333334h85.333334v170.666666h85.333333V128z m-170.666667 170.666667h-85.333333v85.333333h-85.333333v85.333333h85.333333V384h85.333333V298.666667z m-341.333333 341.333333h85.333333v-85.333333H384v85.333333H298.666667v85.333333h85.333333v-85.333333z m-170.666667-85.333333v170.666666h85.333334v85.333334H213.333333h256v85.333333H128v-341.333333h85.333333z" p-id="2677"></path></svg>';

class ScaleParagraphMenu implements ISelectMenu {
    readonly title = t('ScaleParagraph.ScaleParagraph');

    readonly iconSvg = CHECK_BOX_SVG;

    readonly tag = 'select';

    /**
     * 获取匹配的 node 节点
     * @param editor editor
     */
    private getMatchNode(editor: IDomEditor): SlateNode | null {
        const [nodeEntry] = SlateEditor.nodes(editor, {
            match: n => {
                const type = DomEditor.getNodeType(n);

                // line-height 匹配如下类型的 node
                if (type.startsWith('ScaleParagraph')) {
                    return true;
                }
                return false;
            },
            universal: true,
            mode: 'highest', // 匹配最高层级
        });

        if (nodeEntry == null) {
            return null;
        }
        return nodeEntry[0];
    }

    getOptions(editor: IDomEditor) {
        // TS 语法
        // getOptions(editor) {            // JS 语法
        const options = [
            { value: '0.5', text: '0.5' },
            { value: '1', text: '1', selected: true },
            { value: '1.5', text: '1.5' },
            { value: '2.0', text: '2.0' },
        ];
        // 设置 selected
        const curValue = this.getValue(editor);
        if (!curValue) {
            options[1].selected = true;
        } else {
            options.forEach(opt => {
                if (opt.value === curValue) {
                    opt.selected = true;
                } else {
                    opt.selected = undefined;
                }
            });
        }

        return options;
    }

    getValue(editor: IDomEditor): string | boolean {
        // 无需获取 val

        const node = this.getMatchNode(editor);

        if (node == null) {
            return '';
        }
        if (!SlateElement.isElement(node)) {
            return '';
        }

        return (node as ScaleParagraphElement).scaleX || '';
    }

    isActive(editor: IDomEditor): boolean {
        return !!DomEditor.getSelectedNodeByType(editor, 'ScaleParagraph');
    }

    isDisabled(editor: IDomEditor): boolean {
        return false;
    }

    exec(editor: IDomEditor, value: string | boolean) {
        if (value === '1') {
            SlateTransforms.setNodes(editor, {
                type: 'paragraph',
            });
        } else {
            SlateTransforms.setNodes(editor, {
                type: 'ScaleParagraph',
                scaleX: value,
            });
        }
    }
}

export default ScaleParagraphMenu;
