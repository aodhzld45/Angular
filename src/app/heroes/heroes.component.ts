import { Component, OnInit } from '@angular/core';
import { HeroService } from "../hero.service"; // 서비스 하나만 로드
import { Hero } from '../hero'; //Hero 인터페이스를 로드 -> 컴포넌트의 hero 프로퍼티를 Hero타입으로 리팩토링.


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

   heroes: Hero[] = [];

  //HeroService 주입하기 -> 생성자에 HeroService 타입의 heroService 인자를 선언, private으로 지정
  
  constructor(private heroService: HeroService/*, private messageService: MessageService*/ ) {}
   //  클릭 이벤트 핸들러 추가
  //  template에서 선택된 히어로를 Component의 selectedHero 변수에 할당함.
  //  onSelect(hero : Hero) : void{
  //    this.selectedHero = hero;
  //    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //   }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  //추가하기
  add(name: string) : void {
    name = name.trim();
    if (!name)  { return;}
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  //삭제하기
  delete(hero : Hero) : void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }


}
