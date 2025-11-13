import { Controller, Get, Header } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('System')
export class AppController {
  @Get()
  @Header('Content-Type', 'text/plain; charset=utf-8')
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({ description: 'Success', type: String })
  @ApiProduces('text/plain')
  getOK(): string {
    return 'OK';
  }
}
