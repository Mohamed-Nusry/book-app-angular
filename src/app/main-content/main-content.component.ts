import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../home/home.component";
import { LoginFormComponent } from "../login-form/login-form.component";
import { AxiosService } from '../axios.service';

@Component({
    selector: 'app-main-content',
    standalone: true,
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.css'],
    imports: [CommonModule, HomeComponent, LoginFormComponent]
})
export class MainContentComponent {

    authenticated: boolean;

    constructor(private axiosService: AxiosService){
        this.authenticated = false;
    }


    async onLogin(input: any){
        console.log(input);
        await this.axiosService.request(
            "POST",
            "/auth/login",
            {
                username: input.login,
                password: input.password
            }
        ).then(response => {
            if(response && response.data && response.data.token && response.data.token != null) {
                this.axiosService.setAuthToken(response.data.token);
                this.authenticated = true;
            }else{
                this.axiosService.removeToken();
            }
        })
    }

}
