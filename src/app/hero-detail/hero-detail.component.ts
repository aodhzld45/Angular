import { Component, OnInit ,Input} from '@angular/core';
import { HeroService  } from "../hero.service"; 
import { Hero } from '../hero';

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
  /* @Input() 히어로 프로퍼티 추가하기
   -> 외부 컴포넌트인 HerosComponent에서 바인딩되어 전달
   따라서 프로퍼티는 @Input() 데코레이터를 사용해서 입력 프로퍼티로 선언해야함.
   */
 // @Input() hero?: Hero;
 hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location : Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }


  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
