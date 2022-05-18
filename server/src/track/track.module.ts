import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Album, AlbumSchema } from 'src/album/album.schema';
import { FileService } from 'src/file/file.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name:Track.name, schema:TrackSchema}]),
        MongooseModule.forFeature([{name:Comment.name, schema:CommentSchema}]),
        MongooseModule.forFeature([{name:Album.name, schema:AlbumSchema}]),
    ],
    controllers:[TrackController],
    providers:[TrackService, FileService]
})

export class TrackModule{

}