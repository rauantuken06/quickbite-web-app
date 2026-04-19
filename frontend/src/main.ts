import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {register} from 'swiper/element/bundle';


register();


bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
