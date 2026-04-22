# @tlouverse/graph-mailer-nestjs

[![npm version](https://img.shields.io/npm/v/@tlouverse/graph-mailer-nestjs)](https://www.npmjs.com/package/@tlouverse/graph-mailer-nestjs)
[![license](https://img.shields.io/npm/l/@tlouverse/graph-mailer-nestjs)](./LICENSE)

**[English](#english) · [Français](#français)**

---

## English

NestJS module for [@tlouverse/graph-mailer](https://www.npmjs.com/package/@tlouverse/graph-mailer). Registers `GraphMailer` as a global provider so you can inject it anywhere in your application.

### Installation

```bash
npm install @tlouverse/graph-mailer-nestjs
```

### Setup

Register the module once in your root `AppModule`.

**Static configuration:**

```ts
import { GraphMailerModule } from '@tlouverse/graph-mailer-nestjs';

@Module({
  imports: [
    GraphMailerModule.forRoot({
      tenantId: 'your-tenant-id',
      clientId: 'your-client-id',
      clientSecret: 'your-client-secret',
      defaultFrom: 'noreply@example.com',
    }),
  ],
})
export class AppModule {}
```

**Async configuration (e.g. with `ConfigService`):**

```ts
import { GraphMailerModule } from '@tlouverse/graph-mailer-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        tenantId: config.getOrThrow('AZURE_TENANT_ID'),
        clientId: config.getOrThrow('AZURE_CLIENT_ID'),
        clientSecret: config.getOrThrow('AZURE_CLIENT_SECRET'),
        defaultFrom: config.get('MAIL_DEFAULT_FROM'),
      }),
    }),
  ],
})
export class AppModule {}
```

### Injection

Once registered, inject `GraphMailer` directly by type:

```ts
import { Injectable } from '@nestjs/common';
import { GraphMailer } from '@tlouverse/graph-mailer-nestjs';

@Injectable()
export class NotificationService {
  constructor(private readonly mailer: GraphMailer) {}

  async sendWelcome(to: string) {
    await this.mailer.send({
      to,
      subject: 'Welcome',
      html: '<p>Welcome aboard!</p>',
    });
  }
}
```

### API

This package re-exports everything from `@tlouverse/graph-mailer` — you only need to import from `@tlouverse/graph-mailer-nestjs` in your NestJS project.

| Export | Description |
|---|---|
| `GraphMailerModule` | NestJS module — register with `forRoot` or `forRootAsync` |
| `GraphMailerAsyncOptions` | Type for `forRootAsync` options |
| `GraphMailer` | Mailer class (injectable) |
| `GraphMailerConfig` | Config type |
| `SendMailOptions` | Send options type |
| `Address` | Address type |
| `GraphMailError` | Graph API error |
| `GraphAuthError` | Token acquisition error |

For the full `GraphMailer` API, see the [@tlouverse/graph-mailer documentation](https://www.npmjs.com/package/@tlouverse/graph-mailer).

### Azure prerequisites

See [@tlouverse/graph-mailer — Azure prerequisites](https://www.npmjs.com/package/@tlouverse/graph-mailer#azure-prerequisites).

---

## Français

Module NestJS pour [@tlouverse/graph-mailer](https://www.npmjs.com/package/@tlouverse/graph-mailer). Enregistre `GraphMailer` comme provider global, injectable partout dans l'application.

### Installation

```bash
npm install @tlouverse/graph-mailer-nestjs
```

### Configuration

Enregistrez le module une seule fois dans votre `AppModule` racine.

**Configuration statique :**

```ts
import { GraphMailerModule } from '@tlouverse/graph-mailer-nestjs';

@Module({
  imports: [
    GraphMailerModule.forRoot({
      tenantId: 'votre-tenant-id',
      clientId: 'votre-client-id',
      clientSecret: 'votre-client-secret',
      defaultFrom: 'noreply@example.com',
    }),
  ],
})
export class AppModule {}
```

**Configuration asynchrone (ex. avec `ConfigService`) :**

```ts
import { GraphMailerModule } from '@tlouverse/graph-mailer-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphMailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        tenantId: config.getOrThrow('AZURE_TENANT_ID'),
        clientId: config.getOrThrow('AZURE_CLIENT_ID'),
        clientSecret: config.getOrThrow('AZURE_CLIENT_SECRET'),
        defaultFrom: config.get('MAIL_DEFAULT_FROM'),
      }),
    }),
  ],
})
export class AppModule {}
```

### Injection

Une fois enregistré, injectez `GraphMailer` directement par type :

```ts
import { Injectable } from '@nestjs/common';
import { GraphMailer } from '@tlouverse/graph-mailer-nestjs';

@Injectable()
export class NotificationService {
  constructor(private readonly mailer: GraphMailer) {}

  async sendWelcome(to: string) {
    await this.mailer.send({
      to,
      subject: 'Bienvenue',
      html: '<p>Bienvenue !</p>',
    });
  }
}
```

### API

Ce package réexporte tout depuis `@tlouverse/graph-mailer` — dans un projet NestJS, importez uniquement depuis `@tlouverse/graph-mailer-nestjs`.

| Export | Description |
|---|---|
| `GraphMailerModule` | Module NestJS — à enregistrer avec `forRoot` ou `forRootAsync` |
| `GraphMailerAsyncOptions` | Type des options pour `forRootAsync` |
| `GraphMailer` | Classe mailer (injectable) |
| `GraphMailerConfig` | Type de configuration |
| `SendMailOptions` | Type des options d'envoi |
| `Address` | Type d'adresse |
| `GraphMailError` | Erreur API Graph |
| `GraphAuthError` | Erreur d'acquisition du token |

Pour l'API complète de `GraphMailer`, voir la [documentation @tlouverse/graph-mailer](https://www.npmjs.com/package/@tlouverse/graph-mailer).

### Prérequis Azure

Voir [@tlouverse/graph-mailer — Prérequis Azure](https://www.npmjs.com/package/@tlouverse/graph-mailer#prérequis-azure).

---

## License

MIT
