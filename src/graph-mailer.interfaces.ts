import type { ModuleMetadata, Type } from '@nestjs/common';
import type { GraphMailerConfig } from '@tlouverse/graph-mailer';

export interface GraphMailerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: unknown[]) => GraphMailerConfig | Promise<GraphMailerConfig>;
  inject?: (string | symbol | Type)[];
}
