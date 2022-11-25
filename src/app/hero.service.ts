import { Injectable } from '@angular/core';
//히어로 데이터 가져오기
import { Hero } from "./hero";

import { Observable, of } from 'rxjs';
import { MessageService } from "./message.service";

//HeroService에서 HttpClient 심볼과 HttpHeaders 심볼을 로드
import { HttpClient, HttpHeaders } from "@angular/common/http";

//에러처리하기
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root' //root : 최상위 인젝터에 등록.
})
//ng generate service [servieName]
/*
  서비스 -> 데이터를 처리하는 로직을 담담
  DI(의존성 주입)메커니즘에 따라 HeroesComponent의 생성자로 주입됨.
*/
export class HeroService {

  private heroesUrl = 'api/heroes'; //웹 API 형식의 URL로 사용

   /* 웹 API에는 Header가 존재 -> HeroService안에 httpOptions 프로퍼티에 저장후 상수처럼 사용 */
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http : HttpClient,
    private MessageService : MessageService
    ) {}

/**
 * HTTP 요청이 실패한 경우를 처리.
 * 애플리케이션 로직 흐름은 그대로 유지.
 *
 * @param operation - 실패한 동작의 이름
 * @param result - 기본값으로 반환할 객체
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환
      return of(result as T);
    };
  }

  //RxJs 'of()'를 사용하는 getHeroes()
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //  // this.MessageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }


  //GET : 서버에서 히어로 목록가져오기 
  /*
    브라우저가 갱신되면 데이터를 목 서버에서 받아옴 Observable<Hero[]> 타입을 반환
  */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /* PUT : 서버에 저장된 히어로 데이터를 변경 */
  updateHero(hero : Hero) : Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      //pipe로 오류처리
      tap(_ => this.log('업데이트된 히어로 id=&{hero.id}')),
      catchError(this.handleError<any>('업데이트히어로'))
    );
  }

  /* POST : 서버에 새로운 데이터를 추가*/
  addHero(hero : Hero) : Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환 */
  getHero(id: number): Observable<Hero> {
    
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /* DELETE: 서버에서 데이터를 제거  */ 
  deleteHero(id : number) : Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /*이름으로 검색하기 */ 
  /** GET: 입려된 문구가 이름에 포함된 히어로 목록을 return */
  searchHeroes(term : string) : Observable<Hero[]>{
    if (!term.trim()) {
      //입력된 내용이 없으면 빈 배열을 반환
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }
  
  /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시 */
  private log(message: string) {
  this.MessageService.add(`HeroService: ${message}`);

  

  }
}
