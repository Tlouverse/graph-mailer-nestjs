import { DynamicModule, Module } from '@nestjs/common';
import { GraphMailer, GraphMailerConfig } from '@tlouverse/graph-mailer';
import { GRAPH_MAILER_OPTIONS } from './graph-mailer.constants.js';
import { GraphMailerAsyncOptions } from './graph-mailer.interfaces.js';

@Module({})
export class GraphMailerModule {
  static forRoot(config: GraphMailerConfig): DynamicModule {
    return {
      module: GraphMailerModule,
      global: true,
      providers: [
        { provide: GRAPH_MAILER_OPTIONS, useValue: config },
        {
          provide: GraphMailer,
          useValue: new GraphMailer(config),
        },
      ],
      exports: [GraphMailer],
    };
  }

  static forRootAsync(options: GraphMailerAsyncOptions): DynamicModule {
    return {
      module: GraphMailerModule,
      global: true,
      imports: options.imports ?? [],
      providers: [
        {
          provide: GRAPH_MAILER_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        {
          provide: GraphMailer,
          useFactory: (config: GraphMailerConfig) => new GraphMailer(config),
          inject: [GRAPH_MAILER_OPTIONS],
        },
      ],
      exports: [GraphMailer],
    };
  }
}
