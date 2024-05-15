import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PagesTitleComponent } from '../../pages-title/pages-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { subscribeOn } from 'rxjs';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PagesTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
  newTask="";
  initialTaskList:any[]=[];
  taskList:any[]=[];
  httpService = inject(HttpService);
  stateService=inject(StateService);

  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
    if(value){
      this.taskList=this.initialTaskList.filter((x)=>x.title.toLowerCase().includes(value.toLowerCase()));
    } else{
      this.taskList=this.initialTaskList;
    }
    })
    this.getAllTasks();
  }

  addTask(){
    console.log("addTask", this.newTask)
    this.httpService.addTask(this.newTask).subscribe(()=>{
      this.newTask="";
      this.getAllTasks();
    })
  }
  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any)=>{
      this.initialTaskList=this.taskList=result;  
    })
  }
  onComplete(task:any){
    task.completed=true;
    console.log("complete",task)
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    })
  }

  onImportant(task:any){
    task.important=true;
    this.httpService.updateTask(task).subscribe(()=>{
      this.getAllTasks();
    }) 
   }

}
