import MetaUk from 'src/locales/uk/meta.json';
import HomeUk from 'src/locales/uk/home.json';
import ContactsUk from 'src/locales/uk/contacts.json';
import FeedbackUk from 'src/locales/uk/feedback.json';
import CatalogUk from 'src/locales/uk/catalog.json';
import ProductionUk from 'src/locales/uk/production.json';
import ProjectsUk from 'src/locales/uk/projects.json';
import AboutUk from 'src/locales/uk/about.json';
import ReportingsUk from 'src/locales/uk/reportings.json';
import ServicesUk from 'src/locales/uk/services.json';
import PostsUk from 'src/locales/uk/posts.json';

import MetaEn from 'src/locales/en/meta.json';
import HomeEn from 'src/locales/en/home.json';
import ContactsEn from 'src/locales/en/contacts.json';
import FeedbackEn from 'src/locales/en/feedback.json';
import CatalogEn from 'src/locales/en/catalog.json';
import ProductionEn from 'src/locales/en/production.json';
import ProjectsEn from 'src/locales/en/projects.json';
import AboutEn from 'src/locales/en/about.json';
import ReportingsEn from 'src/locales/en/reportings.json';
import ServicesEn from 'src/locales/en/services.json';
import PostsEn from 'src/locales/en/posts.json';

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
      posts: PostsEn,
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
    posts: PostsUk,
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
