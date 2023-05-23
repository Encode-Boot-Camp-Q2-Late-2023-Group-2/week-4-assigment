import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { query } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('result/:index')
  getResult(@Param('index') index: number) {
    return this.appService.getResult(index)
  }
  @Get('winner')
  getWinner() {
    return this.appService.getWinner()
  }
  @Post('mint')
  mint(@Query('amount') amount: string, @Query("address") address: string) {
    return this.appService.requestMint(address, amount)
  }
}
