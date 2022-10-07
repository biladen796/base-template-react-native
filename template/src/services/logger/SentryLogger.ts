import * as SentryBrowser from '@sentry/browser';
import * as Sentry from '@sentry/react-native';
import {SENTRY_DSN} from 'src/configs/environment';
import AppRunningData from 'src/utils/AppHelper';

enum LoggerContext {
  API_CONTEXT = 'API_CONTEXT',
  CREATE_SUBMISSION_CONTEXT = 'CREATE_SUBMISSION_CONTEXT',
  MANAGE_SUBMISSION_CONTEXT = 'MANAGE_SUBMISSION_CONTEXT',
  USER_PROFILE_CONTEXT = 'USER_PROFILE_CONTEXT',
  HELP_CONTEXT = 'HELP_CONTEXT',
}

export const contextNames = {
  ...LoggerContext,
};

export type TContextName = keyof typeof contextNames;
export type TFeatureName =
  | 'CREATE_SUBMISSION'
  | 'MANAGE_SUBMISSION'
  | 'USER_PROFILE'
  | 'HELP'
  | 'OTHER';

export function log(
  featureName: TFeatureName,
  errorMessage: string,
  contextName: TContextName,
  properties: Record<string, unknown>,
  level: SentryBrowser.SeverityLevel = 'error',
) {
  // const propertiesData = {...properties};
  // propertiesData[
  //   `${Math.random()}${Math.random()}`
  // ] = `${Math.random()}${Math.random()}`;

  Sentry.setContext(`${contextName}`, properties);

  Sentry.withScope(scope => {
    scope.setTag('feature', `${featureName}`);
    scope.setLevel(level);
    scope.setFingerprint([
      `${Math.random()}${Math.random()}`,
      `${Math.random()}${Math.random()}`,
    ]);
    Sentry.captureException(
      new Error(`${AppRunningData.loginUser?.name} - ${errorMessage}`),
    );
  });
}

export const initLogger = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    defaultIntegrations: false,
    attachStacktrace: true,
  });
};

export default {
  log,
};
