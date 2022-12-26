import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

/* 
   이 Component의 Selector는 app-hero-form
   부모 컴포넌트 템플릿에 <app-hero-form> 이라는 태그가 보이면 이 컴포넌트를 의미
*/ 

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent  {

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weatger Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

  //새로운 히어로 추가하기 add
  newHero() {
    this.model = new Hero(42, '', '');
  }



}
