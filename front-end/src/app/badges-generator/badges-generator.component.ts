import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/classes/User';
import { TextStyle , ShapeStyle , ImageStyle , QRCodeStyle , BadgeGlobalStyle } from './Default'
import { mimeType } from '../shared/mime-type.validator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UserService } from '../shared/services/http/user.service';
import htmlToImage from 'html-to-image';
import { DomSanitizer } from '@angular/platform-browser';

export class Element {
  id : number ;
  type : string ;
  content : any ;
  style : any ;
}

@Component({
  selector: 'app-badges-generator',
  templateUrl: './badges-generator.component.html',
  styleUrls: ['./badges-generator.component.scss']
})
export class BadgesGeneratorComponent implements OnInit {

  @ViewChild('content' ,null) content;

  // initial selected menu option
  selected_menu_btn = 'badge' ;

  //
  selected_field: any;

  container : Element[] = [] ;
  elements_id = 1 ;
  selectedElement : number ;
  element : Element ;
  form : FormGroup ;
  url ;
  users : User[] ;
  dynamicFields : {id : number , field : string , type : string}[] = [] ;

  // array to store images (badges) after generating
  images = [] ;

  // initial badge style
  main_style = BadgeGlobalStyle ;




  constructor(private userService : UserService , private sanitizer: DomSanitizer ){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res ;
        this.users.push({
          user_id:null ,
          active : null  ,
          first_name: null ,
          last_name: null ,
          email: null ,
          phone: null,
          roles : null ,
          password : null ,
          username : null ,
          address : null ,
          image : null ,
          grp : null
        });
        // console.log(this.users)
      } ,
      err => console.log(err)
    );

    this.form = new FormGroup({
      'image' : new FormControl(null ,
        {validators : [Validators.required ] ,asyncValidators : [mimeType] } )}
    )
  }


  transform(){
    let images = this.images ;
    return htmlToImage.toPng(this.content.nativeElement)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        images.push({
          image : dataUrl
        });
        return dataUrl ;
      })
      .catch(function (error) {
        return null ;
      });
  }


  modifySize( attribute: string, value : number ) {
    if(this.selectedElement){
      this.element.style[attribute] = value.toString()+"px"
    }
  }

  formatLabel(value: number) {
    return value + 'px';
  }

  getValue(attribute: string) {
    if(attribute){
      return (Number)(attribute.substring( 0 ,attribute.length-2)) ;
    }
  }


  addElement(type : string) {
    let id = this.elements_id  ;
    this.elements_id ++ ;

    let style ;
    let content  ;

    if(type == 'text') {
      style = Object.assign({}, TextStyle);
      content = 'Some text'
    }
    else if(type == 'qrcode'){
      style = Object.assign({}, QRCodeStyle);
      content = 'this rq code'
    }
    else if(type == 'shape'){
      style = Object.assign({}, ShapeStyle);
      content = '' ;
    }


    let element : Element = {
      id : id ,
      type : type ,
      style : style ,
      content : content
    };
    this.container.push(element)

  }


  // select one element
  selectElement(id : number , e : Element) {
    this.element = e ;
    this.selectedElement = id ;
  }


  // change badge size
  selectBadge(h: number, w : number) {
    this.main_style['height'] = h * 1.2 + 'px';
    this.main_style['width'] = w * 1.2 + 'px';
  }



  onPickImage(event : Event){
    let id = this.elements_id  ;
    this.elements_id ++ ;
    let style = Object.assign({}, ImageStyle);
    let content  ;


    const file = (event.target as HTMLInputElement).files[0] ;
    this.form.patchValue({image : file}) ;
    this.form.get('image').updateValueAndValidity() ;
    const reader = new FileReader();
    reader.onload = () => {
      content = reader.result as string;
      let element : Element = {
        id : id ,
        type : 'image' ,
        style : style ,
        content : content
      };
      this.container.push(element)
    };
    reader.readAsDataURL(file);
  }


  // select one of the palette menu option
  selectPalette(selected: string) {
    this.selected_menu_btn = selected
  }

  // delete an element
  deleteElement(press: KeyboardEvent) {
    if(press.key == 'Delete' && this.selectedElement) {
      this.container.splice(
        this.container.findIndex(e => {
          return  e.id == this.selectedElement
        }),1);
    }
  }

  async b(i){
    for await (let element of this.dynamicFields) {
      if(element.type == 'text') {
        this.container[this.container.findIndex(e => {
          return e.id == element.id
        })].content = this.users[i][element.field]
      }
      else if (element.type == 'qrcode') {
        this.container[this.container.findIndex(e => {
          return e.id == element.id
        })].content = this.users[i]['user_id'] ? this.users[i]['user_id'].toString() + this.users[i]['username'] : '' ;
      }
      else if (element.type == 'image') {
        this.container[this.container.findIndex(e => {
          return e.id == element.id
        })].content = this.users[i]['image'] ? this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.users[i]['image'].data)  : '';

      }

    }
  }

  async generateBadges() {
    let i = 0 ;
    var fn = setInterval(() => {
      this.b(i).then(res =>{
        this.transform().then(res => {
          this.url= res;
          if(i >= this.users.length-1) {
            clearInterval(fn);
          }
          i++
        })
      })
    }, 3000)
  }

  addDynamicField() {
    let isAdded = this.dynamicFields.findIndex( e => {return e.id == this.selectedElement}) ;
    let dfield = {
      id : this.selectedElement ,
      field : this.selected_field ,
      type : this.element.type ,
    };
    if(isAdded >= 0){
      this.dynamicFields[isAdded] = dfield ;
    }
    else{
      this.dynamicFields.push(dfield)
    }
    this.selected_field = null ;
  }


  // generate pdf from image array
  generatePdf(){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = {
      content: this.images
    };
    pdfMake.createPdf(dd).download();
  }

}
