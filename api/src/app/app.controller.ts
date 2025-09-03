import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()  // POST http://localhost:3000/api
  addTodo(@Body('title') title: string) {
    this.appService.add(title);
  }


   @Post('set-completed')  // POST http://localhost:3000/set-completed
  setCompleted(@Body() { id , completed }:{id: number, completed: boolean} ) {
    return this.appService.setCompleted(id, completed);
  }
}
