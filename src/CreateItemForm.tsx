import {Button} from './Button.tsx';
import {ChangeEvent,KeyboardEvent, useState} from 'react';

type Props = {
    onCreateItem:(title:string)=>void
}

export const CreateItemForm = ({onCreateItem}:Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // const inputRef = useRef<HTMLInputElement>(null);

    const createItemHandler = () => {
        const trimmedTitle = taskTitle.trim();
        if (trimmedTitle != '') {
            onCreateItem(trimmedTitle);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    };

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
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
          {/*<Button title={'+'} onClick={()=>{*/}
          {/*    if(inputRef.current){*/}
          {/*        createTask(inputRef.current.value)*/}
          {/*        inputRef.current.value = ""*/}
          {/*    }}}/>*/}
          {/*<input ref={inputRef}/>*/}
          <input className={error ? 'error' : ''}
                 value={taskTitle}
                 onChange={changeItemTitleHandler}
                 onKeyDown={createItemOnEnterHandler}/>
          {/*<Button title={'+'} onClick={createTaskHandler} disabled={!isTitleValid}/>*/}
          <Button title={'+'} onClick={createItemHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
          {/*{!error && taskTitle.length === 0 && <div>Enter task title</div>}*/}
          {/*{!error && isTitleValid &&  <div> Min title length 1 characters</div>}*/}
          {/*{!error && taskTitle.length > 10 && <div style={{color:"red"}}>Max title length 10 characters</div>}*/}
      </div>
  )
}