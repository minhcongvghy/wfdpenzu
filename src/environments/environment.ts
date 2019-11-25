// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  imgUrl: 'http://localhost:8080/uploads/',
  diaryUrl: 'http://localhost:8080/api/auth/diary/',
  uploadFileUrl: 'http://localhost:8080/api/auth/file/',
  tagUrl: 'http://localhost:8080/api/auth/tag/',
  userUrl: 'http://localhost:8080/api/auth/user/',

  loginUrl: 'http://localhost:8080/api/auth/signin',
  signupUrl: 'http://localhost:8080/api/auth/signup',
  updateProfileUrl: 'http://localhost:8080/api/auth/update-profile',
  updatePasswordUrl: 'http://localhost:8080/api/auth/update-password',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
