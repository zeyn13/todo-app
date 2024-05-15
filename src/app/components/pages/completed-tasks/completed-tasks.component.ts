import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PagesTitleComponent } from '../../pages-title/pages-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PagesTitleComponent, TaskListComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
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
      this.taskList=result.filter((x:any)=>x.completed==true);  
      this.initialTaskList=this.taskList;  
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
