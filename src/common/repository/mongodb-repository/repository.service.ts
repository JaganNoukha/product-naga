import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMongoDBServices } from './abstract.repository';


@Injectable()
export class MongoDBServices {

  constructor(

  ) {
    console.log('MongoDBServices loaded');
  }

  onApplicationBootstrap() {
    console.log('<== Mongo DB repositories got initialised ==>');
  }
}
