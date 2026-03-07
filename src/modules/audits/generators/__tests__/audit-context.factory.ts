import { Situation } from '../../../../entities';
import { BicBncType } from '../../../../types/company-information.type';
import { AuditContext } from '../audit-context.type';

/**
 * Factory to build AuditContext for tests.
 * All fields default to neutral values that trigger minimal cards.
 */
export function buildCtx(overrides: Partial<AuditContext> = {}): AuditContext {
  const defaults: AuditContext = {
    situation: Situation.FUTUR,
    yearly_income: 0,
    taxable_yearly_income: 0,
    tax_parts: 1,
    siren: '',
    creation_date: '',
    bic_bnc_type: null,
    onboarding: {
      futur: null,
      micro: null,
      societe: null,
    },
  };
  return {
    ...defaults,
    ...overrides,
    onboarding: {
      ...defaults.onboarding,
      ...overrides.onboarding,
    },
  };
}

/** Today formatted as YYYY-MM-DD */
export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** A date N days ago formatted as YYYY-MM-DD */
export function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

/** January 1st of current year */
export function currentYearStart(): string {
  return `${new Date().getFullYear()}-01-15`;
}

/** A date in the previous year */
export function previousYearDate(): string {
  return `${new Date().getFullYear() - 1}-06-15`;
}

/** Default micro context */
export function microCtx(
  micro: Record<string, unknown> = {},
  ctx: Partial<AuditContext> = {},
): AuditContext {
  return buildCtx({
    situation: Situation.MICRO,
    bic_bnc_type: BicBncType.BNC,
    ...ctx,
    onboarding: {
      futur: null,
      societe: null,
      micro: {
        bic_bnc_type: BicBncType.BNC,
        ...micro,
      } as any,
    },
  });
}

/** Default futur context */
export function futurCtx(
  futur: Record<string, unknown> = {},
  ctx: Partial<AuditContext> = {},
): AuditContext {
  return buildCtx({
    situation: Situation.FUTUR,
    bic_bnc_type: BicBncType.BNC,
    ...ctx,
    onboarding: {
      micro: null,
      societe: null,
      futur: {
        bic_bnc_type: BicBncType.BNC,
        ...futur,
      } as any,
    },
  });
}

/** Default societe context */
export function societeCtx(
  societe: Record<string, unknown> = {},
  ctx: Partial<AuditContext> = {},
): AuditContext {
  return buildCtx({
    situation: Situation.SOCIETE,
    bic_bnc_type: null,
    ...ctx,
    onboarding: {
      futur: null,
      micro: null,
      societe: {
        ...societe,
      } as any,
    },
  });
}
