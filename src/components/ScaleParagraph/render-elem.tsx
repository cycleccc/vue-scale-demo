/**
 * @description render ScaleParagraph
 * @author wangfupeng
 */

import { type IDomEditor, type SlateElement } from '@wangeditor-next/editor';
import { h, type VNode } from 'snabbdom';
import { type ScaleParagraphElement } from './custom-types';

/**
 * render ScaleParagraph elem
 * @param elemNode slate elem
 * @param children children
 * @param editor editor
 * @returns vnode
 */
function renderScaleParagraph(
    elemNode: SlateElement,
    children: VNode[] | null,
    _editor: IDomEditor,
): VNode {
    const { scaleX } = elemNode as ScaleParagraphElement;

    const vnode = h('div', [
        h(
            'span',
            {
                style: {
                    transform: `scaleX(${scaleX})`,
                    display: 'inline-block',
                },
            },
            children,
        ),
    ]);

    return vnode;
}

const renderScaleParagraphConf = {
    type: 'ScaleParagraph',
    renderElem: renderScaleParagraph,
};

export { renderScaleParagraphConf };
