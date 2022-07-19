import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { College } from './college';
import { CollegeService } from './college.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'collegemanagerapp';
  public colleges: College[] = [];
  public editCollege!: College | null;
  // public deleteCollege!: College|null|number|any;
  @Input() collegeid!:College;
  @Output() deleteCollege: EventEmitter<College> = new EventEmitter();

  constructor(private collegeService:CollegeService) { }

  ngOnInit() {
      this.getColleges();
  }
  OnDeleteCollege(collegeid: College):void{
    this.deleteCollege.emit(collegeid);
    
    console.log(collegeid);
  }

  public searchColleges(key:string):void{
    console.log(key);
    const results:College[]=[];
    for(const college of this.colleges){
      if(college.name.toLowerCase().indexOf(key.toLowerCase())!= -1
      || college.email.toLowerCase().indexOf(key.toLowerCase())!= -1
      || college.phone.toLowerCase().indexOf(key.toLowerCase())!= -1)
      {
        results.push(college);
      }
    }
    this.colleges= results;
    if(results.length===0 || !key){
      this.getColleges();
    }
  }

  public getColleges():void{
    this.collegeService.getColleges().subscribe(
      (response: College[]) => {
        this.colleges=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public OnAddCollege(addForm: NgForm): void {
    document.getElementById('add-college-form')?.click();//FOR CLOSING THE PAGE AFTER SAVING THE DETAILS
    this.collegeService.addCollege(addForm.value).subscribe(
      (response: College)=> { 
        console.log(response);
        this.getColleges();
        addForm.reset();//CLEARING THE FORM AFTER USING 
      },
      (error: HttpErrorResponse)=>{ 
        alert(error.message);
      }
    );
  }
  public OnUpdateCollege(college: College): void {
    
    this.collegeService.updateCollege(college).subscribe(
      (response: College)=> { 
        console.log(response);
        this.getColleges();
        //CLEARING THE FORM AFTER USING 
      },
      (error: HttpErrorResponse)=>{ 
        alert(error.message);
      }
    );
  }


  // public OnDeleteCollege(collegeid: number): void {
    
  //   this.collegeService.deleteCollege(collegeid).subscribe(
  //     (response: void)=> { 
  //       // console.log(response);

  //       this.getColleges();
  //     },
  //     (error: HttpErrorResponse)=>{ 
  //       alert(error.message);
  //     }
  //   );
  // }

  public onOpenModal(college:null|College,mode:String) : void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display= 'none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addCollegeModal');
    }
    if(mode==='edit'){
      this.editCollege=college;
      button.setAttribute('data-target','#updateCollegeModal');
    }
    if(mode==='delete'){
      // this.deleteCollege=;
      const index =this.colleges.indexOf(this.collegeid);
      this.colleges.splice(index,1);
      button.setAttribute('data-target','#deleteCollegeModal');
    }
    container?.appendChild(button);
    button.click(); 
  }
}
