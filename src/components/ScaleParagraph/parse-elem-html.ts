/**
 * @description parse html
 * @author wangfupeng
 */

import {
    type IDomEditor,
    type SlateDescendant,
    SlateText,
} from '@wangeditor-next/editor';

import $, { DOMElement } from '../../utils/dom';
import { type ScaleParagraphElement } from './custom-types';

function parseHtml(
    elem: DOMElement,
    children: SlateDescendant[],
    editor: IDomEditor,
): ScaleParagraphElement {
    const $elem = $(elem);

    children = children.filter(child => {
        if (SlateText.isText(child)) {
            return true;
        }
        if (editor.isInline(child)) {
            return true;
        }
        return false;
    });

    // 无 children ，则用纯文本
    if (children.length === 0) {
        children = [{ text: $elem.text().replace(/\s+/gm, ' ') }];
    }

    return {
        type: 'ScaleParagraph',
        // @ts-ignore
        children,
        scaleX: elem.getAttribute('data-scale-x') || '1',
    };
}

export const parseHtmlConf = {
    selector: 'div[data-w-e-type="ScaleParagraph"]',
    parseElemHtml: parseHtml,
};
