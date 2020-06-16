import {Component} from '@angular/core';
import {Element} from "@angular/compiler";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-icc',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ICCReportComponent {
  public ICC: string = ""
  public labConfirmationID = ["", "", "", "", "", ""]
  private http

  constructor(http: HttpClient) {
    this.http = http
  }

  public ICIdKeyPress($event: KeyboardEvent, index) {
    let target:HTMLInputElement = (<HTMLInputElement>$event.target)
    setTimeout(() => {
      if ($event.keyCode == 8) {
        target.value = ""
        target.parentNode.querySelector(".form-control:nth-child(" + (index) + ")").focus()
      } else if (index < 5) {
        target.parentNode.querySelector(".form-control:nth-child(" + (index + 2) + ")").focus()
      } else if (target.parentNode['id'] == 'iccWrapper') {
        document.querySelector("#icIdWrapper .form-control:first-child").focus()
      } else if (target.parentNode['id'] == 'icIdWrapper') {
        document.querySelector(".btn:last-child").focus()
      }
    },200)
  }

  public report() {


    // var ICC = document.querySelector("#iccWrapper .form-control").value
    // var ICId = Array.from(document.querySelectorAll("#icIdWrapper .form-control")).map(el => el.value).join("")
    //
    this.http.post("https://localhost:5005/RedeemICC", {
      "labConfirmationID": this.labConfirmationID.join(""),
      "commencementComplaints": new Date(Date.now()).toISOString()
    }, {
      headers: {
        "Authorization": this.ICC
      }
    }).subscribe((result) => {
      alert(JSON.stringify(result))
    });


    // console.log(ICId);
    // console.log(ICC);
    // setTimeout(() => {
    //   Array.from(document.querySelectorAll(".form-control")).forEach(el => {
    //     el.value = ""
    //   })
    // }, 200)
  }
}
