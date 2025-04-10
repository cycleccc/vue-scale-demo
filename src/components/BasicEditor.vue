<template>
    <div>
        <div>
            <button @click=" insertText ">insert text</button>
            <button @click=" printHtml ">print html</button>
            <button @click=" disable ">disable</button>
        </div>
        <div style="border: 1px solid #ccc; margin-top: 10px">
            <Toolbar :editor=" editorRef " :defaultConfig=" toolbarConfig " :mode=" mode "
                style="border-bottom: 1px solid #ccc" />
            <Editor :defaultConfig=" editorConfig " :mode=" mode " v-model=" valueHtml "
                style="height: 400px; overflow-y: hidden" @onCreated=" handleCreated " @onChange=" handleChange "
                @onDestroyed=" handleDestroyed " @onFocus=" handleFocus " @onBlur=" handleBlur "
                @customAlert=" customAlert " />
        </div>
        <div style="margin-top: 10px">
            <textarea v-model=" valueHtml " readonly style="width: 100%; height: 200px; outline: none"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import '@wangeditor-next/editor/dist/css/style.css';
import {onBeforeUnmount, ref, shallowRef, onMounted} from 'vue';
import {Editor, Toolbar} from '@wangeditor-next/editor-for-vue';
import ScaleParagraph from './ScaleParagraph';
import {Boot} from '@wangeditor-next/editor';
import type { IDomEditor, IEditorConfig } from '@wangeditor-next/editor';

Boot.registerModule(ScaleParagraph);

export default {
    components: {Editor, Toolbar},
    setup () {
        // 编辑器实例，必须用 shallowRef，重要！
        const editorRef = shallowRef();

        // 内容 HTML
        const valueHtml = ref('<p>hello</p>');

        // 模拟 ajax 异步获取内容
        onMounted(() => {
            setTimeout(() => {
                valueHtml.value = '<div data-w-e-type="ScaleParagraph" data-scale-x="1.5"><strong>奥</strong><span style="background-color: rgb(231, 95, 51);"><u><strong>赛</strong></u></span><span style="background-color: rgb(231, 95, 51);"><u><em>奥</em></u></span><span style="color: rgb(255, 122, 69); background-color: rgb(231, 95, 51);"><sup><em>赛</em></sup></span><span style="color: rgb(255, 122, 69);"><sup>奥</sup></span><span style="color: rgb(255, 122, 69);">赛</span></div>';
            }, 1500);
        });

        const toolbarConfig = {
            insertKeys: {
                index: 1,
                keys: ['ScaleParagraph'],
            },
        };
        const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' };

        // 组件销毁时，也及时销毁编辑器，重要！
        onBeforeUnmount(() => {
            const editor = editorRef.value;
            if (editor == null) return;

            editor.destroy();
        });

        // 编辑器回调函数
        const handleCreated = (editor: IDomEditor) => {
            console.log('created', editor);
            editorRef.value = editor; // 记录 editor 实例，重要！
        };
        const handleChange = (editor: IDomEditor) => {
            console.log('change:', editor.getHtml());
        };
        const handleDestroyed = (editor: IDomEditor) => {
            console.log('destroyed', editor);
        };
        const handleFocus = (editor: IDomEditor) => {
            console.log('focus', editor);
        };
        const handleBlur = (editor: IDomEditor) => {
            console.log('blur', editor);
        };
        const customAlert = (info: string, type: string) => {
            alert(`【自定义提示】${ type } - ${ info }`);
        };
        const customPaste = (editor: IDomEditor, event: ClipboardEvent, callback: (result: boolean) => void) => {
            console.log('ClipboardEvent 粘贴事件对象', event);

            // 自定义插入内容
            editor.insertText('xxx');

            // 返回值（注意，vue 事件的返回值，不能用 return）
            callback(false); // 返回 false ，阻止默认粘贴行为
            // callback(true) // 返回 true ，继续默认的粘贴行为
        };

        const insertText = () => {
            const editor = editorRef.value;
            if (editor == null) return;

            editor.insertText('hello world');
        };

        const printHtml = () => {
            const editor = editorRef.value;
            if (editor == null) return;
            console.log(editor.getHtml());
        };

        const disable = () => {
            const editor = editorRef.value;
            if (editor == null) return;
            editor.disable();
        };

        return {
            editorRef,
            mode: 'default',
            valueHtml,
            toolbarConfig,
            editorConfig,
            handleCreated,
            handleChange,
            handleDestroyed,
            handleFocus,
            handleBlur,
            customAlert,
            customPaste,
            insertText,
            printHtml,
            disable,
        };
    },
};
</script>
