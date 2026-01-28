import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import 'dotenv/config';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Enable performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,

  // Enable profiling for performance insights
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,

  integrations: [nodeProfilingIntegration()],

  // Send PII (user info) with error reports
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  _experiments: {
    enableLogs: true,
  },

  environment: process.env.NODE_ENV || 'development',
});
