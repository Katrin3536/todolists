import {ChangeEvent,KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
    onCreateItem:(title:string)=>void
}

export const CreateItemForm = ({onCreateItem}:Props) => {

    const [itemTitle, setItemTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // const inputRef = useRef<HTMLInputElement>(null);

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim();
        if (trimmedTitle != '') {
            onCreateItem(trimmedTitle);
            setItemTitle('');
        } else {
            setError('Title is required');
        }
    };

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value);
        setError(null);
    };

    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.key === 'Enter' && isTitleValid) {
        if (e.key === 'Enter') {
            createItemHandler();
        }
    };
  return (
      <div>
          <TextField label={'Enter a title'}
                     variant={'outlined'}
                     // className={error ? 'error' : ''}
                     value={itemTitle}
                     size={'small'}
                     error={!!error}
                     helperText={error}
                     onChange={changeItemTitleHandler}
                     onKeyDown={createItemOnEnterHandler}/>

          {/*<input className={error ? 'error' : ''}*/}
          {/*       value={itemTitle}*/}
          {/*       onChange={changeItemTitleHandler}*/}
          {/*       onKeyDown={createItemOnEnterHandler}/>*/}

          <IconButton onClick={createItemHandler} color={'primary'}>
              <AddBoxIcon />
          </IconButton>

          {/*{error && <div className={'error-message'}>{error}</div>}*/}

      </div>
  )
}

{/*<Button title={'+'} onClick={()=>{*/}
{/*    if(inputRef.current){*/}
{/*        createTask(inputRef.current.value)*/}
{/*        inputRef.current.value = ""*/}
{/*    }}}/>*/}
{/*<input ref={inputRef}/>*/}
{/*<Button title={'+'} onClick={createTaskHandler} disabled={!isTitleValid}/>*/}
{/*{!error && taskTitle.length === 0 && <div>Enter task title</div>}*/}
{/*{!error && isTitleValid &&  <div> Min title length 1 characters</div>}*/}
{/*{!error && taskTitle.length > 10 && <div style={{color:"red"}}>Max title length 10 characters</div>}*/}

// <Button title={'+'} onClick={createItemHandler}/>