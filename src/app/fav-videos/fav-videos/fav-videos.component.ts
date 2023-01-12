import { HttpParams } from '@angular/common/http';
import { AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from '@shared/models/bookmark';
import { Favorite } from '@shared/models/favorite';
import { Video } from '@shared/models/video';
import { ApiService } from '@shared/services/api.service';
import { VideoService } from '@shared/services/video.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import videojs from 'video.js';

@Component({
  selector: 'app-fav-videos',
  templateUrl: './fav-videos.component.html'
})
export class FavVideosComponent implements OnInit,AfterViewChecked {
  url :string = '';
  videoslst : any = [];
  videoslst1 : any = [];
  videoslst2 : any = [];
  videoslst3 : any = [];
  relatedvideos : any = [];
  showlist: boolean = true;
  videoobj: any;
  bookmarkobj = new Bookmark();
  favobj = new Favorite();
  count = 0;
  year:number = -1;
  public showSpinner: boolean = false;
  bookmarklst: any;
  videoJSplayer: any;
  searchResult: any=[];
  yearslst: any;

  constructor(private apiServices: ApiService,private route: ActivatedRoute,public sanitizer: DomSanitizer,
    private videoService: VideoService,private router:Router,private SpinnerService: NgxSpinnerService,
    private toster:ToastrService) {
  }
  ngOnInit(): void {
    this.LoadFavoriteVideos();
    this.GetYears();
  }

  ngAfterViewChecked()
  {
    if(this.videoobj && !this.showlist){
    var player = videojs('videoPlay');
      player.on("pause", function () {
      player.bigPlayButton.show();
      });
      player.on("play", function () {
        player.bigPlayButton.hide();
      });

    }
  }

  GetYears()
  {
    this.apiServices.get('/Years').subscribe(data => {
      try{
        if (data) {
            this.yearslst = data;
        }
      }catch{
      }
    });
  }
  SearchByTags(tag:string)
  {
    this.SpinnerService.show();
    let params = new HttpParams().set("userId",1).set("favorites",true).set("row", 12).set("tags",tag);
    this.apiServices.get('/Videos?'+params).subscribe(data => {
      try{
        if (data) {
            this.videoslst = data.data;
            this.videoslst.forEach((element:Video) => {
              element.gif=element.file;
              element.pic=element.file;
              var re = /mp4/gi;
              var newstr = element.gif.replace(re, "gif");
              element.gif= "https://spanos.family/media/" + newstr;
              var newPic = element.pic.replace(re, "jpg");
              element.pic= "https://spanos.family/media/" + newPic;
              element.src= "https://spanos.family/media/" + newPic;
            });
            this.videoslst1 = this.videoslst.slice(0,12);
            this.SpinnerService.hide();
        }
      }catch{
        this.SpinnerService.hide();
      }
    });
  }
  LoadFavoriteVideos()
  {
    this.SpinnerService.show();
    let params = new HttpParams().set("userId",1).set("favorites",true).set("row", 12);
    this.apiServices.get('/Videos?'+params).subscribe(data => {
      try{
        if (data) {
            this.videoslst = data.data;
            this.videoslst.forEach((element:Video) => {
              element.gif=element.file;
              element.pic=element.file;
              var re = /mp4/gi;
              var newstr = element.gif.replace(re, "gif");
              element.gif= "https://spanos.family/media/" + newstr;
              var newPic = element.pic.replace(re, "jpg");
              element.pic= "https://spanos.family/media/" + newPic;
              element.src= "https://spanos.family/media/" + newPic;
            });
            this.videoslst1 = this.videoslst.slice(0,12);
            this.SpinnerService.hide();
        }
      }catch{
        this.SpinnerService.hide();
      }
    });
  }

  AddToFavrature(obj:any,i:number)
  {
    if(obj.favoriteId == 0){
    this.favobj.videoId = obj.videoId;
    this.favobj.userId = 1;
    this.apiServices.post('/AddFavorite',this.favobj).subscribe(data => {
      try{
          if(data.success){
            this.favobj = new Favorite();
            this.LoadFavoriteVideos();
            this.toster.success(data.message);
        }
      }catch{
        this.SpinnerService.hide();
        this.toster.error(data.message);
      }
      });
    }
    else{
    this.apiServices.delete('/DeleteFavorite/'+ obj.favoriteId).subscribe(data => {
      try{
          if(data.success){
            this.favobj = new Favorite();
            this.LoadFavoriteVideos();
            this.toster.success(data.message);
          }
      }catch{
        this.SpinnerService.hide();
        this.toster.error(data.message);
      }
      });
    }
  }

  showdetails(obj:Video)
  {
    this.videoobj = obj;
    this.showlist = false;
    this.url = this.videoobj.hls;
    this.getrealtedvideos(obj.tags);
    this.getbookmarks();
    this.selectedVideo(obj,false);
    window.scroll({ top: 0,left: 0,behavior: 'smooth'});
  }

  showreldetails(item:Video)
  {
    this.videoobj = item;
    this.showlist = false;
    this.url = this.videoobj.hls;
    this.getrealtedvideos(item.tags);
    this.getbookmarks();
    this.selectedVideo(item,true);
    window.scroll({ top: 0,left: 0,behavior: 'smooth'});
  }

  downloadvideo() {
    var index = this.videoobj.file.lastIndexOf('.');
    var filename = this.videoobj.file.slice(0, index);
    var a = document.createElement('a')
    a.href = this.videoobj.hls;
    a.download = filename;
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  showGif(index:number,relvid:boolean) {
    if(!relvid)
    {this.videoslst1[index].src = this.videoslst1[index].gif;}
    else{this.relatedvideos[index].src = this.relatedvideos[index].gif;}
  }

  showScreenshot(index:number,relvid:boolean) {
    if(!relvid)
    {this.videoslst1[index].src = this.videoslst1[index].pic;}
    else{this.relatedvideos[index].src = this.relatedvideos[index].pic;}
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    var data:any;
    this.showLoadingSpinner();
    setTimeout(() => {
    if (this.bottomReached()) {
      var size = 12;
      this.videoslst2=this.videoslst;
      if(this.videoslst1.length==0){
        this.videoslst1= this.videoslst2.slice(0, size);
      }
        else{
        if(this.videoslst1.length<=this.videoslst.length && this.searchResult.length==0){
        this.count=this.count+ size;
        this.videoslst3= this.videoslst;
         data= this.videoslst3.slice(this.count, (this.count + size));
        for(var i = 0; i <= data.length - 1; i++){
          this.videoslst1.push(data[i]);
        }
        }

        if(this.searchResult.length > 0){
          this.count=this.count+ size;
          this.videoslst3= this.searchResult;
           data= this.videoslst3.slice(this.count, (this.count + size));
          for(var i = 0; i <= data.length - 1; i++){
            this.videoslst1.push(data[i]);
          }
          }

      }
    }
  }, 500,);
  if(this.videoslst1.length >= this.videoslst.length){
    this.hideLoadingSpinner();
  }
    if(this.videoslst1.length < 12 || this.videoslst1.length==this.searchResult.length || this.videoslst1.length==this.videoslst.length){
      this.showSpinner=false;
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  getrealtedvideos(tags:string) {
      let params = new HttpParams().set("tags",tags).set("row", 12);
      this.apiServices.get('/Videos?'+params).subscribe(data => {
        try{
          if (data) {
            if(data._http != 200){
              this.relatedvideos = data.data;
              this.relatedvideos.forEach((element:Video) => {
                element.gif=element.file;
                element.pic=element.file;
                var re = /mp4/gi;
                var newstr = element.gif.replace(re, "gif");
                element.gif= "https://spanos.family/media/" + newstr;
                var newPic = element.pic.replace(re, "jpg");
                element.pic= "https://spanos.family/media/" + newPic;
                element.src= element.pic;
            });
            }
          }
        }catch{
        }
      });
  }
  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

  getCurrentTime()
  {
    var player = videojs('videoPlay');
    return player.currentTime();
  }
  changetimeformate(time:number)
  {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60)
    var x = minutes < 10 ? "0" + minutes : minutes;
    var y = seconds < 10 ? "0" + seconds : seconds;
    return x+":"+y;
  }
  editbookmark(item:Bookmark)
  {
    this.bookmarkobj = Object.assign({}, item);
    this.setCurrentTime(this.bookmarkobj.time);
  }

  setCurrentTime(time:number)
  {
    var player = videojs('videoPlay');
    player.currentTime(time);
  }

  getbookmarks()
  {
    this.apiServices.get('/Bookmarks/'+this.videoobj.videoId).subscribe(data => {
      try{
        if (data) {
          this.bookmarklst = data.data;
        }
      }catch{
      }
    });

  }
  addupdatebookmark()
  {
    this.SpinnerService.show();
    if(this.bookmarkobj.bookmarkId == 0){
    this.bookmarkobj.time = this.getCurrentTime();
    this.bookmarkobj.videoId = this.videoobj.videoId;
    this.bookmarkobj.userId = 1;
    this.apiServices.post('/AddBookmark',this.bookmarkobj).subscribe(data => {
      try{
          if(data.success){
            this.bookmarkobj = new Bookmark();
            this.getbookmarks();
            this.selectedVideo(this.videoobj,false);
            this.SpinnerService.hide();
            this.toster.success(data.message);
        }
      }catch{
        this.SpinnerService.hide();
        this.toster.error(data.message);
      }
    });
    }
    else{
    this.SpinnerService.show();
    this.apiServices.put('/UpdateBookmark',this.bookmarkobj).subscribe(data => {
      try{
          if(data.success){
            this.bookmarkobj = new Bookmark();
            this.getbookmarks();
            this.selectedVideo(this.videoobj,false);
            this.SpinnerService.hide();
            this.toster.success(data.message);
          }
      }catch{
        this.SpinnerService.hide();
        this.toster.error(data.message);
      }
    });
    }
  }
  deletebookmark(id:number)
  {
    this.SpinnerService.show();
    this.apiServices.post('/DeleteBookmark',id).subscribe(data => {
      try{
          if(data._http == 200){
            this.SpinnerService.hide();
        }
      }catch{
        this.SpinnerService.hide();
      }
    });
  }

  selectedVideo(objData:Video,isrel:boolean)
  {
    if (videojs.getPlayers()[`videoPlay`]) {
      delete videojs.getPlayers()[`videoPlay`];
    }
    if(!isrel){
     if (videojs.getPlayers()[`videoPlay`]) {
     videojs(`videoPlay`).src({
      src: objData.hls,
      type: "application/x-mpegURL"
     });
     }
    }
    else{
      videojs(`videoPlay`).src({
      src: objData.hls,
      type: "application/x-mpegURL"
    });
    }
  }
  backtolist()
  {  
    if (videojs.getPlayers()[`videoPlay`]) {
    videojs.getPlayers()[`videoPlay`].dispose;}
    this.videoobj = {};
    this.showlist = true;
    var url = window.location.origin;
    var stateObj = { Title : "Spanos", Url: url + "/favorities"};       
    history.pushState(stateObj, stateObj.Title, stateObj.Url);
  }
  onSearch(event: any) {
    this.count = 0;
    const value = event.target.value;
    if (value.length > 0 && value !="") {
      this.searchResult = this.videoslst.filter((obj:any) => obj.title.toLowerCase().includes(value.toLowerCase()));
      this.videoslst1=this.searchResult;
      this.videoslst1 = this.searchResult.slice(0,12);
      if( this.videoslst1.length<12){
        this.showSpinner=false;
      }
    }
    else{
      this.videoslst1 = this.videoslst.slice(0,12);
      this.searchResult.length=0;
      this.count = 0;
    }
  }
  SearchByYear()
  {
     this.searchResult = this.videoslst.filter((a:any) => a.year == this.year);
     if(this.year == -1)
     {
      this.searchResult = [];
      this.videoslst = [];
      this.LoadFavoriteVideos();
     }else
     {
      this.videoslst1 = this.searchResult;
     }

  }
}
