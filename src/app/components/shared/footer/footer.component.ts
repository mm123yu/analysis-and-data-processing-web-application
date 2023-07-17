
import { Component, OnInit } from '@angular/core';
import { faGithub,faFacebook,faTwitter,faGoogle,faLinkedin,faInstagram}from '@fortawesome/free-brands-svg-icons'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  github=faGithub;
  facebook=faFacebook;
  twitter=faTwitter;
  google=faGoogle;
  linkedin=faLinkedin;
  insta=faInstagram
  constructor() { }

  ngOnInit(): void {
  }

}

