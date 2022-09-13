import React, {useEffect, useRef, useState} from 'react';
import ReactQuill,{Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'quill-emoji';
import "quill-emoji/dist/quill-emoji.css";

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register({

},true)

const defaultState = {
    txtDescription: "",
    modules: {
        toolbar: [
            [{'font': []}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline', 'link', 'image'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            //[{ 'indent': '-1'}, { 'indent': '+1' }],
            [{'direction': 'rtl'}],
            [{'align': ['center']}],
            ['emoji'],
            [{'color': []}, {'background': []}],
            ['clean']
        ],
        'emoji-toolbar': true,
        "emoji-textarea": false,
        "emoji-shortname": true,
    },
    formats: {
        toolbar: [
            [{'font': []}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline', 'link', 'image'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            //[{ 'indent': '-1'}, { 'indent': '+1' }],
            [{'direction': 'rtl'}],
            [{'align': ['center']}],
            ['emoji'],
            [{'color': []}, {'background': []}],
            ['clean']
        ]
    },
}

const TextEditor = (props) => {
    let {onSuccess, type, defaultText} = props;
    const [init, setInit] = useState(defaultState);
    let {modules, formats, txtDescription} = init;
    const editor = useRef(null);

    useEffect(() => {
        if (defaultText) {
            setInit({
                ...init,
                txtDescription: defaultText
            });
        }
    }, []);


    const rteChange = (content, delta, source, editor) => {
        setInit({
            ...init,
            txtDescription: content,
            getText: editor.getText(),
            getHtml: editor.getHTML(),
            getLength: editor.getLength(),

        });
        onSuccess(content, type)
    };

    return (
        <div className="textEditor">
            <ReactQuill
                onChange={rteChange}
                theme='snow'
                modules={modules}
                formats={formats}
                value={txtDescription}
            />
        </div>
    );
};

export default TextEditor;