import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import {Contact} from '../contact'
import { Observable } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any;



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  departments: any
  citys:any[]
  contact : Contact = new Contact()
  success: boolean;
  formulario: FormGroup

  createFormGroup(){
    return new FormGroup({
      state: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      city: new FormControl('',[Validators.required, Validators.maxLength(30)]),
      name: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      email: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      
    })
  }

  constructor(private service: ApiService) { 
    this.formulario = this.createFormGroup();
  }

  ngOnInit(): void {  
     this.getStates()
  }

  getStates(){
    
    this.departments = this.service.getDepartamentos().subscribe((data:any)=>{
       this.departments=data
    });
        
  }

  getCity(state: string){ 
    for(let c in this.departments){
      if(state === c){
        this.citys = this.departments[c]
      }
    }
  }

  saveContact(){
    this.service.AddUser(this.contact)
    .subscribe(
      data=>{
      if(data > 0){
        $('#modal').show();
        this.formulario.reset();  
        
      }
    },
    err=>console.log("error " + err));
  }
  closeModal(){
    $('#modal').modal('toggle');
   
  }

  onSubmit(){
    if(this.formulario.valid){
      this.saveContact();
    }
  }

  get state() {return this.formulario.get('state')}
  get city() {return this.formulario.get('city')}
  get name() {return this.formulario.get('name')}
  get email() {return this.formulario.get('email')}


}
