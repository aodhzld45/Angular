import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
// import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //브라우저의 URL이 빈 문자열일 경우 /dashboard주소로 이동
  { path: 'dashboard', component: DashboardComponent }, //dashboard 라우팅 규칙 추가
  { path: 'detail/:id', component: HeroDetailComponent }, //routes 배열에 히어로 상세정보 화면과 매칭되는 패턴을 라우팅 변수를 사용해서 정의 
  { path: 'heroes', component: HeroesComponent }  //heroes 라우팅 규칙 추가
];

@NgModule({
  
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})

export class AppRoutingModule { }
