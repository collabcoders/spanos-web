import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from '@shared/models/video';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { ApiService } from '@shared/services/api.service';
import { TokenService } from '@shared/services/token.service';
import { VideoService } from '@shared/services/video.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from '@shared/services/storage.service';
import { Config } from '@shared/config';
import Plyr from 'plyr';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})

export class VideoPlayerComponent {
  @Input() video: Video = null as any;
  @ViewChild('player', { static: true }) player!: HTMLVideoElement;
  playerState = new BehaviorSubject<string>('loading');
  playerState$ = this.playerState.asObservable();
  videoSubscription!: Subscription;
  favoriteId$!: Observable<number>;
  videoPlayer!: Plyr;

  constructor(
    private storage: StorageService,
    private sanitizer: DomSanitizer,
    private api: ApiService,
    private token: TokenService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.videoSubscription = this.videoService.onLoad()
    .subscribe(video => {
      if (video != null) {
        this.playVideo(video);
      } else {
        this.closePlayer();
      }
    });
  }

  playVideo(selected: Video) {
  //Create animation to show video on page

    this.playerState.next('loading');
    let videoSrc = 'https://player.vimeo.com/external/' + selected.file;

    this.videoPlayer = new Plyr('#player', {
      controls: ['progress', 'airplay'],
      fullscreen: { enabled: true, fallback: true, iosNative: true }
    });

    this.player?.setAttribute('src', videoSrc);
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(this.player);

    this.videoPlayer.on('loadstart', () => {
        this.videoPlayer.play();
    });

    this.videoPlayer.on('ready', () => {
      this.videoPlayer.play();
    });

    this.videoPlayer.on('playing', () => {
      this.videoService.onPlay();
    });

    this.videoPlayer.on('progress', (e) => {
      console.log(this.videoPlayer.currentTime);
    });

    this.videoPlayer.on('waiting', () => {
      this.playerState.next('loading');
      //   this.slowInternetTimeout = setTimeout(() => {
      //   //show buffering or do something to reset a stuck
      //   let wasPlaying = !this.videoPlayer.paused;
      //     this.videoPlayer.currentTime = 0.0; // Optional -- can be left out for pause
      //     this.videoPlayer.pause();
      //     if (wasPlaying) { // This prevents the browser from trying to load the entire source
      //       this.videoPlayer.buffered;
      //     }
      // }, this.threshold);
    });

    this.videoPlayer.on('playing', (e) => {
      this.playerState.next('playing');
      // setTimeout(() => {
      //   if (e.timeStamp > 0) {
      //     let jumpTime = this.videoPlayer.duration * .10;
      //     this.videoPlayer.currentTime = jumpTime;
      //   }
      // }, 750);
    });

    this.videoPlayer.on('pause', () => {
      this.playerState.next('paused');
    });

    this.videoPlayer.on('ended', () => {
      this.playerState.next('loading');
    });

    // this.videoPlayer.on('exitfullscreen', () => {
    //   setTimeout(() => {
    //     this.videoPlayer.play();
    //   }, 400);
    // });
  }

  playPause(event: any) {
    event.preventDefault();
    try {
      if (this.playerState.getValue() == 'playing') {
        this.videoPlayer.pause();
      } else {
        this.videoPlayer.play();
      }
    } catch (err) {
    }
  }

  closePlayer() {
    // Some sort of animation to hide player

    this.resetPlayer();
    this.videoService.onEnd();
  }

  resetPlayer() {
    this.videoPlayer.stop();
    this.playerState.next('loading');
  }

}
