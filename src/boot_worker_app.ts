import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

import { coreLoadAndBootstrap, createPlatform, ReflectiveInjector, provide, ApplicationRef, ComponentRef, Injector } from 'angular2/core';
import {
  WORKER_APP_PLATFORM,
  WORKER_APP_APPLICATION,
  WORKER_APP_ROUTER
} from 'angular2/platform/worker_app';
import { APP_BASE_HREF } from 'angular2/platform/common';
import { Router } from 'angular2/router';
import { App } from './app/app';

var platform = createPlatform(ReflectiveInjector.resolveAndCreate(WORKER_APP_PLATFORM));
var appInjector =
    ReflectiveInjector.resolveAndCreate([
      WORKER_APP_APPLICATION,
      WORKER_APP_ROUTER,
      provide(APP_BASE_HREF, { useValue: '/' })
    ], platform.injector);

coreLoadAndBootstrap(appInjector, App)
.then((compRef: ComponentRef) => {
  const injector: Injector = compRef.injector;
  const router:   Router   = injector.get(Router);

  return (<any> router)._currentNavigation;
})
.then(() => {
  setTimeout(() => {
    postMessage('APP_READY', undefined);
  });
});
