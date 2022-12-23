import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (nextTitle: string) => void

}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        console.log(props.changeTitle)
        props.changeTitle(title)
        setIsEditMode(false)
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && offEditMode()
    }
    return (
        isEditMode
            ? <TextField id="outlined-basic"
                         variant="outlined"
                         size={'small'}
                         style={{maxWidth: '150px'}}
                         value={title}
                         onBlur={offEditMode}
                         onChange={onChangeSetLocalTitle}
                         onKeyDown={onKeyPressHandler}
                         autoFocus
            />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
})
