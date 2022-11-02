import { Component, OnInit } from '@angular/core';
import { SseServiceService } from './sse-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  constructor(private sseService: SseServiceService) { }

  ngOnInit(): void {
    this.sseService.getServerSentEvent().subscribe(
        (ev) => {
          let data = JSON.parse(ev.data);
          console.log(data);
        },
        (error) => console.log(error),
        () => {}
      );
  }

}
