import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { updateTaskTC, removeTaskTC } from "../../../../../model/tasks-reducer"
import { TodolistType } from "../../../../../model/todolists-reducer"
import { getListItemSx } from "./Task.styles"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums"

type Props = {
  task: DomainTask
  todolist: TodolistType
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ taskId: task.id, domainModel: {status}, todolistId: todolist.id }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ taskId: task.id, domainModel: {title}, todolistId: todolist.id }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
