import { IsDateString, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTaskDto {
  @IsMongoId()
  @IsOptional()
  public user?;

  @IsString()
  @IsOptional()
  public detail?: string;

  @IsString()
  @IsOptional()
  public reflection?: string;

  @IsNumber()
  @IsOptional()
  public focusLevel?;

  @IsMongoId()
  @IsOptional()
  public category?: mongoose.Types.ObjectId;

  @IsDateString()
  @IsOptional()
  public date: Date;

  @IsObject()
  public timeInterval;

  @IsString()
  @IsOptional()
  public taskType;

  @IsObject()
  @IsOptional()
  public goal?;

  @IsNumber()
  @IsOptional()
  public priority;
}
