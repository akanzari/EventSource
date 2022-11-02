import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class SseServiceService {
    
  public eventSource: EventSourcePolyfill;
  private token: string
  
  constructor(private zone: NgZone) {}

  getServerSentEvent(): Observable<MessageEvent> {
    let url = "http://localhost:9096/api/v1.0/partners/notify";
    return new Observable((observer) => {
      const eventSource = this.getEventSource(url);
      eventSource.onopen = (ev) => {
      };
      eventSource.onerror = (ev) => {
        if(eventSource.readyState === 0)
          this.token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJLYW56YXJpIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE2Njg3MDcyNjZ9.VbvQHAKlG_U9vBCeTUeX3YLZWM7fP5XroumCy89v3-_w6saJCUkHNoqzYSLSgc1UVf8xyU1L0Y_M1hzqLfk2Ig'
      };
      eventSource.addEventListener('message', (event) => {
        this.zone.run(() => {
          observer.next(event);
        });
      });
    });
  }

  private getEventSource(url: string): EventSource {
    if (this.eventSource) {
      this.eventSource.close();
    }
    this.token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJLYW56YXJpIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE2Njg3MDcyNjZ9.VbvQHAKlG_U9vBCeTUeX3YLZWM7fP5XroumCy89v3-_w6saJCUkHNoqzYSLSgc1UVf8xyU1L0Y_M1hzqLfk2Ig'
    this.eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization:
        this.token,
      },
    });
    return this.eventSource;
  }
    
  closeEvent(){
    this.eventSource.close();
  }
}
