import MetaUk from '../locales/uk/meta.json';
import HomeUk from '../locales/uk/home.json';
import ContactsUk from '../locales/uk/contacts.json';
import FeedbackUk from '../locales/uk/feedback.json';
import CatalogUk from '../locales/uk/catalog.json';
import ProductionUk from '../locales/uk/production.json';
import ProjectsUk from '../locales/uk/projects.json';
import AboutUk from '../locales/uk/about.json';
import ReportingsUk from '../locales/uk/reportings.json';
import ServicesUk from '../locales/uk/services.json';

import MetaEn from '../locales/en/meta.json';
import HomeEn from '../locales/en/home.json';
import ContactsEn from '../locales/en/contacts.json';
import FeedbackEn from '../locales/en/feedback.json';
import CatalogEn from '../locales/en/catalog.json';
import ProductionEn from '../locales/en/production.json';
import ProjectsEn from '../locales/en/projects.json';
import AboutEn from '../locales/en/about.json';
import ReportingsEn from '../locales/en/reportings.json';
import ServicesEn from '../locales/en/services.json';

export function t(locale: string): any {
  if (locale === 'en') {
    return {
      meta: MetaEn,
      home: HomeEn,
      contacts: ContactsEn,
      feedback: FeedbackEn,
      catalog: CatalogEn,
      production: ProductionEn,
      projects: ProjectsEn,
      about: AboutEn,
      reportings: ReportingsEn,
      services: ServicesEn,
    };
  }
  return {
    meta: MetaUk,
    home: HomeUk,
    contacts: ContactsUk,
    feedback: FeedbackUk,
    catalog: CatalogUk,
    production: ProductionUk,
    projects: ProjectsUk,
    about: AboutUk,
    reportings: ReportingsUk,
    services: ServicesUk,
  };
}

export function localedURL(locale: string, url: string): string {
  if (locale === 'uk') {
    return url;
  }
  if (url === '/') {
    return `/${locale}`;
  }
  return `/${locale}${url}`;
}
