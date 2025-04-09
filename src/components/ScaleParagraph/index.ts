/**
 * @description ScaleParagraph entry
 * @author wangfupeng
 */

import type { IModuleConf } from '@wangeditor-next/editor';

import { ScaleParagraphToHtmlConf } from './elem-to-html';
import { ScaleParagraphMenuConf } from './menu/index';
import { parseHtmlConf } from './parse-elem-html';
import withScaleParagraph from './plugin';
import { renderScaleParagraphConf } from './render-elem';

const ScaleParagraph: Partial<IModuleConf> = {
    renderElems: [renderScaleParagraphConf],
    elemsToHtml: [ScaleParagraphToHtmlConf],
    parseElemsHtml: [parseHtmlConf],
    menus: [ScaleParagraphMenuConf],
    editorPlugin: withScaleParagraph,
};

export default ScaleParagraph;
