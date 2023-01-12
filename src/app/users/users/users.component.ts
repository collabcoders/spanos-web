import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@shared/models/user';
import { ApiService } from '@shared/services/api.service';
import { UploaderService } from '@shared/services/uploader.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  showlist: boolean = true;
  userslst: any;
  userobj = new User();
  url: string = '';
  ascList: boolean = true;

  progress = 0;
  infoMessage: any;
  isUploading: boolean = false;
  file!: File;
  cropImgPreview: any = '';
  imgChangeEvt: any = '';
  imageType = 'image/jpeg';
  imageChanged = false;
  imageUrl: string | ArrayBuffer | null = '';
  fileName: string = "No file selected";
  profileForm: any;

  constructor(private apiServices: ApiService, private route: ActivatedRoute,
    private router: Router, private SpinnerService: NgxSpinnerService,
    private toster: ToastrService, private uploader: UploaderService) {
  }
  ngOnInit(): void {
    this.loadusers();
  }

  getBase64(url: string, callback: (q: any) => void) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
      reader.onerror = function (error) {
        console.log('Error: ', error);
        return '';
      };
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  onChange(event: any, file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      this.imgChangeEvt = event;
      this.imageType = event.target.files[0].type;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
        this.imageChanged = true;
      };
    }
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  onUpload(uploadFile: any) {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;
    this.uploader.upload(uploadFile).subscribe(message => {
      console.log(message);
      debugger;
      this.isUploading = false;
      this.infoMessage = message;
      if (message.indexOf('Error') != -1) {
        console.log('Error handling');
      } else {
        this.fileName = message;
        this.userobj.image = this.fileName;
        this.AddUpdateuser();
      }
    });
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: this.imageType });
    return blob;
  }

  initSaveUser() {
    if (this.imageChanged) {
      const blob = this.dataURItoBlob(this.cropImgPreview);
      const imageFile = new File([blob], this.fileName, { type: this.imageType });
      this.onUpload(imageFile);
      this.imageChanged = false;
    } else {
      this.AddUpdateuser();
    }
  }

  loadusers() {
    let params = new HttpParams().set("sort", 'fname').set("sort", 'lname').set("dir", 'asc');
    this.SpinnerService.show();
    console.log('/Users?' + params);
    this.apiServices.get('/Users?' + params).subscribe(data => {
      try {
        if (data) {
          this.userslst = data.data;
          // this.userslst.forEach((element: User) => {
          //   element.image = "https://api.spanos.family/images?img=" + element.image + "&max=100";
             this.SpinnerService.hide();
          // });
        }
      } catch {
        this.SpinnerService.hide();
      }
    });
  }

  Deleteuser(id: any) {
    this.SpinnerService.show();
    this.apiServices.delete('/DeleteUser/' + id).subscribe(data => {
      try {
        if (data.success) {
          this.loadusers();
          this.SpinnerService.hide();
          this.toster.info(data.message);
        }
      } catch {
        this.SpinnerService.hide();
        this.toster.error(data.message);
      }
      this.SpinnerService.hide();
    });
  }

  AddUpdateuser() {
    this.SpinnerService.show();
    if (this.userobj.userId > 0) {
      console.log(this.userobj);
      // this.apiServices.put('/UpdateUser', this.userobj).subscribe(data => {
      //   try {
      //     if (data.success) {
      //       this.userobj = new User();
      //       this.loadusers();
      //       this.SpinnerService.hide();
      //       this.showhidemain();
      //       this.toster.success(data.message);
      //     }
      //   } catch {
      //     this.SpinnerService.hide();
      //     this.toster.error(data.message);
      //   }
      // });
    }
    else {
      console.log(this.userobj);
      // this.apiServices.post('/AddUser', this.userobj).subscribe(data => {
      //   try {
      //     if (data.success) {
      //       this.userobj = new User();
      //       this.loadusers();
      //       this.showhidemain();
      //       this.toster.success(data.message);
      //       this.SpinnerService.hide();
      //     }
      //   } catch {
      //     this.SpinnerService.hide();
      //     this.toster.error(data.message);
      //   }
      // });
    }
  }

  Edituser(obj: User) {
    this.userobj = obj;
    this.showhidemain();
  }

  showhidemain() {
    this.showlist = !this.showlist;
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  SortUserList(sort: any) {
    this.SpinnerService.show();
    let dir: string = '';
    let params = new HttpParams();
    if (this.ascList == true) {
      dir = 'asc';
      this.ascList = false;
    }
    else {
      dir = 'desc';
      this.ascList = true;
    }
    params = new HttpParams().set("sort", sort).set("dir", dir);
    this.apiServices.get('/Users?' + params).subscribe(data => {
      try {
        if (data) {
          this.userslst = data.data;
          this.userslst.forEach((element: User) => {
            var re = /mp4/gi;
            var newPic = element.image.replace(re, "jpg");
            element.image = "https://api.spanos.family/images/?img=" + newPic + "&max=500";
            this.SpinnerService.hide();
          });
        }
      } catch {
        this.SpinnerService.hide();
      }
    });
    var url = window.location.origin;
    var stateObj = { Title: "Spanos", Url: url + this.url + "?" + params };
    history.pushState(stateObj, stateObj.Title, stateObj.Url);
  }

}
