import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import {IconButton, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [newItemTitle, setNewItemTitle] = useState('');
    const [error, setError] = useState<boolean | null>(false);
    const errorText = <div>Title is required</div>
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
        error && setError(false)
    }
    const addItem = () => {
        const trimmedTitle = newItemTitle.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>

            <TextField id="standard-basic"
                       size={'small'}
                       style={{marginBottom: '10px'}}
                       className={error ? s.error : ''}
                       value={newItemTitle}
                       label="Title"
                       onChange={onChangeSetLocalTitle}
                       onKeyDown={onKeyPressHandler}
            />

            <IconButton onClick={addItem} size={'small'}>
                <AddOutlinedIcon></AddOutlinedIcon>
            </IconButton>
            {error && <div className={s.errorMessage}>{errorText}</div>}
        </div>
    );
});

