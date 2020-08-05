// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apiURL: 'https://api.themoviedb.org/3/movie/now_playing?api_key=dfbb6e71b4b1eb0d75c86a4504871cea&sort_by=popularity.desc',
	configURL: 'https://api.themoviedb.org/3/configuration?api_key=dfbb6e71b4b1eb0d75c86a4504871cea'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
