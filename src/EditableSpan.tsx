import {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type Props = {
    value: string,
    onChange:(title: string) => void,
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const turnOnEditMode = () => {
        setEditMode(true);
    };

    const turnOffEditMode = () => {
        setEditMode(false);
        onChange(title)
    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        <>
            {/*{editMode ? (*/}
            {/*    <input value={title}  onChange={onChangeTitle} onBlur={turnOffEditMode} autoFocus/>*/}
            {/*) : (*/}
            {/*    <span onDoubleClick={turnOnEditMode}>{value}</span>*/}
            {/*)}*/}

            {editMode &&  <TextField variant={'outlined'}
                                     value={title}
                                     size={'small'}
                                     onChange={onChangeTitle}
                                     onBlur={turnOffEditMode}
                                     autoFocus/> }
            {!editMode && <span onDoubleClick={turnOnEditMode}>{value}</span> }
        </>
    );
};