import { Injectable } from '@angular/core';
import { Video } from '@shared/models/video';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  private subject = new Subject<Video>();
  private play = new BehaviorSubject<boolean>(false);
  favoriteId = new BehaviorSubject<number>(0);
  audioPlayingId = new BehaviorSubject<number>(0);

  constructor() { }

  onLoad(): Observable<Video> {
    return this.subject.asObservable();
  }

  onPlay() {
    this.play.next(true);
  }

  // onPause() {
  //   this.play.next(false);
  // }

  onEnd() {
    this.play.next(false);
  }

  isPlaying(): Observable<boolean> {
    return this.play.asObservable();
  }

  setFavoriteId(id: number) {
    this.favoriteId.next(id);
  }

  getFavoriteId() {
    return this.favoriteId;
  }

  getPlayingId() {
    return this.audioPlayingId;
  }

  showPlayer(video: Video) {
    this.subject.next(video);
  }
}
