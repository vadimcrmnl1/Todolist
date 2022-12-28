import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/task/Task";
import {TaskType} from "../AppWithRedux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todolistId: '1',
        task: {id: '1', title: 'HTML', isDone: true},
        removeTask: action('Remove task'),
        changeTaskStatus: action('Change task status'),
        changeTaskTitle: action('Change task title')
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: '1', title: 'HTML', isDone: true}
};
export const TaskUnDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskUnDoneStory.args = {
    task: {id: '1', title: 'HTML', isDone: false},
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', title: 'HTML', isDone: true})
    const changeTaskStatus = (taskId: string, newStatus: boolean) => setTask({...task, isDone: newStatus})
    const changeTaskTitle = (taskId: string, newValue: string, todolistId: string) => setTask({...task, title: newValue})
    const removeTask = () => setTask({} as TaskType)
    return <Task todolistId={'1'}
                 task={task}
                 removeTask={removeTask}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle}/>
}
export const TaskStory = Template1.bind({})

