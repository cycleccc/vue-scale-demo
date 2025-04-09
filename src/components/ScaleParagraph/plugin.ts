/**
 * @description editor 插件，重写 editor API
 * @author wangfupeng
 */

import type { IDomEditor } from '@wangeditor-next/editor';

function withScaleParagraph<T extends IDomEditor>(editor: T): T {
    const newEditor = editor;
    return newEditor;
}

export default withScaleParagraph;
