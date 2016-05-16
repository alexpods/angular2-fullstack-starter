import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

import { coreLoadAndBootstrap, createPlatform, ReflectiveInjector, ComponentRef, Injector } from 'angular2/core';
import { BROWSER_PROVIDERS, BROWSER_APP_PROVIDERS, } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, Router } from 'angular2/router';
import { App } from './app/app';

var platform = createPlatform(ReflectiveInjector.resolveAndCreate(BROWSER_PROVIDERS));
var appInjector =
    ReflectiveInjector.resolveAndCreate([
      BROWSER_APP_PROVIDERS,
      ROUTER_PROVIDERS
    ], platform.injector);
coreLoadAndBootstrap(appInjector, App)
.then((compRef: ComponentRef) => {
  const injector: Injector = compRef.injector;
  const router:   Router   = injector.get(Router);

  return (<any> router)._currentNavigation;
})
.then(() => {
  document.dispatchEvent(new Event('BootstrapComplete'));
});
