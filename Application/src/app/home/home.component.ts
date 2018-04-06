import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //about
  about_title: string = "About Us";
  shown: string = "Freelancing has become a buzz amongst students and individuals who don’t mind working a few hours to earn a littl alongside their studies/work. People of our country have to use an international platform if they ever require the help of a freelancer. Our solution, ‘done’, comes as a sign of relief for the people. Done provides user with the opportunity to find the perfect person for their work. ‘done’ serves as a bridge between talent and technology, hence providing the user with the best experience. Freelancers from a wide range of categories can be found through ‘done’, and hired for the specific task, ie.";
  hidden: string ="A birthday party in the evening? Simply search for a photographer and book them for the event in the morning. Payment is secured as well as transactions happen only when the job is completed. Freelancers can breathe tension free as well, as the employer pays the amount to the system when hiring them. Students can also utilize our system to its full extent as they will be able to hire tutors for an urgent class/lecture, when they are running on a tight schedule.";
  //Google maps
  maptitle: string = "Find Us At:";
  lat: number = 23.748943;
  lng: number = 90.374528;
  zm: number = 15; 
  contacttitle: string = "Contact Us";

  // Individual Profiles
  subtitle: string = "A group of specialized developers, designers and content creators have come together bringing in their respective talents from their fields to provide the consumers with what they deserve and need."
  abrar_kamal: string = "He is dynamic and is the person behind the ideas. Abrar mainly specializes with the backend portion of the application and is accoustomed to most backend languages used.";
  shadman_ahmad: string = "Shadman mainly specializes in the frontend development of the application, having a keen eye in designing and functionality he is considered to be the creative and responsive person of the team like his web applications.";
  rawfun_hoque: string = "Rawfun is the multi talented person of the group he aids both in the development of the backend of the application as well as the frontend.";
  shake_sadi: string = "Sojib is the database guru of the team he is in charge of integrating the application with the noSQL database";
  mostofa_kamal: string = "Having worked with image designing applications previously Mostofa is the person behind the creative designs of the banners, logo and other images of the application.";
  imran_hasan: string = "Having specialized in graphics designing multiple times before Imran aids in the design of banners and other images used in the application";
  anjan_sarkar: string = "Leaning in on the literary side more Anjan specializes in creating the literature of the web application";

  //Services
  services_title: string = "We being the only one of its kind in the country provide the following top-notch services to our clients with utter transperancy. Come have a look at what we offer and we can gaurantee that you too will join our community.";
  freelancer_title: string = "Freelancers";
  tutors_title: string = "Tutors";
  employers_title: string = "Employers";

  freelancer_content: string = "Freelancers lack the proper platform for being employed, a place to exhibit their ideas and portfolios, done provides them that platform";
  tutors_content: string = "There has been a constant grit between tutors and parents, we provide parents the opportunity to choose the perfect tutor.";
  employers_content: string = "Rather than having freelancers fight over the job employers have the freedom to choose the freelancer now, leaving no scope for a poorly done job.";


  //services card
  freelancer_cardtitle: string = "More On Freelancers";
  tutors_cardtitle: string = "More On Tutors";
  employers_cardtitle: string = "More On Employers";

  freelancer_cardcontent: string = "Instead of bidding on jobs freelancers in this platform are chosen by their employers based on their ratings, experience and portfolios. They attain ratings from their past jobs and upload their portfolios to enrichen their profiles. Once the freelancer completes the task at hand they are paid by done";
  tutors_cardcontent: string = "Bridging the gap between parents and tutors done brings them the opportunity to choose and test their compatibility with each other, after the initial service fee has been paid the rest of the monthly payments are paid directly.";
  employers_cardcontent: string = "Employers are given the freedom to choose their own freelancers for their jobs. They are able to assess the freelancers based mainly on their portfolios and ratings. Once they assign a freelancer they first have to complete the payment to the company, the company holds the payment till the freelancer completes the job. Once the process is complete the employer must rate the freelancer.";


  //footer
  footer_content: string = "";
  copyright: string = "© 2017 Copyright: done";


  constructor() { }

  getImage(){
  	let myStyles = {
  		'background' : 'url("../assets/imgs/Banner_home.jpg") no-repeat',
  		'background-size' : '100% 100%, cover'
  	}
  	return myStyles;
  }

  ngOnInit() {
  }

}
