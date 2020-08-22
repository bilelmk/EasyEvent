import { Component, OnInit } from '@angular/core';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';
// import $ from 'jquery';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.page.html',
  styleUrls: ['./attendees.page.scss'],
})
export class AttendeesPage implements OnInit{

  // private serverUrl = 'http://localhost:8081/socket'
  // private title = 'WebSockets chat';
  // private stompClient;

  ios: boolean;
  showSearchbar: boolean;

  constructor(){
    // this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
  }

  // initializeWebSocketConnection(){
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame) {
  //     that.stompClient.subscribe("/chat", (message) => {
  //       if(message.body) {
  //         $(".chat").append("<div class='message'>"+message.body+"</div>")
  //         console.log(message.body);
  //       }
  //     });
  //   });
  // }
  //
  // sendMessage(message){
  //   this.stompClient.send("/app/send/message" , {}, message);
  //   $('#input').val('');
  // }

}
