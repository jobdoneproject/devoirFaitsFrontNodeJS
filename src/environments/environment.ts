// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // si déployé en mode debug dans Code
  // tslint:disable-next-line:comment-format
  // API_URL : "http://localhost:8080"
  // Si deployé par maven en ligne de commande tomcat7:deploy ou par ng serve car le service tomcat ecoute sur 8080
  // tslint:disable-next-line:quotemark
  API_URL : "http://localhost:3000/api/v1"
};
