import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class StorageService {
  AWS_S3_BUCKET = process.env.AWS_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  });

  async uploadFile(file, nombre) {
    let data;

    data = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      nombre,
      file.mimetype,
    );

    return data;
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    // console.log(params);

    try {
      let s3Response = await this.s3.upload(params).promise();

      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  //Nuevo metodo
  async upload(file: any) {
    const mime = file.mimetype;
    // const originalname = file.originalname;
    const originalname = `${file.originalname}-${Date.now()}`;

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: originalname,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: mime,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    const { Location } = await this.s3.upload(params).promise();


    return Location ;
  }

  //Nuevo metodo
  async uploadMultipleFiles(files: any[]){
    const uploadPromises = files.map( async file =>{
      return await this.upload(file);
    });

    const locations =  await Promise.all(uploadPromises);

    return locations;
  
  }

  
  //Nuevo metodo
  async deleteFile(key: string) {
    const _key = key.split('/');

    return await this.s3
      .deleteObject({
        Bucket: this.AWS_S3_BUCKET,
        Key: _key[_key.length - 1],
      })
      .promise();
  }

  async deleteStorage(key: string) {
    const _key = key.split('/');

    return await this.s3
      .deleteObject({
        Bucket: this.AWS_S3_BUCKET,
        Key: _key[_key.length - 1],
      })
      .promise();
  }
}
