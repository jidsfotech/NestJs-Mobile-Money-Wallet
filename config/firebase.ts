
import * as firebase from 'firebase-admin'
import { Injectable } from '@nestjs/common'
import {Config} from './config'

@Injectable()
export class Firebase {
  private fbConfig: object = Config.firebase;

  async init() {
    if (!firebase.apps.length) {
      return firebase.initializeApp({
        credential: firebase.credential.cert(this.fbConfig),
      })
    }
    return firebase.app()
  }
}