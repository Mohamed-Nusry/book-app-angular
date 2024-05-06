import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AxiosService } from '../axios.service';

interface dataInterface {
  id: number,
  title: string,
  author: string,
  user_id: number
}

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})

export class HomeListComponent implements OnInit {
 

  data: dataInterface[] = [];

  constructor(private axiosService: AxiosService) {

  }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/book",
      {}
    ).then(
      (response) => {
        console.log(response);
        this.data = response.data
      }
    )

  }

}
