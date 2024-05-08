export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/',
  Id = ':id',
  FilmReview = '/review',
  Player = '/player/'
}

export enum PageRoute {
  Main = AppRoute.Main,
  Login = AppRoute.Login,
  MyList = AppRoute.MyList,
  Film = `${AppRoute.Film}${AppRoute.Id}`,
  FilmReview = `${AppRoute.Film}${AppRoute.Id}${AppRoute.FilmReview}`,
  Player = `${AppRoute.Player}${AppRoute.Id}`
}

export enum FilmTab {
  OverView = 'OverView',
  Details = 'Details',
  Reviews = 'Reviews'
}

export const ALL_GENRES = 'All genres';
