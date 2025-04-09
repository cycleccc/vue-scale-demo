/**
 * @description to html
 * @author wangfupeng
 */

import { SlateElement } from '@wangeditor-next/editor';

import { type ScaleParagraphElement } from './custom-types';

function ScaleParagraphToHtml(
    elem: SlateElement,
    childrenHtml: string,
): string {
    const { scaleX } = elem as ScaleParagraphElement;
    return `<div data-w-e-type="ScaleParagraph" data-scale-x="${scaleX}">${childrenHtml}</div>`;
}

export const ScaleParagraphToHtmlConf = {
    type: 'ScaleParagraph',
    elemToHtml: ScaleParagraphToHtml,
};
