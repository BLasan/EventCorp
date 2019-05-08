import { Injectable } from '@angular/core';
    import * as Pusher from 'pusher-js';

    // this is here to discourage the instantianting of pusher any where its
    // needed, better to reference it from one place
    @Injectable()
    export class PusherService {
    private _pusher: any;

    constructor() {
      this._pusher = new Pusher( "3a998a749012ab9311f6", {
        cluster: "ap2",
        encrypted: true
      });
    }
    // any time it is needed we simply call this method
    getPusher() {
      return this._pusher;
    }

    }