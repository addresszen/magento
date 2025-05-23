// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/// <reference types="cypress" />

import { Config } from "@ideal-postcodes/jsutil";

declare global {
  namespace Cypress {
    interface Chainable {
      setup(url: string, store: boolean, customFields?: any): void;
    }
  }
}

declare global {
  interface Window {
    idpcConfig: Partial<Config>;
  }
}

const adminSourcesMap = [
  {
    type: "js",
    url: "http://localhost:60154/fixtures/admin.js",
  },
  {
    type: "js",
    url: "http://localhost:60154/fixtures/start.js",
  },
];

const storeSourcesMap = [
  {
    type: "js",
    url: "http://localhost:60154/fixtures/jquery.js",
  },
  {
    type: "js",
    url: "http://localhost:60154/fixtures/store.js",
  },
  {
    type: "js",
    url: "http://localhost:60154/fixtures/start.js",
  },
];

const loadCss = (url: string, { document }: Window) => {
  const css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", url);
  document.head.appendChild(css);
};

const loadScript = async (url: string, { document }: Window): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

Cypress.Commands.add("setup", (url, store, customFields) => {
  cy.visit(url, {
    onBeforeLoad: (window) => {
      window.idpcConfig = {
        apiKey: Cypress.env("API_KEY"),
        populateCounty: true,
        autocomplete: true,
        autocompleteOverride: {
          checkKey: false,
          defaultCountry: "USA",
          detectCountry: false,
        },
        // @ts-ignore - customFields is used by the application but not typed in Config
        customFields: customFields || [],
      };
    },
    onLoad: async (window) => {
      const resources = store ? storeSourcesMap : adminSourcesMap;
      for (const resource of resources) {
        if (resource.type === "js") await loadScript(resource.url, window);
        if (resource.type === "css") loadCss(resource.url, window);
      }
    },
  });
  cy.wait(2000);
});
