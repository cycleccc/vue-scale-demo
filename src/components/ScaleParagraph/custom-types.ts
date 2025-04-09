/**
 * @description 自定义 element
 * @author wangfupeng
 */

import { SlateText } from '@wangeditor-next/editor';

// 【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts

export type ScaleParagraphElement = {
    type: 'ScaleParagraph';
    scaleX: string;
    children: SlateText[];
};
