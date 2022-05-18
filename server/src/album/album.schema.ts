import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';
import * as mongoose from 'mongoose'
export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  title: string;
  @Prop()
  artist: string;
  @Prop()
  picture: string;
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
