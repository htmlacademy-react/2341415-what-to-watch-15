export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Films = '/films/',
  Id = ':id',
  FilmReview = '/review',
  Player = '/player/'
}
export enum ServerRoute {
  Films = '/films',
  Promo = '/promo',
  LogIn = '/login',
  Logout = '/logout',
}

export enum PageRoute {
  Main = AppRoute.Main,
  Login = AppRoute.Login,
  MyList = AppRoute.MyList,
  Film = `${AppRoute.Films}${AppRoute.Id}`,
  FilmReview = `${AppRoute.Films}${AppRoute.Id}${AppRoute.FilmReview}`,
  Player = `${AppRoute.Player}${AppRoute.Id}`
}

export enum FilmTab {
  OverView = 'OverView',
  Details = 'Details',
  Reviews = 'Reviews'
}

export const ALL_GENRES = 'All genres';

export const DISPLAYED_FILMS_NUMBER_STEP = 8;

