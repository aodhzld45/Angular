import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Hero } from "./hero";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 1, name: 'Gaubiz-1'},
      {id: 2, name: 'Gaubiz-2'},
      {id: 3, name: 'Gaubiz-3'},
      {id: 4, name: 'Gaubiz-4'},
      {id: 5, name: 'Gaubiz-5'},
      {id: 6, name: 'Gaubiz-6'},
      {id: 7, name: 'Gaubiz-7'},
      {id: 8, name: 'Gaubiz-8'},
      {id: 9, name: 'Gaubiz-9'}
    ];
    return {heroes};
  }

  // 히어로 객체가 항상 Id 프로퍼티를 갖도록 getId 메소드를 오버라이드
  // 히어로 목록이 비어있다면 이 메소드는 초기값(11)을 반환
  // 히어로 목록이 비어있지 않으면 히어로 id의 최대값에 1을 더해서 반환
  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}