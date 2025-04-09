/**
 * @description ScaleParagraph menu entry
 * @author wangfupeng
 */

import ScaleParagraphMenu from './ScaleParagraph';

export const ScaleParagraphMenuConf = {
    key: 'ScaleParagraph',
    factory() {
        return new ScaleParagraphMenu();
    },
};
