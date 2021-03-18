import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private spinner: NgxSpinnerService) {

  }

  public async showLoading(fullScreen?: boolean): Promise<void> {
    const message = 'Loading';
    this.spinner.show(undefined,
      {
        type: 'ball-spin',
        fullScreen,
        bdColor: 'rgb(255,255,255)',
        size: 'medium',
        color: '#000',
      }
    );
  }

  public async hideLoading(): Promise<void> {
    try {
      await this.spinner.hide();
      return;
    } catch (error) {
      console.error('hideLoading: ', error);
      return error;
    }
  }
}
