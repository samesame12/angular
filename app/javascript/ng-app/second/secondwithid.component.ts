import { Component } from '@angular/core';
import templateString from './secondwithid.html';
import { MyDataService } from '../my_data/my_data.service';
import { MyData } from '../my_data/my_data';
import { Router,ActivatedRoute} from '@angular/router'

@Component({
  template: templateString,
  providers: [ MyDataService ]
})
export class SecondWithIdComponent {
  private myDatas: any;
  private attrs: any
  private newMyData: MyData;
  private createLabel;
  private id;

  constructor(private myDataService: MyDataService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
    console.log(this.id)
  }
  

  ngOnInit() {
    this.getAll();
    this.newMyData = new MyData();
    this.createLabel = "Create";
  }

  getAll() {
    this.myDataService.all().subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
    }, e => {
      console.log(e);
    })
  }

  update(id, string_test, integer_test, boolean_test) {
    this.attrs = {
      string_test: string_test,
      integer_test: integer_test,
      boolean_test: boolean_test
    }
    this.myDataService.update(id, this.attrs).subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
    }, e => {
      console.log(e);
    })
  }

  create(newMyData) {
    console.log(newMyData.getCreateParam())
    this.myDataService.create(newMyData.getCreateParam()).subscribe(resp => {
      console.log(resp);
      this.myDatas = resp;
      this.newMyData = new MyData();
    }, e => {
      console.log(e);
    })
  }

}
